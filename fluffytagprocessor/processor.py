"""
Core implementation of the FluffyTagProcessor.

This module contains the main processor class and related utilities
for parsing XML-like tags in text content.
"""

from typing import Dict, List, Optional, Callable, Any, Union
from dataclasses import dataclass, field
from datetime import datetime
import re
import logging
from functools import wraps

# Setup logger
logger = logging.getLogger("fluffy_tag_processor")


class TagProcessorError(Exception):
    """Custom exception for tag processing errors."""

    def __init__(self, message: str, context: Optional[Dict[str, Any]] = None):
        """
        Initialize a new TagProcessorError.

        Args:
            message: Error message
            context: Additional context information
        """
        super().__init__(message)
        self.context = context or {}


@dataclass
class TagConfig:
    """Configuration for a tag handler."""

    handler: Callable[[Dict[str, str], str], Any]
    stream_content: bool = True
    process_nested: bool = True
    streaming_callback: Optional[Callable[[str, Dict[str, str]], None]] = None
    allows_nested_of_same_type: bool = False
    on_tag_start_callback: Optional[Callable[[str, Dict[str, str]], None]] = None
    on_tag_complete_callback: Optional[Callable[[str, Dict[str, str], str], None]] = None

    def __post_init__(self):
        """Validate configuration after initialization."""
        if not callable(self.handler):
            raise ValueError("Handler must be callable")

        if self.streaming_callback is not None and not callable(self.streaming_callback):
            raise ValueError("Streaming callback must be callable")

        if self.on_tag_start_callback is not None and not callable(self.on_tag_start_callback):
            raise ValueError("Tag start callback must be callable")

        if self.on_tag_complete_callback is not None and not callable(self.on_tag_complete_callback):
            raise ValueError("Tag complete callback must be callable")


@dataclass
class TagContext:
    """Context for an active tag being processed."""

    name: str
    attributes: Dict[str, str]
    content: List[str] = field(default_factory=list)
    parent: Optional['TagContext'] = None
    start_time: datetime = field(default_factory=datetime.now)
    is_collecting: bool = True
    config: Optional[TagConfig] = None


def error_handler(method):
    """
    Decorator to handle errors in TagProcessor methods.

    Catches and processes exceptions in the decorated method,
    sending them to the processor's error handler.
    """

    @wraps(method)
    def wrapper(self, *args, **kwargs):
        try:
            return method(self, *args, **kwargs)
        except TagProcessorError as e:
            if self.error_handler:
                self.error_handler(e)
            else:
                if self.debug:
                    logger.error(f"TagProcessorError: {str(e)}", exc_info=True, extra=e.context)
        except Exception as e:
            error = TagProcessorError(f"Unexpected error in {method.__name__}: {str(e)}")
            if self.error_handler:
                self.error_handler(error)
            else:
                if self.debug:
                    logger.error(f"Unexpected error: {str(e)}", exc_info=True)

    return wrapper


