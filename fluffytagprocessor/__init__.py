"""
FluffyTagProcessor - XML/tag processor for LLM outputs.

A lightweight, production-ready processor for parsing XML-like tags in text,
particularly designed for processing structured output from Large Language Models.
"""

__version__ = '1.0.0'

from .processor import FluffyTagProcessor, TagProcessorError, TagConfig, TagContext

__all__ = ['FluffyTagProcessor', 'TagProcessorError', 'TagConfig', 'TagContext']