from typing import Dict, List, Optional, Callable
from dataclasses import dataclass
from datetime import datetime
import re

@dataclass
class TagConfig:
    handler: Callable
    stream_content: bool = False
    process_nested: bool = True
    streaming_callback: Optional[Callable[[str, Dict[str, str]], None]] = None
    allows_nested_of_same_type: bool = False

@dataclass
class TagContext:
    name: str
    attributes: Dict[str, str]
    content: List[str]
    parent: Optional['TagContext'] = None
    start_time: datetime = None
    is_collecting: bool = False
    config: Optional[TagConfig] = None

    def __post_init__(self):
        self.start_time = datetime.now()

class FluffyTagProcessor:
    def __init__(self):
        self.tag_configs: Dict[str, TagConfig] = {}
        self.tag_stack: List[TagContext] = []
        self.partial_buffer: List[str] = []
        self.untagged_content: List[str] = []
        self.in_tag = False
        self.current_tag = []
        self.json_depth = 0
        self.in_quotes = False
        self.untagged_content_handler: Optional[Callable[[str], None]] = None

    def register_handler(self,
                        tag_name: str,
                        handler: Callable,
                        allow_nested: bool = True,
                        allows_nested_of_same_type: bool = False,
                        stream_content: bool = True,
                        streaming_callback: Optional[Callable] = None):
        self.tag_configs[tag_name] = TagConfig(
            handler=handler,
            stream_content=stream_content,
            process_nested=allow_nested,
            streaming_callback=streaming_callback,
            allows_nested_of_same_type=allows_nested_of_same_type
        )

    def set_untagged_content_handler(self, handler: Optional[Callable[[str], None]]) -> None:
        """Set a handler function for untagged content."""
        self.untagged_content_handler = handler

    def _process_untagged_content(self, content: str) -> None:
        """Process accumulated untagged content using the handler if set"""
        if content.strip() and self.untagged_content_handler:
            self.untagged_content_handler(content)

    def process_token(self, token: str) -> None:
        if not token.strip():
            return

        for char in token:
            if char == '"' and self.json_depth > 0:
                self.in_quotes = not self.in_quotes

            if not self.in_quotes:
                if char == '{':
                    self.json_depth += 1
                elif char == '}':
                    self.json_depth = max(0, self.json_depth - 1)

            if char == '<' and not self.in_quotes and self.json_depth == 0:
                if self.untagged_content:
                    self._process_untagged_content(''.join(self.untagged_content).strip())
                    self.untagged_content = []
                self.in_tag = True
                self.current_tag = [char]
                continue

            if self.in_tag:
                self.current_tag.append(char)
                if char == '>':
                    self._process_complete_tag(''.join(self.current_tag))
                    self.in_tag = False
                    self.current_tag = []
            else:
                if self.tag_stack:
                    self.tag_stack[-1].content.append(char)
                    context = self.tag_stack[-1]
                    if context.config and context.config.streaming_callback:
                        context.config.streaming_callback(char, context.attributes)
                else:
                    self.untagged_content.append(char)

            if len(self.untagged_content) > 20:
                self._process_untagged_content(''.join(self.untagged_content).strip())
                self.untagged_content = []

    def _process_complete_tag(self, tag_content: str):
        tag_content = tag_content.strip()

        if tag_content.startswith('</'):
            tag_name = tag_content[2:-1].strip()
            self._handle_closing_tag(tag_name)
        else:
            tag_content = tag_content[1:-1]
            parts = tag_content.split(maxsplit=1)
            tag_name = parts[0]
            attributes = {}

            if len(parts) > 1:
                attr_text = parts[1]
                attr_matches = re.findall(r'(\w+)\s*=\s*"([^"]*)"', attr_text)
                attributes = dict(attr_matches)

            self._handle_opening_tag(tag_name, attributes)

    def _handle_opening_tag(self, tag_name: str, attributes: Dict[str, str]):
        config = self.tag_configs.get(tag_name)
        if not config:
            print(f"⚠️ Warning: Unregistered tag type: {tag_name}")
            return

        context = TagContext(
            name=tag_name,
            attributes=attributes,
            content=[],
            parent=self.tag_stack[-1] if self.tag_stack else None,
            config=config
        )
        self.tag_stack.append(context)

    def _handle_closing_tag(self, tag_name: str):
        if not self.tag_stack:
            print(f"⚠️ Warning: Found closing tag {tag_name} but no opening tags in stack")
            return

        if self.tag_stack[-1].name == tag_name:
            context = self.tag_stack.pop()
            content = ''.join(context.content).strip()
            if context.config and context.config.handler:
                context.config.handler(context.attributes, content)
        else:
            print(f"⚠️ Warning: Mismatched closing tag: expected {self.tag_stack[-1].name}, got {tag_name}")