class FluffyTagProcessor:
    """
    A processor for XML-like tags in text content.

    Designed for processing structured tags in text outputs from LLMs,
    similar to Claude's artifacts or other XML-like structured content.
    """

    def __init__(
            self,
            debug: bool = False,
            error_handler: Optional[Callable[[TagProcessorError], None]] = None,
            auto_process_untagged: bool = True,
            auto_process_threshold: int = 20
    ):
        """
        Initialize a new tag processor.

        Args:
            debug: Whether to enable debug logging
            error_handler: Optional custom error handler function
            auto_process_untagged: Whether to automatically process untagged content
            auto_process_threshold: Number of chars to accumulate before processing untagged content
        """
        self.tag_configs: Dict[str, TagConfig] = {}
        self.tag_stack: List[TagContext] = []
        self.partial_buffer: List[str] = []
        self.untagged_content: List[str] = []
        self.in_tag = False
        self.current_tag: List[str] = []
        self.json_depth = 0
        self.in_quotes = False
        self.quote_char = ""
        self.untagged_content_handler: Optional[Callable[[str], None]] = None
        self.debug = debug
        self.error_handler = error_handler
        self.auto_process_untagged = auto_process_untagged
        self.auto_process_threshold = auto_process_threshold

        # Configure logging
        if debug:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
            handler.setFormatter(formatter)
            logger.addHandler(handler)
            logger.setLevel(logging.DEBUG)

    def _debug_log(self, message: str, data: Any = None) -> None:
        """
        Log a debug message if debug mode is enabled.

        Args:
            message: The message to log
            data: Optional data to include in the log
        """
        if not self.debug:
            return

        if data is not None:
            logger.debug(f"{message}", extra={"data": data})
        else:
            logger.debug(message)

    def register_handler(
            self,
            tag_name: str,
            handler: Callable[[Dict[str, str], str], Any],
            *,
            allow_nested: bool = True,
            allows_nested_of_same_type: bool = False,
            stream_content: bool = True,
            streaming_callback: Optional[Callable[[str, Dict[str, str]], None]] = None,
            on_tag_start_callback: Optional[Callable[[str, Dict[str, str]], None]] = None,
            on_tag_complete_callback: Optional[Callable[[str, Dict[str, str], str], None]] = None
    ) -> 'FluffyTagProcessor':
        """
        Register a handler for a specific tag type.

        Args:
            tag_name: Name of the tag to handle
            handler: Function to process the tag content
            allow_nested: Whether to allow nested tags
            allows_nested_of_same_type: Whether the tag can be nested within itself
            stream_content: Whether to stream content as it arrives
            streaming_callback: Optional callback for streaming content
            on_tag_start_callback: Optional callback when tag processing begins
            on_tag_complete_callback: Optional callback when tag processing completes

        Returns:
            Self for method chaining
        """
        if not tag_name or not isinstance(tag_name, str):
            raise TagProcessorError("Tag name must be a non-empty string", {"tag_name": tag_name})

        if not callable(handler):
            raise TagProcessorError("Handler must be callable", {"tag_name": tag_name})

        self.tag_configs[tag_name] = TagConfig(
            handler=handler,
            stream_content=stream_content,
            process_nested=allow_nested,
            streaming_callback=streaming_callback,
            allows_nested_of_same_type=allows_nested_of_same_type,
            on_tag_start_callback=on_tag_start_callback,
            on_tag_complete_callback=on_tag_complete_callback
        )

        self._debug_log(f"Registered handler for tag: {tag_name}")
        return self

    def set_untagged_content_handler(
            self,
            handler: Optional[Callable[[str], None]]
    ) -> 'FluffyTagProcessor':
        """
        Set a handler function for untagged content.

        Args:
            handler: Function to process untagged content or None to disable

        Returns:
            Self for method chaining
        """
        if handler is not None and not callable(handler):
            raise TagProcessorError("Untagged content handler must be callable")

        self.untagged_content_handler = handler
        self._debug_log("Set untagged content handler")
        return self

    def set_auto_process_threshold(self, threshold: int) -> 'FluffyTagProcessor':
        """
        Set the threshold for auto-processing untagged content.

        Args:
            threshold: Number of characters to accumulate before processing

        Returns:
            Self for method chaining
        """
        if not isinstance(threshold, int) or threshold < 1:
            raise TagProcessorError("Threshold must be a positive integer", {"threshold": threshold})

        self.auto_process_threshold = threshold
        return self

    def _process_untagged_content(self, content: str) -> None:
        """
        Process accumulated untagged content using the handler if set.

        Args:
            content: Content to process
        """
        trimmed_content = content.strip()
        if trimmed_content and self.untagged_content_handler:
            try:
                self.untagged_content_handler(trimmed_content)
                self._debug_log(f"Processed untagged content ({len(trimmed_content)} chars)")
            except Exception as e:
                preview = trimmed_content[:100] + ('...' if len(trimmed_content) > 100 else '')
                raise TagProcessorError("Error in untagged content handler", {
                    "error": str(e),
                    "content_preview": preview
                }) from e

    def process_tokens(self, tokens: List[str]) -> 'FluffyTagProcessor':
        """
        Process a list of tokens.

        Args:
            tokens: List of tokens to process

        Returns:
            Self for method chaining
        """
        if not isinstance(tokens, (list, tuple)):
            raise TagProcessorError("Tokens must be a list or tuple", {"tokens_type": type(tokens).__name__})

        for token in tokens:
            self.process_token(token)

        return self

    def process_string(self, content: str) -> 'FluffyTagProcessor':
        """
        Process a complete string as one token.

        Args:
            content: String to process

        Returns:
            Self for method chaining
        """
        if not isinstance(content, str):
            raise TagProcessorError("Content must be a string", {"content_type": type(content).__name__})

        return self.process_token(content)

    @error_handler
    def process_token(self, token: str) -> 'FluffyTagProcessor':
        """
        Process a token of content.

        Args:
            token: Token to process

        Returns:
            Self for method chaining
        """
        if not token or not isinstance(token, str):
            return self

        if not token.strip():
            return self

        self._process_token_internal(token)
        return self

    def _process_token_internal(self, token: str) -> None:
        """
        Internal token processing logic.

        Args:
            token: Token to process
        """
        for char in token:
            self._process_char(char)

    def _process_char(self, char: str) -> None:
        """
        Process a single character.

        Args:
            char: Character to process
        """
        # Handle quotes inside JSON
        if (char == '"' or char == "'") and self.json_depth > 0:
            if not self.in_quotes:
                self.in_quotes = True
                self.quote_char = char
            elif char == self.quote_char:
                self.in_quotes = False
                self.quote_char = ""

        # Track JSON depth
        if not self.in_quotes:
            if char == '{':
                self.json_depth += 1
            elif char == '}':
                self.json_depth = max(0, self.json_depth - 1)

        # Handle tag markers
        if char == '<' and not self.in_quotes and self.json_depth == 0:
            if self.untagged_content:
                self._process_untagged_content(''.join(self.untagged_content))
                self.untagged_content = []

            self.in_tag = True
            self.current_tag = [char]
            return

        # Handle characters inside a tag
        if self.in_tag:
            self.current_tag.append(char)
            if char == '>':
                self._process_complete_tag(''.join(self.current_tag))
                self.in_tag = False
                self.current_tag = []
        else:
            # Handle characters inside content
            if self.tag_stack:
                context = self.tag_stack[-1]
                context.content.append(char)

                if context.config and context.config.streaming_callback:
                    try:
                        context.config.streaming_callback(char, context.attributes)
                    except Exception as e:
                        raise TagProcessorError("Error in streaming callback", {
                            "error": str(e),
                            "tag_name": context.name,
                            "char": char
                        }) from e
            else:
                self.untagged_content.append(char)

        # Auto-process untagged content when threshold is reached
        if (self.auto_process_untagged and
                len(self.untagged_content) > self.auto_process_threshold):
            self._process_untagged_content(''.join(self.untagged_content))
            self.untagged_content = []

    def _process_complete_tag(self, tag_content: str) -> None:
        """
        Process a complete tag.

        Args:
            tag_content: Complete tag content
        """
        tag_content = tag_content.strip()

        if tag_content.startswith('</'):
            # Closing tag
            tag_name = tag_content[2:-1].strip()
            self._handle_closing_tag(tag_name)
        elif tag_content.endswith('/>'):
            # Self-closing tag
            tag_content = tag_content[1:-2].strip()
            parts = tag_content.split(maxsplit=1)
            tag_name = parts[0]
            attributes = self._parse_attributes(parts[1] if len(parts) > 1 else "")
            self._handle_self_closing_tag(tag_name, attributes)
        else:
            # Opening tag
            tag_content = tag_content[1:-1].strip()
            parts = tag_content.split(maxsplit=1)
            tag_name = parts[0]
            attributes = self._parse_attributes(parts[1] if len(parts) > 1 else "")
            self._handle_opening_tag(tag_name, attributes)

    def _parse_attributes(self, attr_text: str) -> Dict[str, str]:
        """
        Parse tag attributes from text.

        Args:
            attr_text: Attribute text to parse

        Returns:
            Dictionary of parsed attributes
        """
        attributes: Dict[str, str] = {}

        if not attr_text:
            return attributes

        # Match both single and double quoted attributes
        attr_matches = re.findall(r'(\w+)\s*=\s*([\'"])((?:(?!\2).)*)\2', attr_text)
        for key, _, value in attr_matches:
            attributes[key] = value

        return attributes

    def _handle_opening_tag(self, tag_name: str, attributes: Dict[str, str]) -> None:
        """
        Handle an opening tag.

        Args:
            tag_name: Name of the tag
            attributes: Tag attributes
        """
        config = self.tag_configs.get(tag_name)
        if not config:
            self._debug_log(f"Unregistered tag type: {tag_name}")
            return

        # Check if tag can be nested within itself
        if not config.allows_nested_of_same_type:
            has_parent_of_same_type = any(context.name == tag_name for context in self.tag_stack)
            if has_parent_of_same_type:
                raise TagProcessorError(
                    f'Tag "{tag_name}" cannot be nested within itself',
                    {"tag_name": tag_name, "attributes": attributes}
                )

        context = TagContext(
            name=tag_name,
            attributes=attributes,
            content=[],
            parent=self.tag_stack[-1] if self.tag_stack else None,
            config=config
        )

        # Call on_tag_start_callback if defined
        if config.on_tag_start_callback:
            try:
                config.on_tag_start_callback(tag_name, attributes)
            except Exception as e:
                raise TagProcessorError("Error in on_tag_start_callback", {
                    "error": str(e),
                    "tag_name": tag_name,
                    "attributes": attributes
                }) from e

        self.tag_stack.append(context)
        self._debug_log(f"Started tag: {tag_name}", attributes)

    def _handle_self_closing_tag(self, tag_name: str, attributes: Dict[str, str]) -> None:
        """
        Handle a self-closing tag.

        Args:
            tag_name: Name of the tag
            attributes: Tag attributes
        """
        config = self.tag_configs.get(tag_name)
        if not config:
            self._debug_log(f"Unregistered tag type: {tag_name}")
            return

        self._debug_log(f"Processing self-closing tag: {tag_name}", attributes)

        # Call on_tag_start_callback if defined
        if config.on_tag_start_callback:
            try:
                config.on_tag_start_callback(tag_name, attributes)
            except Exception as e:
                raise TagProcessorError("Error in on_tag_start_callback", {
                    "error": str(e),
                    "tag_name": tag_name,
                    "attributes": attributes
                }) from e

        # For self-closing tags, invoke handler directly with empty content
        try:
            if config.handler:
                config.handler(attributes, "")
        except Exception as e:
            raise TagProcessorError("Error in tag handler", {
                "error": str(e),
                "tag_name": tag_name,
                "attributes": attributes
            }) from e

        # Call on_tag_complete_callback if defined
        if config.on_tag_complete_callback:
            try:
                config.on_tag_complete_callback(tag_name, attributes, "")
            except Exception as e:
                raise TagProcessorError("Error in on_tag_complete_callback", {
                    "error": str(e),
                    "tag_name": tag_name,
                    "attributes": attributes
                }) from e

    def _handle_closing_tag(self, tag_name: str) -> None:
        """
        Handle a closing tag.

        Args:
            tag_name: Name of the tag
        """
        if not self.tag_stack:
            raise TagProcessorError(
                f'Found closing tag "{tag_name}" but no opening tags in stack',
                {"tag_name": tag_name}
            )

        last_tag = self.tag_stack[-1]
        if last_tag.name == tag_name:
            context = self.tag_stack.pop()
            content = ''.join(context.content)

            self._debug_log(f"Completed tag: {tag_name}")

            # Invoke main handler
            if context.config and context.config.handler:
                try:
                    context.config.handler(context.attributes, content)
                except Exception as e:
                    raise TagProcessorError("Error in tag handler", {
                        "error": str(e),
                        "tag_name": tag_name,
                        "attributes": context.attributes
                    }) from e

            # Invoke on_tag_complete_callback, if defined
            if context.config and context.config.on_tag_complete_callback:
                try:
                    context.config.on_tag_complete_callback(tag_name, context.attributes, content)
                except Exception as e:
                    raise TagProcessorError("Error in on_tag_complete_callback", {
                        "error": str(e),
                        "tag_name": tag_name,
                        "attributes": context.attributes
                    }) from e
        else:
            raise TagProcessorError(
                f'Mismatched closing tag: expected "{last_tag.name}", got "{tag_name}"',
                {"expected": last_tag.name, "received": tag_name}
            )

    def reset(self) -> 'FluffyTagProcessor':
        """
        Reset the processor to its initial state.

        Returns:
            Self for method chaining
        """
        self.tag_stack = []
        self.partial_buffer = []
        self.untagged_content = []
        self.in_tag = False
        self.current_tag = []
        self.json_depth = 0
        self.in_quotes = False
        self.quote_char = ""
        self._debug_log("Processor reset")
        return self

    def flush(self) -> 'FluffyTagProcessor':
        """
        Force processing of any remaining untagged content.

        Returns:
            Self for method chaining
        """
        if self.untagged_content:
            self._process_untagged_content(''.join(self.untagged_content))
            self.untagged_content = []

        if self.tag_stack:
            self._debug_log(
                "Warning: Unclosed tags remain in stack",
                [tag.name for tag in self.tag_stack]
            )

        return self

    def get_stack_depth(self) -> int:
        """
        Get the current tag stack depth.

        Returns:
            Current stack depth
        """
        return len(self.tag_stack)

    def is_inside_tag(self, tag_name: str) -> bool:
        """
        Check if currently inside a specific tag.

        Args:
            tag_name: Tag name to check

        Returns:
            Whether inside the specified tag
        """
        return any(context.name == tag_name for context in self.tag_stack)

    def get_pending_tag_info(self) -> List[Dict[str, Union[str, datetime]]]:
        """
        Get information about pending unprocessed tags.

        Returns:
            List of tag information dictionaries
        """
        return [
            {"name": context.name, "start_time": context.start_time}
            for context in self.tag_stack
        ]