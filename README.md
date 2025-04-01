# The Complete Guide to FluffyTagProcessor

A comprehensive guide to building Claude-like artifacts and structured content processing for LLMs

---

## Table of Contents

1. [Introduction](#introduction)
   - [What is FluffyTagProcessor?](#what-is-fluffytagprocessor)
   - [Why Build Artifact Systems for LLMs?](#why-build-artifact-systems-for-llms)
   - [Use Cases and Applications](#use-cases-and-applications)

2. [Fundamentals of Tag Processing](#fundamentals-of-tag-processing)
   - [Understanding XML-like Tags](#understanding-xml-like-tags)
   - [Tag Structure and Components](#tag-structure-and-components)
   - [Processing Flow Overview](#processing-flow-overview)

3. [Getting Started](#getting-started)
   - [Installation](#installation)
     - [JavaScript/TypeScript](#javascripttypescript)
     - [Python](#python)
   - [Basic Setup](#basic-setup)
   - [Your First Tag Handler](#your-first-tag-handler)

4. [Building Basic Artifact Systems](#building-basic-artifact-systems)
   - [Code Block Artifacts](#code-block-artifacts)
   - [Markdown Content Artifacts](#markdown-content-artifacts)
   - [Self-closing Tag Artifacts](#self-closing-tag-artifacts)
   - [Handling Untagged Content](#handling-untagged-content)

5. [Step-by-Step Tutorials](#step-by-step-tutorials)
   - [Building a Code Renderer](#building-a-code-renderer)
   - [Creating a Markdown Processor](#creating-a-markdown-processor)
   - [Building a Diagram Generator](#building-a-diagram-generator)
   - [Creating a Form Generator](#creating-a-form-generator)

6. [Advanced Features](#advanced-features)
   - [Streaming Content Processing](#streaming-content-processing)
   - [Nested Tags and Complex Structures](#nested-tags-and-complex-structures)
   - [Error Handling and Recovery](#error-handling-and-recovery)
   - [Custom Tag Attributes](#custom-tag-attributes)
   - [Event-based Processing](#event-based-processing)

7. [Integration with LLM Systems](#integration-with-llm-systems)
   - [Prompting Strategies for Structured Content](#prompting-strategies-for-structured-content)
   - [Processing LLM Outputs in Real-time](#processing-llm-outputs-in-real-time)
   - [Creating Interactive UI Components](#creating-interactive-ui-components)
   - [Building a Complete LLM UI System](#building-a-complete-llm-ui-system)

8. [Complete API Reference](#complete-api-reference)
   - [JavaScript/TypeScript API](#javascripttypescript-api)
   - [Python API](#python-api)
   - [Configuration Options](#configuration-options)
   - [Handler Options](#handler-options)
   - [Methods and Properties](#methods-and-properties)
   - [Error Types and Handling](#error-types-and-handling)

9. [Best Practices and Optimizations](#best-practices-and-optimizations)
   - [Performance Considerations](#performance-considerations)
   - [Memory Usage and Optimization](#memory-usage-and-optimization)
   - [Design Patterns](#design-patterns)
   - [Testing and Validation](#testing-and-validation)

10. [Troubleshooting](#troubleshooting) To be Added
    - [Common Issues and Solutions](#common-issues-and-solutions)
    - [Debugging Techniques](#debugging-techniques)
    - [Validation Tools](#validation-tools)

11. [Real-World Examples](#real-world-examples)
    - [Building a Claude-like Artifact System](#building-a-claude-like-artifact-system)
    - [Creating an OpenAI Canvas Alternative](#creating-an-openai-canvas-alternative)
    - [Building a v0-inspired UI Generator](#building-a-v0-inspired-ui-generator)

12. [Advanced Implementation Examples](#advanced-implementation-examples)
    - [Full-stack Web Application](#full-stack-web-application)
    - [React Component Library](#react-component-library)
    - [Python Web Application](#python-web-application)

---

## Introduction

### What is FluffyTagProcessor?

FluffyTagProcessor is a lightweight, production-ready library for parsing XML-like tags in text content. It's specifically designed to help developers build systems that can process structured content from Large Language Models (LLMs).

Think of it as the engine that powers artifact systems like Claude's, allowing you to:

1. Parse specially formatted tags in text
2. Extract attributes and content from these tags
3. Process different types of content with specialized handlers
4. Create interactive, structured outputs from LLM-generated content

FluffyTagProcessor gives you the building blocks to create your own artifact system, where an LLM can generate not just text, but fully functional code snippets, interactive UI components, visualizations, and more.

### Why Build Artifact Systems for LLMs?

Modern LLMs are incredibly powerful at generating content, but raw text has limitations. Artifact systems enhance LLM capabilities by allowing them to:

- **Generate executable code** that users can run, edit, and use immediately
- **Create visualizations** like charts, diagrams, and graphs
- **Build interactive UI components** like forms, buttons, and interactive elements
- **Format content** with proper styling, syntax highlighting, and structure
- **Provide structured data** that can be easily processed and used by applications

By implementing an artifact system with FluffyTagProcessor, you can transform basic LLM outputs into rich, interactive experiences similar to Claude's artifacts, OpenAI's Canvas, or v0's UI generation.

### Use Cases and Applications

The ability to process structured content from LLMs opens up numerous possibilities:

- **Code generation tools** with syntax highlighting and execution capabilities
- **Documentation generators** that create formatted, structured documentation
- **Interactive dashboards** powered by LLM-generated visualizations
- **UI prototyping tools** where LLMs generate functional UI components
- **Content management systems** with structured content blocks
- **Data analysis tools** where LLMs can generate and visualize analyses
- **Educational platforms** with interactive exercises and examples
- **Creative writing assistants** with formatted output and rich media

---

## Fundamentals of Tag Processing

### Understanding XML-like Tags

At the core of FluffyTagProcessor is the ability to recognize and process XML-like tags in text. These tags are similar to HTML or XML tags and follow a similar structure:

```
<tagname attribute1="value1" attribute2="value2">
  Content goes here
</tagname>
```

FluffyTagProcessor identifies these tags, extracts their attributes and content, and processes them according to registered handlers.

### Tag Structure and Components

A tag in FluffyTagProcessor consists of:

1. **Tag Name**: The identifier that determines how the tag will be processed (e.g., `code`, `visualization`, `component`)
2. **Attributes**: Key-value pairs that provide additional information about the tag (e.g., `language="python"`, `type="bar-chart"`)
3. **Content**: The text or data between the opening and closing tags
4. **Opening Tag**: Marks the beginning of the tag with `<tagname>`
5. **Closing Tag**: Marks the end of the tag with `</tagname>`
6. **Self-closing Tag**: A shorthand for tags without content: `<tagname attribute="value" />`

For example:

```
<code language="javascript" highlight="true">
function hello() {
  console.log("Hello, world!");
}
</code>
```

In this example:
- Tag name: `code`
- Attributes: `language="javascript"` and `highlight="true"`
- Content: The JavaScript function

### Processing Flow Overview

The basic flow of FluffyTagProcessor works like this:

1. **Initialization**: Create a FluffyTagProcessor instance
2. **Registration**: Register handlers for different tag types
3. **Processing**: Feed text containing tags to the processor
4. **Parsing**: The processor identifies tags and their components
5. **Handling**: The processor calls the appropriate handlers for each tag
6. **Cleanup**: Flush the processor to handle any remaining content

This flow allows for both batch processing of complete texts and streaming processing of content as it arrives.

---

## Getting Started

### Installation

#### JavaScript/TypeScript
Add the js/ts version to your project.

#### Python

Add the python folder to your project.

### Basic Setup

Let's set up a basic FluffyTagProcessor instance in both JavaScript and Python:

#### JavaScript/TypeScript

```javascript
// Import the library
import { FluffyTagProcessor } from 'fluffy-tag-processor';

// Create a processor instance
const processor = new FluffyTagProcessor();

// For debugging (optional)
const debugProcessor = new FluffyTagProcessor({ 
  debug: true,
  errorHandler: (error) => console.error('Processing error:', error)
});
```

#### Python

```python
# Import the library
from fluffy_tag_processor import FluffyTagProcessor

# Create a processor instance
processor = FluffyTagProcessor()

# For debugging (optional)
def error_handler(error):
    print(f"Processing error: {error}")

debug_processor = FluffyTagProcessor(
    debug=True,
    error_handler=error_handler
)
```

### Your First Tag Handler

Now, let's register a simple handler for a 'code' tag:

#### JavaScript/TypeScript

```javascript
// Register a handler for 'code' tags
processor.registerHandler('code', (attributes, content) => {
  // Get the language from attributes (default to 'text' if not specified)
  const language = attributes.language || 'text';
  
  // Process the code content
  console.log(`Processing code in ${language}:`);
  console.log(content);
  
  // In a real application, you might:
  // - Apply syntax highlighting
  // - Make it executable
  // - Add copy functionality
  // - etc.
});

// Process some text with a code tag
const text = `
Here's a simple example:

<code language="javascript">
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
</code>

Hope that helps!
`;

processor.processString(text);
processor.flush();
```

#### Python

```python
# Register a handler for 'code' tags
def handle_code(attributes, content):
    # Get the language from attributes (default to 'text' if not specified)
    language = attributes.get('language', 'text')
    
    # Process the code content
    print(f"Processing code in {language}:")
    print(content)
    
    # In a real application, you might:
    # - Apply syntax highlighting
    # - Make it executable
    # - Add copy functionality
    # - etc.

processor.register_handler('code', handle_code)

# Process some text with a code tag
text = """
Here's a simple example:

<code language="python">
def greet(name):
    return f"Hello, {name}!"
print(greet('World'))
</code>

Hope that helps!
"""

processor.process_string(text)
processor.flush()
```

Congratulations! You've just created your first tag processor that can identify and handle code blocks. This is the foundation of building a full artifact system.

---

## Building Basic Artifact Systems

### Code Block Artifacts

Let's expand our code handler to create a more functional code artifact system:

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import { highlight } from 'highlight.js'; // Assuming you have a syntax highlighter

// Create the processor
const processor = new FluffyTagProcessor();

// Create a container to hold our artifacts
const artifacts = [];

// Register a handler for code blocks
processor.registerHandler('code', (attributes, content) => {
  const language = attributes.language || 'text';
  const highlightLines = attributes.highlight ? attributes.highlight.split(',') : [];
  
  // Create a code artifact
  const artifact = {
    type: 'code',
    language,
    content,
    highlightedContent: language !== 'text' ? highlight(language, content).value : content,
    highlightLines,
    id: `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  };
  
  // Add to our artifacts collection
  artifacts.push(artifact);
  
  // Return the artifact ID so it can be referenced
  return artifact.id;
});

// Handle untagged content
processor.setUntaggedContentHandler((content) => {
  if (content.trim()) {
    artifacts.push({
      type: 'text',
      content,
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    });
  }
});

// Process some LLM output
function processLLMOutput(llmOutput) {
  // Clear previous artifacts
  artifacts.length = 0;
  
  // Process the output
  processor.processString(llmOutput);
  processor.flush();
  
  // Return the artifacts
  return artifacts;
}

// Example usage
const llmOutput = `
To solve this problem, we need to create a function that reverses a string.

<code language="javascript">
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Example usage
console.log(reverseString('hello')); // outputs: 'olleh'
</code>

The function works by splitting the string into an array of characters, 
reversing the array, and then joining it back into a string.

Here's how you could do it in Python:

<code language="python">
def reverse_string(s):
    return s[::-1]

# Example usage
print(reverse_string('hello'))  # outputs: 'olleh'
</code>

Both implementations have O(n) time complexity where n is the length of the string.
`;

const generatedArtifacts = processLLMOutput(llmOutput);
console.log(`Generated ${generatedArtifacts.length} artifacts`);

// In a real application, you would render these artifacts in your UI
```

#### Python

```python
from fluffy_tag_processor import FluffyTagProcessor
import uuid
from datetime import datetime
import pygments  # Assuming you have a syntax highlighter
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

# Create the processor
processor = FluffyTagProcessor()

# Create a container to hold our artifacts
artifacts = []

# Register a handler for code blocks
def handle_code(attributes, content):
    language = attributes.get('language', 'text')
    highlight_lines = attributes.get('highlight', '').split(',') if 'highlight' in attributes else []
    
    # Create a code artifact
    artifact = {
        'type': 'code',
        'language': language,
        'content': content,
        'highlighted_content': highlight_code(content, language) if language != 'text' else content,
        'highlight_lines': highlight_lines,
        'id': f"code-{uuid.uuid4()}",
        'created_at': datetime.now(),
    }
    
    # Add to our artifacts collection
    artifacts.append(artifact)
    
    # Return the artifact ID so it can be referenced
    return artifact['id']

def highlight_code(code, language):
    """Apply syntax highlighting to code"""
    try:
        lexer = get_lexer_by_name(language, stripall=True)
        formatter = HtmlFormatter(linenos=True)
        return pygments.highlight(code, lexer, formatter)
    except Exception as e:
        print(f"Error highlighting code: {e}")
        return code

# Handle untagged content
def handle_untagged(content):
    if content.strip():
        artifacts.append({
            'type': 'text',
            'content': content,
            'id': f"text-{uuid.uuid4()}",
            'created_at': datetime.now(),
        })

processor.register_handler('code', handle_code)
processor.set_untagged_content_handler(handle_untagged)

# Process some LLM output
def process_llm_output(llm_output):
    # Clear previous artifacts
    artifacts.clear()
    
    # Process the output
    processor.process_string(llm_output)
    processor.flush()
    
    # Return the artifacts
    return artifacts

# Example usage
llm_output = """
To solve this problem, we need to create a function that reverses a string.

<code language="python">
def reverse_string(s):
    return s[::-1]

# Example usage
print(reverse_string('hello'))  # outputs: 'olleh'
</code>

The function works by using Python's slice notation with a negative step value,
which effectively reverses the string.

Here's how you could do it in JavaScript:

<code language="javascript">
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Example usage
console.log(reverseString('hello')); // outputs: 'olleh'
</code>

Both implementations have O(n) time complexity where n is the length of the string.
"""

generated_artifacts = process_llm_output(llm_output)
print(f"Generated {len(generated_artifacts)} artifacts")

# In a real application, you would render these artifacts in your UI
```

### Markdown Content Artifacts

Let's add support for markdown content:

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import { marked } from 'marked'; // Markdown parser

// Extend our previous processor
processor.registerHandler('markdown', (attributes, content) => {
  // Create a markdown artifact
  const artifact = {
    type: 'markdown',
    content,
    renderedContent: marked(content),
    id: `markdown-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  };
  
  artifacts.push(artifact);
  return artifact.id;
});

// Example with markdown
const llmOutputWithMarkdown = `
Here's a summary of the key points:

<markdown>
# Key Findings

1. User engagement increased by **27%** after the redesign
2. Average session duration went from 2.5 minutes to 4.3 minutes
3. Conversion rate improved by 13% 

## Areas for Improvement

- Mobile responsiveness still needs work
- Page load times could be optimized further
- Some users reported confusion with the new navigation
</markdown>

Would you like me to elaborate on any of these points?
`;

// Process it
const markdownArtifacts = processLLMOutput(llmOutputWithMarkdown);
```

#### Python

```python
from fluffy_tag_processor import FluffyTagProcessor
import markdown  # Markdown parser

# Extend our previous processor
def handle_markdown(attributes, content):
    # Create a markdown artifact
    artifact = {
        'type': 'markdown',
        'content': content,
        'rendered_content': markdown.markdown(content),
        'id': f"markdown-{uuid.uuid4()}",
        'created_at': datetime.now(),
    }
    
    artifacts.append(artifact)
    return artifact['id']

processor.register_handler('markdown', handle_markdown)

# Example with markdown
llm_output_with_markdown = """
Here's a summary of the key points:

<markdown>
# Key Findings

1. User engagement increased by **27%** after the redesign
2. Average session duration went from 2.5 minutes to 4.3 minutes
3. Conversion rate improved by 13% 

## Areas for Improvement

- Mobile responsiveness still needs work
- Page load times could be optimized further
- Some users reported confusion with the new navigation
</markdown>

Would you like me to elaborate on any of these points?
"""

# Process it
markdown_artifacts = process_llm_output(llm_output_with_markdown)
```

### Self-closing Tag Artifacts

Now, let's add support for self-closing tags which are perfect for simple elements like images or icons:

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';

// Register handler for image tags
processor.registerHandler('img', (attributes, content) => {
  // Note: content will be empty for self-closing tags
  
  const artifact = {
    type: 'image',
    src: attributes.src || '',
    alt: attributes.alt || '',
    width: attributes.width,
    height: attributes.height,
    id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  };
  
  artifacts.push(artifact);
  return artifact.id;
});

// Example with self-closing tags
const llmOutputWithImage = `
Here's a diagram showing the process:

<img src="diagram.png" alt="Process flow diagram" width="600" height="400" />

As you can see, the process has three main steps...
`;

// Process it
const imageArtifacts = processLLMOutput(llmOutputWithImage);
```

#### Python

```python
from fluffy_tag_processor import FluffyTagProcessor

# Register handler for image tags
def handle_image(attributes, content):
    # Note: content will be empty for self-closing tags
    
    artifact = {
        'type': 'image',
        'src': attributes.get('src', ''),
        'alt': attributes.get('alt', ''),
        'width': attributes.get('width'),
        'height': attributes.get('height'),
        'id': f"image-{uuid.uuid4()}",
        'created_at': datetime.now(),
    }
    
    artifacts.append(artifact)
    return artifact['id']

processor.register_handler('img', handle_image)

# Example with self-closing tags
llm_output_with_image = """
Here's a diagram showing the process:

<img src="diagram.png" alt="Process flow diagram" width="600" height="400" />

As you can see, the process has three main steps...
"""

# Process it
image_artifacts = process_llm_output(llm_output_with_image)
```

### Handling Untagged Content

Proper handling of untagged content is crucial for a complete artifact system:

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';

// Create processor with a bigger threshold for untagged content
const processor = new FluffyTagProcessor({
  autoProcessUntaggedContent: true,
  autoProcessThreshold: 100  // Process untagged content in bigger chunks
});

// Handle untagged content with more structure
processor.setUntaggedContentHandler((content) => {
  if (!content.trim()) return; // Skip empty content
  
  // Determine if this is a paragraph, list, or other type of content
  const contentType = determineContentType(content);
  
  const artifact = {
    type: contentType,
    content,
    renderedContent: renderContent(content, contentType),
    id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  };
  
  artifacts.push(artifact);
  return artifact.id;
});

// Helper functions
function determineContentType(content) {
  // Simple heuristic, could be more sophisticated
  if (content.trim().startsWith('- ') || content.trim().startsWith('* ')) {
    return 'bullet-list';
  } else if (/^\d+\./.test(content.trim())) {
    return 'numbered-list';
  } else {
    return 'paragraph';
  }
}

function renderContent(content, type) {
  // Simple rendering, could be more sophisticated
  switch (type) {
    case 'bullet-list':
      return `<ul>${content.split('\n').map(line => 
        line.trim().startsWith('- ') || line.trim().startsWith('* ') 
          ? `<li>${line.trim().substring(2)}</li>`
          : ''
      ).join('')}</ul>`;
    case 'numbered-list':
      return `<ol>${content.split('\n').map(line => {
        const match = line.trim().match(/^\d+\.\s*(.*)/);
        return match ? `<li>${match[1]}</li>` : '';
      }).join('')}</ol>`;
    default:
      return `<p>${content}</p>`;
  }
}
```

#### Python

```python
from fluffy_tag_processor import FluffyTagProcessor
import re

# Create processor with a bigger threshold for untagged content
processor = FluffyTagProcessor(
    auto_process_untagged=True,
    auto_process_threshold=100  # Process untagged content in bigger chunks
)

# Handle untagged content with more structure
def handle_untagged_content(content):
    if not content.strip():
        return  # Skip empty content
    
    # Determine if this is a paragraph, list, or other type of content
    content_type = determine_content_type(content)
    
    artifact = {
        'type': content_type,
        'content': content,
        'rendered_content': render_content(content, content_type),
        'id': f"text-{uuid.uuid4()}",
        'created_at': datetime.now(),
    }
    
    artifacts.append(artifact)
    return artifact['id']

processor.set_untagged_content_handler(handle_untagged_content)

# Helper functions
def determine_content_type(content):
    # Simple heuristic, could be more sophisticated
    if content.strip().startswith('- ') or content.strip().startswith('* '):
        return 'bullet-list'
    elif re.match(r'^\d+\.', content.strip()):
        return 'numbered-list'
    else:
        return 'paragraph'

def render_content(content, content_type):
    # Simple rendering, could be more sophisticated
    if content_type == 'bullet-list':
        list_items = []
        for line in content.split('\n'):
            line = line.strip()
            if line.startswith('- ') or line.startswith('* '):
                list_items.append(f"<li>{line[2:]}</li>")
        return f"<ul>{''.join(list_items)}</ul>"
    
    elif content_type == 'numbered-list':
        list_items = []
        for line in content.split('\n'):
            match = re.match(r'^\d+\.\s*(.*)', line.strip())
            if match:
                list_items.append(f"<li>{match.group(1)}</li>")
        return f"<ol>{''.join(list_items)}</ol>"
    
    else:
        return f"<p>{content}</p>"
```

These examples show how to create basic artifact types for:
- Code blocks with syntax highlighting
- Markdown content with rendering
- Images and other self-closing tags
- Structured handling of untagged content

This forms the foundation of a complete artifact system similar to Claude's.

---

## Step-by-Step Tutorials

### Building a Code Renderer

Let's build a complete code renderer artifact system that allows for:
- Syntax highlighting
- Line numbering
- Copying code
- Executing JavaScript in the browser

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

class CodeRenderer {
  constructor() {
    this.artifacts = [];
    this.processor = new FluffyTagProcessor();
    
    // Register code handler
    this.processor.registerHandler('code', this.handleCode.bind(this));
    
    // Register untagged content handler
    this.processor.setUntaggedContentHandler(this.handleUntaggedContent.bind(this));
  }
  
  handleCode(attributes, content) {
    const language = attributes.language || 'plaintext';
    let highlighted;
    
    try {
      // Apply syntax highlighting
      if (language !== 'plaintext') {
        highlighted = hljs.highlight(content, { language }).value;
      } else {
        highlighted = content;
      }
    } catch (error) {
      console.warn(`Error highlighting code: ${error.message}`);
      highlighted = content;
    }
    
    const artifact = {
      type: 'code',
      language,
      content,
      highlighted,
      id: `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      executable: language === 'javascript' || language === 'js',
      copyable: true,
      attributes,
    };
    
    this.artifacts.push(artifact);
    return artifact.id;
  }
  
  handleUntaggedContent(content) {
    if (!content.trim()) return;
    
    this.artifacts.push({
      type: 'text',
      content,
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    });
  }
  
  processLLMOutput(text) {
    // Clear previous artifacts
    this.artifacts = [];
    
    // Process the output
    this.processor.processString(text);
    this.processor.flush();
    
    return this.artifacts;
  }
  
  // Render artifacts to the DOM
  renderToDOM(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID '${containerId}' not found`);
      return;
    }
    
    // Clear the container
    container.innerHTML = '';
    
    // Render each artifact
    this.artifacts.forEach(artifact => {
      if (artifact.type === 'code') {
        this.renderCodeArtifact(artifact, container);
      } else if (artifact.type === 'text') {
        this.renderTextArtifact(artifact, container);
      }
    });
  }
  
  renderCodeArtifact(artifact, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-artifact';
    wrapper.id = artifact.id;
    
    // Add header with language and buttons
    const header = document.createElement('div');
    header.className = 'code-header';
    
    // Language indicator
    const languageSpan = document.createElement('span');
    languageSpan.className = 'code-language';
    languageSpan.textContent = artifact.language;
    header.appendChild(languageSpan);
    
    // Copy button
    if (artifact.copyable) {
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-button';
      copyButton.textContent = 'Copy';
      copyButton.onclick = () => {
        navigator.clipboard.writeText(artifact.content)
          .then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy code:', err);
            copyButton.textContent = 'Error';
            setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
          });
      };
      header.appendChild(copyButton);
    }
    
    // Execute button for JavaScript
    if (artifact.executable) {
      const executeButton = document.createElement('button');
      executeButton.className = 'code-execute-button';
      executeButton.textContent = 'Run';
      executeButton.onclick = () => {
        try {
          // Create output display
          let outputDiv = wrapper.querySelector('.code-output');
          if (!outputDiv) {
            outputDiv = document.createElement('div');
            outputDiv.className = 'code-output';
            wrapper.appendChild(outputDiv);
          } else {
            outputDiv.innerHTML = '';
          }
          
          // Capture console.log output
          const originalLog = console.log;
          const logs = [];
          console.log = (...args) => {
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
            originalLog(...args);
          };
          
          // Execute the code
          try {
            const result = eval(artifact.content);
            if (result !== undefined && logs.length === 0) {
              logs.push(`Result: ${result}`);
            }
          } finally {
            // Restore console.log
            console.log = originalLog;
          }
          
          // Display output
          logs.forEach(log => {
            const logLine = document.createElement('div');
            logLine.className = 'log-line';
            logLine.textContent = log;
            outputDiv.appendChild(logLine);
          });
          
          if (logs.length === 0) {
            const logLine = document.createElement('div');
            logLine.className = 'log-line';
            logLine.textContent = '(No output)';
            outputDiv.appendChild(logLine);
          }
        } catch (error) {
          // Display error
          let outputDiv = wrapper.querySelector('.code-output');
          if (!outputDiv) {
            outputDiv = document.createElement('div');
            outputDiv.className = 'code-output';
            wrapper.appendChild(outputDiv);
          } else {
            outputDiv.innerHTML = '';
          }
          
          const errorLine = document.createElement('div');
          errorLine.className = 'error-line';
          errorLine.textContent = `Error: ${error.message}`;
          outputDiv.appendChild(errorLine);
        }
      };
      header.appendChild(executeButton);
    }
    
    wrapper.appendChild(header);
    
    // Code content
    const codeElement = document.createElement('pre');
    codeElement.className = `code-content language-${artifact.language}`;
    codeElement.innerHTML = artifact.highlighted;
    wrapper.appendChild(codeElement);
    
    container.appendChild(wrapper);
  }
  
  renderTextArtifact(artifact, container) {
    const paragraph = document.createElement('div');
    paragraph.className = 'text-artifact';
    paragraph.id = artifact.id;
    paragraph.textContent = artifact.content;
    container.appendChild(paragraph);
  }
}

// Usage
const renderer = new CodeRenderer();

// Process LLM output
const llmOutput = `
You can calculate the Fibonacci sequence using recursion:

<code language="javascript">
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}
</code>

However, this recursive approach is inefficient. A better approach uses dynamic programming:

<code language="javascript">
function fibonacciDP(n) {
  if (n <= 1) return n;
  
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i-1] + fib[i-2];
  }
  
  return fib[n];
}

// Calculate the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacciDP(i));
}
</code>

Try running both versions to see the output!
`;

const artifacts = renderer.processLLMOutput(llmOutput);

// Render to DOM
document.addEventListener('DOMContentLoaded', () => {
  renderer.renderToDOM('artifacts-container');
  
  // Add some basic styles
  const style = document.createElement('style');
  style.textContent = `
    .code-artifact {
      margin: 1rem 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    .code-header {
      background: #f5f5f5;
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
    }
    .code-content {
      margin: 0;
      padding: 1rem;
      overflow-x: auto;
    }
    .code-output {
      background: #f9f9f9;
      border-top: 1px solid #ddd;
      padding: 0.5rem;
      max-height: 200px;
      overflow-y: auto;
    }
    .log-line {
      font-family: monospace;
      padding: 0.1rem 0;
    }
    .error-line {
      font-family: monospace;
      color: red;
    }
    .text-artifact {
      margin: 1rem 0;
      line-height: 1.5;
    }
  `;
  document.head.appendChild(style);
});
```

#### HTML (for the above JavaScript example)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Artifact Renderer</title>
  <!-- Link to your JavaScript file or include it at the end of the body -->
</head>
<body>
  <h1>Code Artifact Renderer</h1>
  
  <div id="artifacts-container">
    <!-- Artifacts will be rendered here -->
  </div>
  
  <script src="your-script.js"></script>
</body>
</html>
```

### Creating a Markdown Processor

Let's build a markdown artifact processor that:
- Renders Markdown to HTML
- Supports different types of markdown content (e.g., documentation, notes)
- Allows for custom styling

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import { marked } from 'marked';
import DOMPurify from 'dompurify'; // For sanitizing HTML

class MarkdownProcessor {
  constructor() {
    this.artifacts = [];
    this.processor = new FluffyTagProcessor();
    
    // Configure marked
    marked.setOptions({
      gfm: true,         // GitHub Flavored Markdown
      breaks: true,      // Convert \n to <br>
      headerIds: true,   // Add IDs to headers
      mangle: false,     // Don't escape HTML
      sanitize: false,   // We'll sanitize with DOMPurify
    });
    
    // Register markdown handler
    this.processor.registerHandler('markdown', this.handleMarkdown.bind(this));
    
    // Register untagged content handler
    this.processor.setUntaggedContentHandler(this.handleUntaggedContent.bind(this));
  }
  
  handleMarkdown(attributes, content) {
    // Determine markdown type (default to 'standard')
    const type = attributes.type || 'standard';
    
    // Process the markdown content
    const rawHtml = marked(content);
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    
    const artifact = {
      type: 'markdown',
      markdownType: type,
      content,
      html: sanitizedHtml,
      id: `markdown-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      attributes,
    };
    
    this.artifacts.push(artifact);
    return artifact.id;
  }
  
  handleUntaggedContent(content) {
    if (!content.trim()) return;
    
    this.artifacts.push({
      type: 'text',
      content,
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    });
  }
  
  processLLMOutput(text) {
    // Clear previous artifacts
    this.artifacts = [];
    
    // Process the output
    this.processor.processString(text);
    this.processor.flush();
    
    return this.artifacts;
  }
  
  // Render artifacts to the DOM
  renderToDOM(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID '${containerId}' not found`);
      return;
    }
    
    // Clear the container
    container.innerHTML = '';
    
    // Render each artifact
    this.artifacts.forEach(artifact => {
      if (artifact.type === 'markdown') {
        this.renderMarkdownArtifact(artifact, container);
      } else if (artifact.type === 'text') {
        this.renderTextArtifact(artifact, container);
      }
    });
  }
  
  renderMarkdownArtifact(artifact, container) {
    const wrapper = document.createElement('div');
    wrapper.className = `markdown-artifact markdown-${artifact.markdownType}`;
    wrapper.id = artifact.id;
    
    // Add header with type indicator
    const header = document.createElement('div');
    header.className = 'markdown-header';
    
    // Type indicator
    const typeSpan = document.createElement('span');
    typeSpan.className = 'markdown-type';
    typeSpan.textContent = artifact.markdownType.charAt(0).toUpperCase() + 
                          artifact.markdownType.slice(1);
    header.appendChild(typeSpan);
    
    wrapper.appendChild(header);
    
    // Markdown content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'markdown-content';
    contentDiv.innerHTML = artifact.html;
    wrapper.appendChild(contentDiv);
    
    container.appendChild(wrapper);
  }
  
  renderTextArtifact(artifact, container) {
    const paragraph = document.createElement('div');
    paragraph.className = 'text-artifact';
    paragraph.id = artifact.id;
    paragraph.textContent = artifact.content;
    container.appendChild(paragraph);
  }
}

// Usage
const processor = new MarkdownProcessor();

// Process LLM output
const llmOutput = `
I've prepared some documentation for your project:

<markdown type="documentation">
# User Authentication System

## Overview

This module handles user authentication, including:

- User registration
- Login and logout
- Password reset
- Session management

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /auth/register | POST | Register a new user |
| /auth/login | POST | Authenticate a user |
| /auth/logout | POST | End a user session |
| /auth/reset | POST | Request password reset |

## Code Example

\`\`\`javascript
// Register a new user
async function registerUser(username, email, password) {
  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });
  
  return response.json();
}
\`\`\`
</markdown>

I've also included some important notes:

<markdown type="notes">
## Implementation Notes

- Remember to hash passwords before storing them
- Use HTTPS for all authentication endpoints
- Implement rate limiting to prevent brute force attacks
- Consider adding 2FA for additional security
</markdown>

Let me know if you need any clarification!
`;

const artifacts = processor.processLLMOutput(llmOutput);

// Render to DOM
document.addEventListener('DOMContentLoaded', () => {
  processor.renderToDOM('markdown-container');
  
  // Add some basic styles
  const style = document.createElement('style');
  style.textContent = `
    .markdown-artifact {
      margin: 1rem 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    .markdown-header {
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
    }
    .markdown-documentation .markdown-header {
      background: #f0f7ff;
    }
    .markdown-notes .markdown-header {
      background: #fff8e6;
    }
    .markdown-standard .markdown-header {
      background: #f5f5f5;
    }
    .markdown-content {
      padding: 1rem;
    }
    .markdown-content h1,
    .markdown-content h2,
    .markdown-content h3 {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    .markdown-content p {
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    .markdown-content ul,
    .markdown-content ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }
    .markdown-content table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1rem;
    }
    .markdown-content th,
    .markdown-content td {
      border: 1px solid #ddd;
      padding: 0.5rem;
    }
    .markdown-content th {
      background: #f5f5f5;
    }
    .markdown-content code {
      background: #f5f5f5;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
    }
    .markdown-content pre {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 3px;
      overflow-x: auto;
    }
    .markdown-content pre code {
      background: transparent;
      padding: 0;
    }
    .text-artifact {
      margin: 1rem 0;
      line-height: 1.5;
    }
  `;
  document.head.appendChild(style);
});
```

#### HTML (for the above JavaScript example)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Artifact Processor</title>
  <!-- Link to your JavaScript file or include it at the end of the body -->
</head>
<body>
  <h1>Markdown Artifact Processor</h1>
  
  <div id="markdown-container">
    <!-- Artifacts will be rendered here -->
  </div>
  
  <script src="your-markdown-script.js"></script>
</body>
</html>
```

These step-by-step tutorials demonstrate how to build functional artifact systems for code rendering and markdown processing. You can extend these examples to create other types of artifacts, such as diagrams, interactive components, and more.

---

## Advanced Features

### Streaming Content Processing

FluffyTagProcessor supports streaming content processing, which is especially useful for real-time applications where you want to display content as it arrives from an LLM.

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';

class StreamingProcessor {
  constructor(renderCallback) {
    this.renderCallback = renderCallback;
    this.currentContent = '';
    
    this.processor = new FluffyTagProcessor({
      autoProcessUntaggedContent: true,
      autoProcessThreshold: 10 // Process every 10 characters
    });
    
    // Set up handlers
    this.setupHandlers();
  }
  
  setupHandlers() {
    // Handle streaming code blocks
    this.processor.registerHandler('code', (attributes, content) => {
      const language = attributes.language || 'plaintext';
      
      const artifact = {
        type: 'code',
        language,
        content,
        id: `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      
      this.renderCallback(artifact);
    }, {
      // Enable streaming to see content as it comes in
      streamContent: true,
      streamingCallback: (char, attributes) => {
        // This gets called for each character as it arrives
        this.currentContent += char;
        
        // We could update the UI with each character, but that's inefficient
        // Instead, let's update every 10 characters or on newlines
        if (char === '\n' || this.currentContent.length % 10 === 0) {
          this.renderCallback({
            type: 'code-streaming',
            language: attributes.language || 'plaintext',
            content: this.currentContent,
            isStreaming: true
          });
        }
      },
      // This gets called when the tag starts
      onTagStartCallback: (tagName, attributes) => {
        // Reset the current content
        this.currentContent = '';
        
        // Notify that we've started a new code block
        this.renderCallback({
          type: 'code-start',
          language: attributes.language || 'plaintext',
          id: `code-start-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        });
      },
      // This gets called when the tag is complete
      onTagCompleteCallback: (tagName, attributes, content) => {
        // Notify that the code block is complete
        this.renderCallback({
          type: 'code-complete',
          language: attributes.language || 'plaintext',
          content,
          id: `code-complete-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        });
      }
    });
    
    // Handle untagged content
    this.processor.setUntaggedContentHandler((content) => {
      this.renderCallback({
        type: 'text',
        content,
        id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
    });
  }
  
  // Process a chunk of text (call this as text arrives)
  processChunk(chunk) {
    this.processor.processToken(chunk);
  }
  
  // Call this when the stream is complete
  complete() {
    this.processor.flush();
  }
}

// Usage example:
// Simulate an LLM that streams chunks of text

const outputContainer = document.getElementById('output-container');

// Create the streaming processor
const streamingProcessor = new StreamingProcessor((artifact) => {
  // This callback gets called with artifacts as they're processed
  
  if (artifact.type === 'code-start') {
    // Create a new code block
    const codeElement = document.createElement('pre');
    codeElement.id = artifact.id;
    codeElement.className = `code-block language-${artifact.language}`;
    outputContainer.appendChild(codeElement);
  }
  else if (artifact.type === 'code-streaming') {
    // Update the latest code block
    const codeElement = outputContainer.querySelector('.code-block:last-child');
    if (codeElement) {
      codeElement.textContent = artifact.content;
    }
  }
  else if (artifact.type === 'code-complete') {
    // Finalize the code block
    const codeElement = outputContainer.querySelector('.code-block:last-child');
    if (codeElement) {
      codeElement.textContent = artifact.content;
      codeElement.className = `code-block language-${artifact.language} complete`;
    }
  }
  else if (artifact.type === 'text') {
    // Add text content
    const textElement = document.createElement('p');
    textElement.id = artifact.id;
    textElement.className = 'text-content';
    textElement.textContent = artifact.content;
    outputContainer.appendChild(textElement);
  }
});

// Simulate streaming chunks of text from an LLM
function simulateStreamingFromLLM() {
  const llmOutput = `Let me show you how to calculate the factorial of a number.

<code language="javascript">
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Calculate factorial of 5
console.log(factorial(5)); // Output: 120
</code>

You can also implement this iteratively:

<code language="javascript">
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(5)); // Output: 120
</code>

Both implementations produce the same result!`;

  // Simulate streaming by splitting the text into small chunks
  const chunks = [];
  let remaining = llmOutput;
  
  while (remaining.length > 0) {
    // Random chunk size between 1 and 10 characters
    const chunkSize = Math.floor(Math.random() * 10) + 1;
    const chunk = remaining.slice(0, chunkSize);
    remaining = remaining.slice(chunkSize);
    chunks.push(chunk);
  }
  
  // Process chunks with delay to simulate streaming
  let index = 0;
  const processNextChunk = () => {
    if (index < chunks.length) {
      streamingProcessor.processChunk(chunks[index]);
      index++;
      setTimeout(processNextChunk, 50); // 50ms delay between chunks
    } else {
      // All chunks processed
      streamingProcessor.complete();
      console.log('Streaming complete');
    }
  };
  
  // Start processing
  processNextChunk();
}

// Start streaming when the page loads
document.addEventListener('DOMContentLoaded', () => {
  simulateStreamingFromLLM();
});
```

### Nested Tags and Complex Structures

FluffyTagProcessor supports nested tags, allowing for complex structures in your artifacts. Let's explore how to handle nested tags:

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';

class NestedTagProcessor {
  constructor() {
    this.artifacts = [];
    this.processor = new FluffyTagProcessor();
    
    // Register handlers for different tag types
    this.setupHandlers();
  }
  
  setupHandlers() {
    // Handler for 'section' tags (can contain other tags)
    this.processor.registerHandler('section', (attributes, content) => {
      const section = {
        type: 'section',
        title: attributes.title || 'Untitled Section',
        content, // This will include any nested tags (unparsed)
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        attributes,
        children: [] // We'll parse the children separately
      };
      
      // Process nested content by creating a new processor
      const nestedProcessor = new FluffyTagProcessor();
      
      // Register handlers for the nested tags
      nestedProcessor.registerHandler('code', this.handleCode.bind(this));
      nestedProcessor.registerHandler('note', this.handleNote.bind(this));
      
      // Process the content
      nestedProcessor.processString(content);
      nestedProcessor.flush();
      
      // Add this section to our artifacts
      this.artifacts.push(section);
      return section.id;
    }, {
      // Allow nested tags
      allowNested: true,
      // Allow sections within sections
      allowsNestedOfSameType: true
    });
    
    // Also register the direct handlers (for tags not in sections)
    this.processor.registerHandler('code', this.handleCode.bind(this));
    this.processor.registerHandler('note', this.handleNote.bind(this));
    
    // Handle untagged content
    this.processor.setUntaggedContentHandler((content) => {
      if (!content.trim()) return;
      
      this.artifacts.push({
        type: 'text',
        content,
        id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
    });
  }
  
  handleCode(attributes, content) {
    const code = {
      type: 'code',
      language: attributes.language || 'plaintext',
      content,
      id: `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      attributes
    };
    
    this.artifacts.push(code);
    return code.id;
  }
  
  handleNote(attributes, content) {
    const note = {
      type: 'note',
      category: attributes.category || 'info',
      content,
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      attributes
    };
    
    this.artifacts.push(note);
    return note.id;
  }
  
  processLLMOutput(text) {
    // Clear previous artifacts
    this.artifacts = [];
    
    // Process the output
    this.processor.processString(text);
    this.processor.flush();
    
    return this.artifacts;
  }
}

// Usage
const processor = new NestedTagProcessor();

// Process LLM output with nested tags
const llmOutput = `
<section title="Introduction to Algorithms">
  In this section, we'll explore fundamental algorithms.
  
  <section title="Sorting Algorithms">
    Sorting is a fundamental operation in computer science.
    
    <code language="javascript">
    // Bubble sort implementation
    function bubbleSort(arr) {
      const n = arr.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            // Swap elements
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
      return arr;
    }
    </code>
    
    <note category="warning">
    Bubble sort has O(n²) time complexity, making it inefficient for large datasets.
    </note>
  </section>
  
  <section title="Search Algorithms">
    Search algorithms help find elements within a data structure.
    
    <code language="javascript">
    // Binary search implementation
    function binarySearch(arr, target) {
      let low = 0;
      let high = arr.length - 1;
      
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
      }
      
      return -1; // Target not found
    }
    </code>
    
    <note category="info">
    Binary search requires a sorted array and has O(log n) time complexity.
    </note>
  </section>
</section>

<note category="tip">
Remember to analyze the time and space complexity of algorithms before implementation.
</note>
`;

const artifacts = processor.processLLMOutput(llmOutput);
console.log('Generated artifacts:', artifacts);
```

### Error Handling and Recovery

Robust error handling is essential for production applications. Here's a comprehensive example of error handling in FluffyTagProcessor:

#### JavaScript/TypeScript

```javascript
import { FluffyTagProcessor, TagProcessorError } from 'fluffy-tag-processor';

class RobustProcessor {
  constructor() {
    this.artifacts = [];
    this.errors = [];
    
    // Create processor with custom error handler
    this.processor = new FluffyTagProcessor({
      debug: true, // Enable debug mode
      errorHandler: this.handleError.bind(this),
      autoProcessUntaggedContent: true
    });
    
    // Register handlers
    this.setupHandlers();
  }
  
  handleError(error) {
    console.warn('Tag processing error:', error.message, error.context);
    
    // Store the error
    this.errors.push({
      message: error.message,
      context: error.context,
      timestamp: new Date(),
      id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    });
    
    // Create an error artifact if appropriate
    if (error.context && error.context.tagName) {
      this.artifacts.push({
        type: 'error',
        tagName: error.context.tagName,
        message: error.message,
        details: error.context,
        id: `error-artifact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
    }
  }
  
  setupHandlers() {
    // Handler that might throw errors
    this.processor.registerHandler('code', (attributes, content) => {
      // Intentionally throw an error for demonstration
      if (attributes.buggy === 'true') {
        throw new Error('This code has a bug!');
      }
      
      const code = {
        type: 'code',
        language: attributes.language || 'plaintext',
        content,
        id: `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        attributes
      };
      
      this.artifacts.push(code);
      return code.id;
    });
    
    // Handler for markdown that validates content
    this.processor.registerHandler('markdown', (attributes, content) => {
      // Validate markdown content
      if (!content.trim()) {
        throw new TagProcessorError('Markdown content cannot be empty', {
          tagName: 'markdown',
          attributes
        });
      }
      
      // Check for required headers
      if (attributes.requireHeading === 'true' && !content.includes('#')) {
        throw new TagProcessorError('Markdown must include at least one heading', {
          tagName: 'markdown',
          attributes,
          content: content.substring(0, 50) + (content.length > 50 ? '...' : '')
        });
      }
      
      const markdown = {
        type: 'markdown',
        content,
        id: `markdown-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        attributes
      };
      
      this.artifacts.push(markdown);
      return markdown.id;
    });
    
    // Handle untagged content
    this.processor.setUntaggedContentHandler((content) => {
      if (!content.trim()) return;
      
      this.artifacts.push({
        type: 'text',
        content,
        id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
    });
  }
  
  processLLMOutput(text) {
    // Clear previous artifacts and errors
    this.artifacts = [];
    this.errors = [];
    
    try {
      // Process the output
      this.processor.processString(text);
      
      // Always flush, even if errors occurred
      this.processor.flush();
    } catch (error) {
      // This should not happen with our error handler, but just in case
      console.error('Unexpected error during processing:', error);
      
      this.errors.push({
        message: error.message || 'Unknown error',
        stack: error.stack,
        timestamp: new Date(),
        id: `fatal-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
    }
    
    return {
      artifacts: this.artifacts,
      errors: this.errors,
      hasErrors: this.errors.length > 0
    };
  }
  
  // Check for unclosed tags and recover if possible
  recoverFromUnclosedTags() {
    const stackDepth = this.processor.getStackDepth();
    
    if (stackDepth > 0) {
      console.warn(`Detected ${stackDepth} unclosed tags. Attempting recovery...`);
      
      // Get information about pending tags
      const pendingTags = this.processor.getPendingTagInfo();
      
      // Log information about unclosed tags
      pendingTags.forEach(tag => {
        this.errors.push({
          message: `Unclosed tag: ${tag.name}`,
          context: {
            tagName: tag.name,
            startTime: tag.startTime
          },
          timestamp: new Date(),
          id: `unclosed-tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        });
      });
      
      // Auto-close tags by flushing
      this.processor.flush();
      
      return true;
    }
    
    return false;
  }
}

// Usage
const processor = new RobustProcessor();

// Process LLM output with intentional errors
const llmOutput = `
Here's some code with a bug:

<code language="javascript" buggy="true">
function brokenFunction() {
  // This will cause an error in our handler
  return x + y;
}
</code>

And some markdown without a heading:

<markdown requireHeading="true">
This markdown doesn't have a heading, which will cause an error.
</markdown>

Here's a proper code example:

<code language="javascript">
function workingFunction() {
  return "This works fine!";
}
</code>

Here's a tag that won't be closed:

<markdown>
# This is a proper heading

But the tag won't be closed!
`;

const result = processor.processLLMOutput(llmOutput);
console.log('Processing result:', result);

// Try to recover from unclosed tags
if (processor.recoverFromUnclosedTags()) {
  console.log('Recovered from unclosed tags');
}

// Check final status
console.log('Final errors:', processor.errors);
console.log('Final artifacts:', processor.artifacts);
```

These advanced examples demonstrate how to use FluffyTagProcessor for:
- Streaming content processing with real-time updates
- Nested tag structures and complex content hierarchies
- Robust error handling and recovery

These features allow you to build sophisticated artifact systems similar to Claude's, with the flexibility to customize them for your specific needs.

---
## Integration with LLM Systems

One of the most powerful applications of FluffyTagProcessor is integrating it with Large Language Models (LLMs) to create structured, interactive applications. This section explores strategies for effective integration.

### Prompting Strategies for Structured Content

Getting LLMs to produce consistent, well-structured output with tags requires careful prompt engineering. Here are effective strategies:

#### 1. Explicit Tag Templates

Provide the LLM with explicit templates for the tags you want it to use:

```
Please use the following tags in your response:

<code language="[language]">
[Your code here]
</code>

<markdown>
[Your markdown content here]
</markdown>

<table>
[Table data with | as column separators]
</table>
```

#### 2. Example-Based Prompting

Show the LLM exactly how you want the output structured with examples:

```
When explaining programming concepts, please provide examples like this:

First, explain the concept in plain language.

<code language="javascript">
// Then show an example:
function example() {
  console.log("This is an example");
}
</code>

Then explain how the code works and provide usage information.
```

#### 3. Tag Function Descriptions

Explain the purpose of each tag to help the LLM use them appropriately:

```
In your response, please use the following tags:
- <code> for code snippets, with a language attribute
- <markdown> for formatted explanations with headers and lists
- <chart> for data visualizations (provide data as JSON)
- <img> for diagrams or images (provide description in alt attribute)
```

#### 4. Tag Usage Rules

Specify rules for how tags should be used:

```
Important formatting rules:
1. Always wrap code in <code> tags with a language attribute
2. Use <section> tags to separate major topics
3. Use <note> tags for important warnings or tips
4. Make sure all tags are properly closed
5. Don't nest tags of the same type
```

#### 5. System Prompts for Tag Support

For LLMs that support system prompts (like GPT-4 or Claude), include tag instructions in the system prompt:

```
You are an assistant that generates structured responses using XML-like tags.
All code must be in <code> tags with a language attribute.
Use <markdown> for formatted text with headings and lists.
Use <table> for tabular data.
Always ensure tags are properly closed and well-formed.
```

### Processing LLM Outputs in Real-time

Processing LLM outputs as they stream in creates a more responsive user experience. Here's how to implement real-time processing:

#### 1. Streaming Setup

```javascript
// Setup the API client for streaming
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a streaming processor
const processor = new FluffyTagProcessor({
  autoProcessUntaggedContent: true,
  autoProcessThreshold: 20 // Process untagged content more frequently
});

// Setup handlers for different content types
processor.registerHandler('code', (attributes, content) => {
  renderCodeBlock(attributes, content);
}, {
  // Enable streaming for real-time updates
  streamContent: true,
  streamingCallback: (char, attributes) => {
    updateStreamingCodeBlock(char, attributes);
  },
  onTagStartCallback: (tagName, attributes) => {
    createCodeBlockContainer(attributes);
  },
  onTagCompleteCallback: (tagName, attributes, content) => {
    finalizeCodeBlock(attributes, content);
  }
});

// Handle regular text
processor.setUntaggedContentHandler((content) => {
  appendToTextOutput(content);
});
```

#### 2. Real-time Streaming with LLM API

```javascript
async function generateWithRealTimeProcessing(prompt) {
  // Clear previous outputs
  clearOutputContainer();
  
  // Start the completion stream
  const stream = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: "Use structured tags in your responses." },
      { role: "user", content: prompt }
    ],
    stream: true,
  });
  
  // Process the stream as it comes in
  for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
      const content = chunk.choices[0].delta.content;
      processor.processToken(content);
    }
  }
  
  // Ensure any remaining content is processed
  processor.flush();
}

// UI Handling Functions
function clearOutputContainer() {
  document.getElementById('output').innerHTML = '';
}

function appendToTextOutput(text) {
  const outputEl = document.getElementById('output');
  const textNode = document.createTextNode(text);
  outputEl.appendChild(textNode);
}

function createCodeBlockContainer(attributes) {
  const outputEl = document.getElementById('output');
  const codeContainer = document.createElement('div');
  codeContainer.className = 'code-container';
  codeContainer.dataset.language = attributes.language || 'text';
  
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.className = `language-${attributes.language || 'text'}`;
  pre.appendChild(code);
  codeContainer.appendChild(pre);
  outputEl.appendChild(codeContainer);
}

function updateStreamingCodeBlock(char, attributes) {
  const containers = document.getElementsByClassName('code-container');
  if (containers.length === 0) return;
  
  const container = containers[containers.length - 1];
  const code = container.querySelector('code');
  if (code) {
    code.textContent += char;
  }
}

function finalizeCodeBlock(attributes, content) {
  const containers = document.getElementsByClassName('code-container');
  if (containers.length === 0) return;
  
  const container = containers[containers.length - 1];
  const code = container.querySelector('code');
  
  // Apply syntax highlighting
  if (code && window.hljs) {
    hljs.highlightElement(code);
  }
  
  // Add copy button
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(content);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
  };
  
  container.prepend(copyBtn);
}
```

#### 3. Handling Partial Tags

When streaming, you may receive incomplete tags. FluffyTagProcessor handles this by:

1. Buffering incomplete tags until they're complete
2. Processing content within complete tags as it arrives
3. Waiting to call handlers until a complete tag is received

For optimal performance, consider:

```javascript
// Configure for streaming performance
const streamProcessor = new FluffyTagProcessor({
  // Process untagged content in smaller chunks for smoother streaming
  autoProcessThreshold: 10,
  
  // Enable debug mode during development
  debug: true,
  
  // Custom error handler to gracefully recover from malformed tags
  errorHandler: (error) => {
    console.warn('Tag processing error:', error.message);
    // Continue processing despite errors
  }
});
```

### Creating Interactive UI Components

FluffyTagProcessor can be used to generate interactive UI components from LLM outputs:

#### 1. Framework Integration (React Example)

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import React, { useState, useEffect, useRef } from 'react';

function LLMComponentRenderer({ llmOutput }) {
  const [components, setComponents] = useState([]);
  const processorRef = useRef(null);
  
  useEffect(() => {
    // Initialize processor on component mount
    if (!processorRef.current) {
      const processor = new FluffyTagProcessor();
      
      // Register component handler
      processor.registerHandler('component', (attributes, content) => {
        const newComponent = {
          type: attributes.type || 'div',
          content,
          props: { ...attributes },
          id: `component-${Date.now()}-${Math.random().toString(36).slice(2)}`
        };
        
        // Update components state (using functional update to avoid closure issues)
        setComponents(prev => [...prev, newComponent]);
      });
      
      // Register interactive elements
      processor.registerHandler('button', (attributes, content) => {
        const buttonComponent = {
          type: 'button',
          content,
          props: { 
            ...attributes,
            onClick: () => handleButtonClick(attributes.action, attributes)
          },
          id: `button-${Date.now()}-${Math.random().toString(36).slice(2)}`
        };
        
        setComponents(prev => [...prev, buttonComponent]);
      });
      
      // Save processor to ref
      processorRef.current = processor;
    }
    
    // Clear existing components when new output arrives
    setComponents([]);
    
    // Process the new output
    if (llmOutput) {
      processorRef.current.processString(llmOutput);
      processorRef.current.flush();
    }
  }, [llmOutput]);
  
  // Handle interactive elements
  const handleButtonClick = (action, props) => {
    switch (action) {
      case 'submit':
        console.log('Submit clicked with props:', props);
        // Handle submission logic
        break;
      case 'toggle':
        console.log('Toggle clicked with props:', props);
        // Handle toggle logic
        break;
      default:
        console.log('Button clicked:', action, props);
    }
  };
  
  // Render the components
  return (
    <div className="llm-component-container">
      {components.map(component => {
        // Render different component types
        switch (component.type) {
          case 'button':
            return (
              <button 
                key={component.id}
                onClick={component.props.onClick}
                className={component.props.className}
              >
                {component.content}
              </button>
            );
          case 'input':
            return (
              <div key={component.id} className="input-wrapper">
                {component.props.label && (
                  <label>{component.props.label}</label>
                )}
                <input 
                  type={component.props.inputType || 'text'}
                  placeholder={component.props.placeholder}
                />
              </div>
            );
          default:
            return (
              <div 
                key={component.id}
                className={component.props.className}
              >
                {component.content}
              </div>
            );
        }
      })}
    </div>
  );
}
```

#### 2. LLM Prompt for UI Generation

```
Generate a user profile form with the following:

1. Use <component> tags for containers
2. Use <button> tags for interactive buttons
3. Use <input> tags for text fields

Example format:
<component type="form" className="profile-form">
  <component type="header">User Profile</component>
  <input label="Name" placeholder="Enter your name" required="true" />
  <input label="Email" inputType="email" placeholder="Enter your email" />
  <button action="submit" className="submit-btn">Save Profile</button>
</component>
```

#### 3. Handling Events and State

For interactive components, you'll need to manage state:

```javascript
function InteractiveForm({ llmOutput }) {
  const [formState, setFormState] = useState({});
  const [components, setComponents] = useState([]);
  const processorRef = useRef(null);
  
  useEffect(() => {
    // Initialize processor similar to previous example
    
    // Register input handler with state management
    processor.registerHandler('input', (attributes, content) => {
      const fieldName = attributes.name || `field-${Date.now()}`;
      
      // Initialize field in form state
      setFormState(prev => ({
        ...prev,
        [fieldName]: attributes.defaultValue || ''
      }));
      
      const inputComponent = {
        type: 'input',
        fieldName,
        props: attributes,
        id: `input-${Date.now()}-${Math.random().toString(36).slice(2)}`
      };
      
      setComponents(prev => [...prev, inputComponent]);
    });
    
    // Process output
    // ...
  }, [llmOutput]);
  
  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = () => {
    console.log('Form submitted with data:', formState);
    // Process form submission
  };
  
  // Render with state binding
  return (
    <div className="interactive-form">
      {components.map(component => {
        if (component.type === 'input') {
          return (
            <div key={component.id} className="input-field">
              {component.props.label && (
                <label>{component.props.label}</label>
              )}
              <input
                type={component.props.inputType || 'text'}
                value={formState[component.fieldName] || ''}
                onChange={(e) => handleInputChange(component.fieldName, e.target.value)}
                placeholder={component.props.placeholder}
                required={component.props.required === 'true'}
              />
            </div>
          );
        }
        // ... other component types
      })}
      
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
}
```

### Building a Complete LLM UI System

Let's explore how to build a complete UI system powered by LLMs and FluffyTagProcessor:

#### 1. System Architecture

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ User Interface│     │ LLM Processing│     │ LLM Provider  │
│ (React, Vue,  │◄────┤ (FluffyTag    │◄────┤ (OpenAI,      │
│  or vanilla JS)│     │  Processor)   │     │  Anthropic)   │
└───────┬───────┘     └───────────────┘     └───────────────┘
        │                                            ▲
        │                                            │
        │                                     ┌──────┴──────┐
        │                                     │ Prompt      │
        └─────────────────────────────────────► Management  │
                                              └─────────────┘
```

#### 2. Full-Stack Implementation

Here's a high-level approach:

```javascript
// Server-side component
import express from 'express';
import { OpenAI } from 'openai';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint for generating UI components
app.post('/api/generate-ui', async (req, res) => {
  const { prompt, components, theme } = req.body;
  
  try {
    // Construct a prompt that will generate tagged output
    const systemPrompt = `
      You are a UI generation assistant that creates UI components using XML tags.
      Use the following tags in your response:
      - <component> for container elements
      - <button> for interactive buttons
      - <input> for form inputs
      - <layout> for structural elements
      
      Always include appropriate attributes like 'type', 'label', etc.
      Always close your tags properly.
    `;
    
    // Add theme and component requirements to the prompt
    let enhancedPrompt = `Generate UI for: ${prompt}\n\n`;
    
    if (components) {
      enhancedPrompt += `Include these components: ${components.join(', ')}\n`;
    }
    
    if (theme) {
      enhancedPrompt += `Use this design theme: ${theme}\n`;
    }
    
    // Get the completion from the LLM
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: enhancedPrompt }
      ],
      max_tokens: 2000
    });
    
    res.json({ 
      success: true, 
      ui: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error generating UI:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### 3. Client-Side Application

```javascript
// React component for UI generation
import React, { useState, useEffect, useRef } from 'react';
import { FluffyTagProcessor } from 'fluffy-tag-processor';

function UIGenerator() {
  const [prompt, setPrompt] = useState('');
  const [theme, setTheme] = useState('modern');
  const [components, setComponents] = useState(['form', 'buttons']);
  const [generatedUI, setGeneratedUI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [renderedComponents, setRenderedComponents] = useState([]);
  
  const processorRef = useRef(null);
  
  useEffect(() => {
    // Initialize processor
    if (!processorRef.current) {
      const processor = new FluffyTagProcessor();
      
      // Register component handlers
      setupComponentHandlers(processor);
      
      processorRef.current = processor;
    }
  }, []);
  
  const setupComponentHandlers = (processor) => {
    // Register different component handlers
    processor.registerHandler('component', (attributes, content) => {
      const newComponent = createComponentObject('div', attributes, content);
      setRenderedComponents(prev => [...prev, newComponent]);
    });
    
    processor.registerHandler('layout', (attributes, content) => {
      const layoutComponent = createComponentObject('layout', attributes, content);
      setRenderedComponents(prev => [...prev, layoutComponent]);
    });
    
    processor.registerHandler('button', (attributes, content) => {
      const buttonComponent = createComponentObject('button', attributes, content);
      setRenderedComponents(prev => [...prev, buttonComponent]);
    });
    
    processor.registerHandler('input', (attributes, content) => {
      const inputComponent = createComponentObject('input', attributes, content);
      setRenderedComponents(prev => [...prev, inputComponent]);
    });
    
    // Register more component types...
  };
  
  const createComponentObject = (type, attributes, content) => {
    return {
      type,
      content,
      props: { ...attributes },
      id: `component-${Date.now()}-${Math.random().toString(36).slice(2)}`
    };
  };
  
  const generateUI = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/generate-ui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          components,
          theme
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedUI(data.ui);
        
        // Clear previous components
        setRenderedComponents([]);
        
        // Process the new UI
        processorRef.current.processString(data.ui);
        processorRef.current.flush();
      } else {
        console.error('Failed to generate UI:', data.error);
      }
    } catch (error) {
      console.error('Error generating UI:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Render the component
  const renderUIComponent = (component) => {
    switch (component.type) {
      case 'layout':
        return (
          <div 
            key={component.id}
            className={`layout ${component.props.type || 'flex'} ${component.props.className || ''}`}
            style={{
              display: component.props.type === 'grid' ? 'grid' : 'flex',
              flexDirection: component.props.direction || 'column',
              gap: component.props.gap || '1rem',
              padding: component.props.padding || '1rem'
            }}
          >
            {component.content}
          </div>
        );
        
      case 'button':
        return (
          <button
            key={component.id}
            className={component.props.className || ''}
            onClick={() => console.log('Button clicked:', component.props)}
          >
            {component.content}
          </button>
        );
        
      case 'input':
        return (
          <div key={component.id} className="input-wrapper">
            {component.props.label && (
              <label>{component.props.label}</label>
            )}
            <input
              type={component.props.type || 'text'}
              placeholder={component.props.placeholder || ''}
              required={component.props.required === 'true'}
            />
          </div>
        );
        
      default:
        return (
          <div
            key={component.id}
            className={component.props.className || ''}
          >
            {component.content}
          </div>
        );
    }
  };
  
  return (
    <div className="ui-generator">
      <div className="controls">
        <h2>UI Generator</h2>
        
        <div className="input-group">
          <label>Prompt:</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the UI you want to generate..."
          />
        </div>
        
        <div className="input-group">
          <label>Theme:</label>
          <select 
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="colorful">Colorful</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Components:</label>
          <div className="checkbox-group">
            {['form', 'buttons', 'cards', 'layout', 'table'].map(comp => (
              <label key={comp}>
                <input 
                  type="checkbox"
                  checked={components.includes(comp)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setComponents(prev => [...prev, comp]);
                    } else {
                      setComponents(prev => prev.filter(c => c !== comp));
                    }
                  }}
                />
                {comp}
              </label>
            ))}
          </div>
        </div>
        
        <button 
          onClick={generateUI}
          disabled={loading || !prompt}
          className="generate-button"
        >
          {loading ? 'Generating...' : 'Generate UI'}
        </button>
      </div>
      
      <div className="preview">
        <h2>Generated UI</h2>
        
        {loading ? (
          <div className="loading">Generating UI...</div>
        ) : generatedUI ? (
          <div className="ui-preview">
            {renderedComponents.map(component => renderUIComponent(component))}
          </div>
        ) : (
          <div className="empty-state">
            Enter a prompt and click "Generate UI" to create a UI
          </div>
        )}
      </div>
      
      {generatedUI && (
        <div className="code-output">
          <h2>Generated Code</h2>
          <pre>{generatedUI}</pre>
        </div>
      )}
    </div>
  );
}
```

#### 4. Production Considerations

When building a complete LLM UI system, consider:

1. **Caching**: Implement caching for LLM responses to avoid redundant API calls
2. **Rate Limiting**: Add rate limiting to prevent abuse of your LLM API
3. **Error Recovery**: Implement robust error handling for malformed LLM outputs
4. **Security**: Sanitize LLM outputs to prevent XSS and other security issues
5. **Progressive Enhancement**: Start with basic components and add complexity as needed
6. **Accessibility**: Ensure generated components meet accessibility standards
7. **Feedback Loop**: Capture user feedback to improve prompts and generate better UIs

By following these strategies, you can create sophisticated LLM-powered applications that leverage structured outputs to create rich, interactive user experiences.

## Complete API Reference

### JavaScript/TypeScript API

#### Core Classes

```typescript
/**
 * Configuration options for the processor
 */
interface ProcessorOptions {
  /** Enable debug mode with verbose logging */
  debug?: boolean;
  /** Custom error handler function */
  errorHandler?: (error: TagProcessorError) => void;
  /** Whether to automatically process untagged content */
  autoProcessUntaggedContent?: boolean;
  /** Number of characters to accumulate before processing untagged content */
  autoProcessThreshold?: number;
}

/**
 * Options when registering a handler
 */
interface HandlerOptions {
  /** Whether to allow nested tags */
  allowNested?: boolean;
  /** Whether the tag can be nested within itself */
  allowsNestedOfSameType?: boolean;
  /** Whether to stream content as it comes in */
  streamContent?: boolean;
  /** Callback for streaming content character by character */
  streamingCallback?: (char: string, attributes: Record<string, string>) => void;
  /** Callback when tag processing begins */
  onTagStartCallback?: (tagName: string, attributes: Record<string, string>) => void;
  /** Callback when tag processing is completed */
  onTagCompleteCallback?: (tagName: string, attributes: Record<string, string>, content: string) => void;
}

/**
 * The main tag processor class
 */
class FluffyTagProcessor {
  /**
   * Create a new FluffyTagProcessor
   */
  constructor(options?: ProcessorOptions);
  
  /**
   * Register a handler for a specific tag type
   */
  registerHandler(
    tagName: string,
    handler: (attributes: Record<string, string>, content: string) => void,
    options?: HandlerOptions
  ): FluffyTagProcessor;
  
  /**
   * Set a handler for content outside of tags
   */
  setUntaggedContentHandler(
    handler: ((content: string) => void) | null
  ): FluffyTagProcessor;
  
  /**
   * Set the threshold for auto-processing untagged content
   */
  setAutoProcessThreshold(threshold: number): FluffyTagProcessor;
  
  /**
   * Process a batch of tokens at once
   */
  processTokens(tokens: string[]): FluffyTagProcessor;
  
  /**
   * Process a string as a single token
   */
  processString(content: string): FluffyTagProcessor;
  
  /**
   * Process incoming tokens
   */
  processToken(token: string): FluffyTagProcessor;
  
  /**
   * Reset the processor to its initial state
   */
  reset(): FluffyTagProcessor;
  
  /**
   * Force processing of any remaining untagged content
   */
  flush(): FluffyTagProcessor;
  
  /**
   * Get the current tag stack depth
   */
  getStackDepth(): number;
  
  /**
   * Check if currently inside a specific tag
   */
  isInsideTag(tagName: string): boolean;
  
  /**
   * Get information about pending unprocessed tags
   */
  getPendingTagInfo(): Array<{name: string, startTime: Date}>;
}

/**
 * Custom error class for tag processing errors
 */
class TagProcessorError extends Error {
  /** Additional context information for the error */
  context: Record<string, any>;
  
  /**
   * Create a new TagProcessorError
   */
  constructor(message: string, context?: Record<string, any>);
}
```

### Python API

#### Core Classes

```python
class TagConfig:
    """Configuration for a tag handler"""
    
    handler: Callable[[Dict[str, str], str], Any]
    stream_content: bool = True
    process_nested: bool = True
    streaming_callback: Optional[Callable[[str, Dict[str, str]], None]] = None
    allows_nested_of_same_type: bool = False
    on_tag_start_callback: Optional[Callable[[str, Dict[str, str]], None]] = None
    on_tag_complete_callback: Optional[Callable[[str, Dict[str, str], str], None]] = None

class TagContext:
    """Context for an active tag being processed"""
    
    name: str
    attributes: Dict[str, str]
    content: List[str]
    parent: Optional['TagContext'] = None
    start_time: datetime
    is_collecting: bool = True
    config: Optional[TagConfig] = None

class TagProcessorError(Exception):
    """Custom exception for tag processing errors"""
    
    def __init__(self, message: str, context: Optional[Dict[str, Any]] = None):
        super().__init__(message)
        self.context = context or {}

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
        pass
    
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
        pass
        
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
        pass
        
    def set_auto_process_threshold(self, threshold: int) -> 'FluffyTagProcessor':
        """
        Set the threshold for auto-processing untagged content.
        
        Args:
            threshold: Number of characters to accumulate before processing
            
        Returns:
            Self for method chaining
        """
        pass
        
    def process_tokens(self, tokens: List[str]) -> 'FluffyTagProcessor':
        """
        Process a list of tokens.
        
        Args:
            tokens: List of tokens to process
            
        Returns:
            Self for method chaining
        """
        pass
        
    def process_string(self, content: str) -> 'FluffyTagProcessor':
        """
        Process a complete string as one token.
        
        Args:
            content: String to process
            
        Returns:
            Self for method chaining
        """
        pass
    
    def process_token(self, token: str) -> 'FluffyTagProcessor':
        """
        Process a token of content.
        
        Args:
            token: Token to process
            
        Returns:
            Self for method chaining
        """
        pass
        
    def reset(self) -> 'FluffyTagProcessor':
        """
        Reset the processor to its initial state.
        
        Returns:
            Self for method chaining
        """
        pass
        
    def flush(self) -> 'FluffyTagProcessor':
        """
        Force processing of any remaining untagged content.
        
        Returns:
            Self for method chaining
        """
        pass
        
    def get_stack_depth(self) -> int:
        """
        Get the current tag stack depth.
        
        Returns:
            Current stack depth
        """
        pass
        
    def is_inside_tag(self, tag_name: str) -> bool:
        """
        Check if currently inside a specific tag.
        
        Args:
            tag_name: Tag name to check
            
        Returns:
            Whether inside the specified tag
        """
        pass
        
    def get_pending_tag_info(self) -> List[Dict[str, Union[str, datetime]]]:
        """
        Get information about pending unprocessed tags.
        
        Returns:
            List of tag information dictionaries
        """
        pass
```

### Configuration Options

#### Processor Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `debug` | boolean | `false` | Enable debug mode with verbose logging |
| `errorHandler` | function | built-in | Custom error handler function |
| `autoProcessUntaggedContent` | boolean | `true` | Whether to automatically process untagged content |
| `autoProcessThreshold` | number | `20` | Number of characters to accumulate before processing untagged content |

#### Handler Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowNested` | boolean | `true` | Whether to allow nested tags inside this tag |
| `allowsNestedOfSameType` | boolean | `false` | Whether the tag can be nested within itself |
| `streamContent` | boolean | `true` | Whether to stream content as it comes in |
| `streamingCallback` | function | `null` | Callback for streaming content character by character |
| `onTagStartCallback` | function | `null` | Callback when tag processing begins |
| `onTagCompleteCallback` | function | `null` | Callback when tag processing is completed |

### Methods and Properties

#### Main Methods

| Method | Description |
|--------|-------------|
| `registerHandler(tagName, handler, options)` | Register a handler for a specific tag type |
| `setUntaggedContentHandler(handler)` | Set a handler for content outside of tags |
| `processString(content)` | Process a complete string |
| `processToken(token)` | Process a single token of content |
| `processTokens(tokens)` | Process multiple tokens at once |
| `flush()` | Process any remaining content and clean up |
| `reset()` | Reset the processor to its initial state |

#### Utility Methods

| Method | Description |
|--------|-------------|
| `getStackDepth()` | Get the current tag stack depth |
| `isInsideTag(tagName)` | Check if currently inside a specific tag |
| `getPendingTagInfo()` | Get information about pending unprocessed tags |
| `setAutoProcessThreshold(threshold)` | Set the threshold for auto-processing untagged content |

### Error Types and Handling

#### Error Context Properties

The `TagProcessorError` includes a context object with additional information about the error. Common properties include:

| Property | Description |
|----------|-------------|
| `tagName` | The name of the tag that caused the error |
| `attributes` | The attributes of the tag |
| `originalError` | The original error that was caught |
| `expected` | The expected value in mismatched tag errors |
| `received` | The received value in mismatched tag errors |
| `content` | Preview of content related to the error |

---

## Best Practices and Optimizations

### Performance Considerations

1. **Minimize String Operations**
   - Use batch processing with `processString()` for large content instead of character-by-character processing
   - Avoid unnecessary string concatenations in handlers

2. **Efficient Handler Registration**
   - Register handlers once at initialization, not for each processing run
   - Use appropriate handler options to avoid unnecessary processing

3. **Streaming Optimizations**
   - Be selective about streaming callbacks - they run for each character
   - Consider buffering in streaming callbacks rather than updating UI on every character
   - Use `streamContent: false` for tags where real-time updates aren't needed

4. **Memory Usage**
   - Call `reset()` to clear internal state when done with a batch
   - Set appropriate `autoProcessThreshold` values based on content size

### Memory Usage and Optimization

1. **Handler Memory Management**
   - Avoid capturing large closures in handler functions
   - Clean up artifacts once they're rendered or no longer needed

2. **Content Buffering**
   - Use appropriate thresholds for untagged content to balance memory usage and processing overhead
   - Consider setting `autoProcessUntaggedContent: false` for very large content and handle it manually

3. **Artifact Storage**
   - Implement pagination or virtualization for displaying large numbers of artifacts
   - Consider a time-based cleanup strategy for long-running applications

### Design Patterns

1. **Factory Pattern**
   - Create factory functions for common artifact types
   - Standardize artifact structure across your application

```javascript
// Artifact factory example
const createCodeArtifact = (language, content, attributes = {}) => ({
  type: 'code',
  language,
  content,
  id: `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  attributes,
  createdAt: new Date()
});

const createMarkdownArtifact = (content, attributes = {}) => ({
  type: 'markdown',
  content,
  id: `markdown-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  attributes,
  createdAt: new Date()
});
```

2. **Observer Pattern**
   - Use event emitters for decoupled communication between processors and UI
   - Implement custom events for artifact creation and updates

```javascript
// Observer pattern example
class ArtifactEmitter extends EventEmitter {
  constructor() {
    super();
    this.processor = new FluffyTagProcessor();
    this.setupHandlers();
  }
  
  setupHandlers() {
    this.processor.registerHandler('code', (attributes, content) => {
      const artifact = createCodeArtifact(
        attributes.language || 'plaintext', 
        content, 
        attributes
      );
      this.emit('artifact', artifact);
      this.emit('code-artifact', artifact);
    });
    
    // More handlers...
  }
  
  processContent(content) {
    this.processor.processString(content);
    this.processor.flush();
  }
}

// Usage
const emitter = new ArtifactEmitter();
emitter.on('artifact', artifact => {
  console.log('New artifact:', artifact);
});
emitter.on('code-artifact', artifact => {
  renderCode(artifact);
});
```

3. **Strategy Pattern**
   - Use different strategies for different types of content processing
   - Allow runtime switching between processing strategies

```javascript
// Strategy pattern example
class BaseProcessingStrategy {
  process(processor, content) {
    throw new Error('Not implemented');
  }
}

class BatchProcessingStrategy extends BaseProcessingStrategy {
  process(processor, content) {
    processor.processString(content);
    processor.flush();
  }
}

class StreamingProcessingStrategy extends BaseProcessingStrategy {
  process(processor, content) {
    // Split content into chunks (simulate streaming)
    const chunks = content.match(/.{1,10}/g) || [];
    
    // Process each chunk with a delay
    let index = 0;
    const processNextChunk = () => {
      if (index < chunks.length) {
        processor.processToken(chunks[index]);
        index++;
        setTimeout(processNextChunk, 50);
      } else {
        processor.flush();
      }
    };
    
    processNextChunk();
  }
}

// Usage
class ConfigurableProcessor {
  constructor() {
    this.processor = new FluffyTagProcessor();
    this.strategy = new BatchProcessingStrategy();
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  processContent(content) {
    this.strategy.process(this.processor, content);
  }
}
```

### Testing and Validation

1. **Unit Testing**
   - Test each handler independently
   - Test with a variety of tag structures and formats
   - Test error handling and recovery

```javascript
// Jest test example
describe('FluffyTagProcessor', () => {
  let processor;
  let codeHandler;
  
  beforeEach(() => {
    codeHandler = jest.fn();
    processor = new FluffyTagProcessor();
    processor.registerHandler('code', codeHandler);
  });
  
  test('should process a simple code tag', () => {
    const content = '<code language="javascript">console.log("Hello");</code>';
    processor.processString(content);
    processor.flush();
    
    expect(codeHandler).toHaveBeenCalledTimes(1);
    expect(codeHandler).toHaveBeenCalledWith(
      { language: 'javascript' },
      'console.log("Hello");'
    );
  });
  
  test('should handle nested tags when allowed', () => {
    const nestedHandler = jest.fn();
    processor.registerHandler('outer', (attrs, content) => {
      // Process inner tags separately
      const innerProcessor = new FluffyTagProcessor();
      innerProcessor.registerHandler('inner', nestedHandler);
      innerProcessor.processString(content);
      innerProcessor.flush();
    }, { allowNested: true });
    
    const content = '<outer><inner>test</inner></outer>';
    processor.processString(content);
    processor.flush();
    
    expect(nestedHandler).toHaveBeenCalledWith({}, 'test');
  });
});
```

2. **Integration Testing**
   - Test the full processing pipeline with real LLM outputs
   - Verify correct rendering and interaction of artifacts
   - Test performance with large content

3. **Validation Tools**
   - Implement tag structure validation
   - Create tools to identify and fix common tag issues

```javascript
// Validator example
class TagValidator {
  validate(content) {
    const issues = [];
    
    // Check for unclosed tags
    const tagRegex = /<(\w+)(?:\s+[^>]*)?>/g;
    const closingTagRegex = /<\/(\w+)>/g;
    
    const openTags = [];
    let match;
    
    // Find all opening tags
    while ((match = tagRegex.exec(content)) !== null) {
      const tagName = match[1];
      openTags.push({
        name: tagName,
        position: match.index
      });
    }
    
    // Find all closing tags
    const closedTags = [];
    while ((match = closingTagRegex.exec(content)) !== null) {
      const tagName = match[1];
      closedTags.push({
        name: tagName,
        position: match.index
      });
    }
    
    // Check for mismatches
    if (openTags.length !== closedTags.length) {
      issues.push({
        type: 'unclosed-tags',
        message: `Mismatched tags: ${openTags.length} opening, ${closedTags.length} closing`,
        openTags,
        closedTags
      });
    }
    
    // More validation checks...
    
    return {
      valid: issues.length === 0,
      issues
    };
  }
  
  fix(content) {
    // Implement auto-fixing for common issues
    let fixed = content;
    
    // Fix unclosed tags
    const validation = this.validate(content);
    if (!validation.valid) {
      validation.issues.forEach(issue => {
        if (issue.type === 'unclosed-tags') {
          // Add missing closing tags
          const openTags = [...issue.openTags].sort((a, b) => b.position - a.position);
          const closedTags = new Set(issue.closedTags.map(tag => tag.name));
          
          openTags.forEach(tag => {
            if (!closedTags.has(tag.name)) {
              fixed += `</${tag.name}>`;
            }
          });
        }
      });
    }
    
    return fixed;
  }
}
```

By following these best practices and optimization strategies, you can create a robust, efficient, and maintainable artifact system using FluffyTagProcessor.

---

## Real-World Examples

### Building a Claude-like Artifact System

This example demonstrates how to build a complete Claude-like artifact system:

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import hljs from 'highlight.js';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

class ArtifactSystem {
  constructor() {
    this.artifacts = [];
    this.processor = new FluffyTagProcessor({
      debug: true,
      autoProcessThreshold: 100
    });
    
    this.setupHandlers();
  }
  
  setupHandlers() {
    // Code handler
    this.processor.registerHandler('code', (attributes, content) => {
      const language = attributes.language || 'plaintext';
      
      const artifact = {
        type: 'code',
        language,
        content,
        highlighted: this.highlightCode(content, language),
        id: this.generateId('code'),
        createdAt: new Date(),
        attributes
      };
      
      this.artifacts.push(artifact);
      return artifact.id;
    });
    
    // Markdown handler
    this.processor.registerHandler('markdown', (attributes, content) => {
      const artifact = {
        type: 'markdown',
        content,
        html: this.renderMarkdown(content),
        id: this.generateId('markdown'),
        createdAt: new Date(),
        attributes
      };
      
      this.artifacts.push(artifact);
      return artifact.id;
    });
    
    // Table handler
    this.processor.registerHandler('table', (attributes, content) => {
      const rows = content.trim().split('\n').map(row => 
        row.trim().split('|').map(cell => cell.trim()).filter(Boolean)
      );
      
      const headers = rows[0] || [];
      const data = rows.slice(1) || [];
      
      const artifact = {
        type: 'table',
        headers,
        data,
        id: this.generateId('table'),
        createdAt: new Date(),
        attributes
      };
      
      this.artifacts.push(artifact);
      return artifact.id;
    });
    
    // Image handler
    this.processor.registerHandler('img', (attributes, content) => {
      const artifact = {
        type: 'image',
        src: attributes.src || '',
        alt: attributes.alt || '',
        width: attributes.width,
        height: attributes.height,
        id: this.generateId('image'),
        createdAt: new Date(),
        attributes
      };
      
      this.artifacts.push(artifact);
      return artifact.id;
    });
    
    // Chart handler
    this.processor.registerHandler('chart', (attributes, content) => {
      let chartData;
      
      try {
        chartData = JSON.parse(content);
      } catch (error) {
        console.error('Invalid chart data:', error);
        chartData = { error: 'Invalid chart data' };
      }
      
      const artifact = {
        type: 'chart',
        chartType: attributes.type || 'bar',
        data: chartData,
        id: this.generateId('chart'),
        createdAt: new Date(),
        attributes
      };
      
      this.artifacts.push(artifact);
      return artifact.id;
    });
    
    // Handle untagged content
    this.processor.setUntaggedContentHandler((content) => {
      if (!content.trim()) return;
      
      this.artifacts.push({
        type: 'text',
        content,
        id: this.generateId('text'),
        createdAt: new Date(),
      });
    });
  }
  
  // Helper methods
  highlightCode(code, language) {
    try {
      if (language !== 'plaintext') {
        return hljs.highlight(code, { language }).value;
      }
    } catch (error) {
      console.warn(`Error highlighting code: ${error.message}`);
    }
    return code;
  }
  
  renderMarkdown(content) {
    const raw = marked(content);
    return DOMPurify.sanitize(raw);
  }
  
  generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Process LLM output
  processLLMOutput(text) {
    this.artifacts = [];
    
    this.processor.processString(text);
    this.processor.flush();
    
    return this.artifacts;
  }
  
  // Render artifacts to DOM
  renderArtifacts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    this.artifacts.forEach(artifact => {
      const artifactElement = document.createElement('div');
      artifactElement.className = `artifact artifact-${artifact.type}`;
      artifactElement.id = artifact.id;
      
      switch (artifact.type) {
        case 'code':
          this.renderCodeArtifact(artifact, artifactElement);
          break;
        case 'markdown':
          this.renderMarkdownArtifact(artifact, artifactElement);
          break;
        case 'table':
          this.renderTableArtifact(artifact, artifactElement);
          break;
        case 'image':
          this.renderImageArtifact(artifact, artifactElement);
          break;
        case 'chart':
          this.renderChartArtifact(artifact, artifactElement);
          break;
        case 'text':
          this.renderTextArtifact(artifact, artifactElement);
          break;
      }
      
      container.appendChild(artifactElement);
    });
  }
  
  renderCodeArtifact(artifact, element) {
    // Add header with language and copy button
    const header = document.createElement('div');
    header.className = 'artifact-header';
    
    const langLabel = document.createElement('span');
    langLabel.className = 'lang-label';
    langLabel.textContent = artifact.language;
    header.appendChild(langLabel);
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => {
      navigator.clipboard.writeText(artifact.content);
      copyButton.textContent = 'Copied!';
      setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
    };
    header.appendChild(copyButton);
    
    element.appendChild(header);
    
    // Add code content
    const codeBlock = document.createElement('pre');
    codeBlock.className = `code-block language-${artifact.language}`;
    codeBlock.innerHTML = artifact.highlighted;
    element.appendChild(codeBlock);
  }
  
  renderMarkdownArtifact(artifact, element) {
    element.innerHTML = artifact.html;
  }
  
  renderTableArtifact(artifact, element) {
    const table = document.createElement('table');
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    artifact.headers.forEach(header => {
const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    artifact.data.forEach(row => {
      const tr = document.createElement('tr');
      
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    element.appendChild(table);
  }
  
  renderImageArtifact(artifact, element) {
    const img = document.createElement('img');
    img.src = artifact.src;
    img.alt = artifact.alt;
    
    if (artifact.width) img.width = artifact.width;
    if (artifact.height) img.height = artifact.height;
    
    element.appendChild(img);
  }
  
  renderChartArtifact(artifact, element) {
    // In a real implementation, you'd use a library like Chart.js or D3
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    
    // Placeholder for chart rendering
    chartContainer.innerHTML = `
      <div class="chart-placeholder">
        <h3>${artifact.chartType.charAt(0).toUpperCase() + artifact.chartType.slice(1)} Chart</h3>
        <p>Chart data: ${JSON.stringify(artifact.data).slice(0, 100)}...</p>
      </div>
    `;
    
    element.appendChild(chartContainer);
  }
  
  renderTextArtifact(artifact, element) {
    const p = document.createElement('p');
    p.textContent = artifact.content;
    element.appendChild(p);
  }
}

// Example usage
const artifactSystem = new ArtifactSystem();

function processLLMResponse(response) {
  const artifacts = artifactSystem.processLLMOutput(response);
  console.log(`Generated ${artifacts.length} artifacts`);
  
  // Render to the UI
  artifactSystem.renderArtifacts('artifacts-container');
}

// Test with example LLM response
const exampleResponse = `
# Data Analysis Report

Here's the analysis of the monthly sales data.

<markdown>
## Key Findings

1. Sales increased by 23% year-over-year
2. Q4 showed the strongest performance
3. Product category A was the top performer
</markdown>

<code language="python">
import pandas as pd
import matplotlib.pyplot as plt

# Load sales data
sales_data = pd.read_csv('sales.csv')

# Calculate monthly totals
monthly_totals = sales_data.groupby('month')['amount'].sum()

print(monthly_totals)
</code>

Here's a visualization of the monthly sales:

<chart type="bar">
{
  "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "datasets": [
    {
      "label": "2023 Sales",
      "data": [12000, 13500, 14200, 15000, 16800, 17500, 18200, 19500, 20100, 22500, 23200, 25000]
    }
  ]
}
</chart>

The data can be summarized in this table:

<table>
Quarter | Total Sales | Growth
Q1 | $39,700 | 12%
Q2 | $49,300 | 18%
Q3 | $57,800 | 22%
Q4 | $70,700 | 35%
</table>

<img src="sales-growth.png" alt="Sales Growth Chart" width="600" height="400" />
`;

document.addEventListener('DOMContentLoaded', () => {
  processLLMResponse(exampleResponse);
});
```

### Creating an OpenAI Canvas Alternative

This example demonstrates how to create a system similar to OpenAI's Canvas, focusing on document generation:

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

class DocumentGenerator {
  constructor() {
    this.sections = [];
    this.processor = new FluffyTagProcessor({
      debug: true,
      autoProcessThreshold: 100
    });
    
    this.setupHandlers();
  }
  
  setupHandlers() {
    // Section handler
    this.processor.registerHandler('section', (attributes, content) => {
      const section = {
        type: 'section',
        title: attributes.title || 'Untitled Section',
        content,
        id: this.generateId('section'),
        level: parseInt(attributes.level || '1', 10),
        children: []
      };
      
      // Process the section content to extract subsections and blocks
      const sectionProcessor = new FluffyTagProcessor();
      
      // Register handlers for content within sections
      this.registerContentHandlers(sectionProcessor);
      
      // Process the section content
      sectionProcessor.processString(content);
      sectionProcessor.flush();
      
      this.sections.push(section);
      return section.id;
    });
    
    // Register handlers for top-level content
    this.registerContentHandlers(this.processor);
    
    // Handle untagged content
    this.processor.setUntaggedContentHandler((content) => {
      if (!content.trim()) return;
      
      this.sections.push({
        type: 'text',
        content,
        id: this.generateId('text')
      });
    });
  }
  
  registerContentHandlers(processor) {
    // Text block handler
    processor.registerHandler('text', (attributes, content) => {
      return {
        type: 'text',
        content,
        id: this.generateId('text-block')
      };
    });
    
    // Code block handler
    processor.registerHandler('code', (attributes, content) => {
      const language = attributes.language || 'plaintext';
      
      return {
        type: 'code',
        language,
        content,
        highlighted: this.highlightCode(content, language),
        id: this.generateId('code-block')
      };
    });
    
    // Image handler
    processor.registerHandler('img', (attributes, content) => {
      return {
        type: 'image',
        src: attributes.src || '',
        alt: attributes.alt || '',
        caption: attributes.caption,
        id: this.generateId('image')
      };
    });
    
    // Quote handler
    processor.registerHandler('quote', (attributes, content) => {
      return {
        type: 'quote',
        content,
        author: attributes.author,
        source: attributes.source,
        id: this.generateId('quote')
      };
    });
    
    // List handler
    processor.registerHandler('list', (attributes, content) => {
      const items = content.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.startsWith('- ') ? line.substring(2) : line);
      
      return {
        type: 'list',
        items,
        ordered: attributes.ordered === 'true',
        id: this.generateId('list')
      };
    });
  }
  
  // Helper methods
  highlightCode(code, language) {
    try {
      if (language !== 'plaintext') {
        return hljs.highlight(code, { language }).value;
      }
    } catch (error) {
      console.warn(`Error highlighting code: ${error.message}`);
    }
    return code;
  }
  
  generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Process LLM output
  generateDocument(title, content) {
    this.sections = [];
    
    // Add title section
    this.sections.push({
      type: 'title',
      content: title,
      id: this.generateId('title')
    });
    
    // Process the content
    this.processor.processString(content);
    this.processor.flush();
    
    return {
      title,
      sections: this.sections,
      createdAt: new Date()
    };
  }
  
  // Render document to HTML
  renderToHTML(document) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${document.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    h1 {
      font-size: 2em;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3em;
    }
    pre {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    }
    blockquote {
      margin: 0;
      padding-left: 1em;
      border-left: 4px solid #ddd;
      color: #666;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    .image-caption {
      text-align: center;
      color: #666;
      font-size: 0.9em;
      margin-top: 0.5em;
    }
    .quote-author {
      text-align: right;
      font-style: italic;
    }
    .quote-source {
      text-align: right;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>`;
    
    // Add title
    const titleSection = document.sections.find(section => section.type === 'title');
    if (titleSection) {
      html += `<h1>${titleSection.content}</h1>`;
    }
    
    // Process each section
    document.sections.filter(section => section.type !== 'title').forEach(section => {
      html += this.renderSectionToHTML(section);
    });
    
    html += `</body>
</html>`;
    
    return html;
  }
  
  renderSectionToHTML(section) {
    switch (section.type) {
      case 'section':
        const hLevel = Math.min(Math.max(section.level, 1), 6);
        return `<h${hLevel}>${section.title}</h${hLevel}>${this.renderBlocksToHTML(section.children)}`;
      
      case 'text':
        return `<p>${section.content}</p>`;
      
      case 'code':
        return `<pre><code class="language-${section.language}">${section.highlighted || section.content}</code></pre>`;
      
      case 'image':
        let imgHtml = `<figure><img src="${section.src}" alt="${section.alt}">`;
        if (section.caption) {
          imgHtml += `<figcaption class="image-caption">${section.caption}</figcaption>`;
        }
        imgHtml += `</figure>`;
        return imgHtml;
      
      case 'quote':
        let quoteHtml = `<blockquote><p>${section.content}</p>`;
        if (section.author) {
          quoteHtml += `<p class="quote-author">— ${section.author}</p>`;
        }
        if (section.source) {
          quoteHtml += `<p class="quote-source">${section.source}</p>`;
        }
        quoteHtml += `</blockquote>`;
        return quoteHtml;
      
      case 'list':
        const listTag = section.ordered ? 'ol' : 'ul';
        const items = section.items.map(item => `<li>${item}</li>`).join('');
        return `<${listTag}>${items}</${listTag}>`;
      
      default:
        return '';
    }
  }
  
  renderBlocksToHTML(blocks) {
    return blocks.map(block => this.renderSectionToHTML(block)).join('');
  }
  
  // Export document to different formats
  exportToPDF(document) {
    // In a real implementation, you would use a library like jsPDF or html2pdf
    console.log('Exporting to PDF:', document.title);
    alert('PDF export would happen here in a real implementation');
  }
  
  exportToMarkdown(document) {
    let markdown = `# ${document.title}\n\n`;
    
    // Process each section
    document.sections.filter(section => section.type !== 'title').forEach(section => {
      markdown += this.renderSectionToMarkdown(section);
    });
    
    return markdown;
  }
  
  renderSectionToMarkdown(section) {
    switch (section.type) {
      case 'section':
        const headerMarks = '#'.repeat(Math.min(Math.max(section.level, 1), 6));
        return `${headerMarks} ${section.title}\n\n${this.renderBlocksToMarkdown(section.children)}`;
      
      case 'text':
        return `${section.content}\n\n`;
      
      case 'code':
        return `\`\`\`${section.language}\n${section.content}\n\`\`\`\n\n`;
      
      case 'image':
        let imgMd = `![${section.alt}](${section.src})`;
        if (section.caption) {
          imgMd += `\n*${section.caption}*`;
        }
        return imgMd + '\n\n';
      
      case 'quote':
        let quoteMd = `> ${section.content}\n`;
        if (section.author) {
          quoteMd += `> — ${section.author}\n`;
        }
        if (section.source) {
          quoteMd += `> *${section.source}*\n`;
        }
        return quoteMd + '\n';
      
      case 'list':
        if (section.ordered) {
          return section.items.map((item, index) => `${index + 1}. ${item}`).join('\n') + '\n\n';
        } else {
          return section.items.map(item => `- ${item}`).join('\n') + '\n\n';
        }
      
      default:
        return '';
    }
  }
  
  renderBlocksToMarkdown(blocks) {
    return blocks.map(block => this.renderSectionToMarkdown(block)).join('');
  }
}

// Example usage
const documentGenerator = new DocumentGenerator();

function generateDocument() {
  const title = "Project Proposal: AI-Powered Document Generation";
  const content = `
<section title="Executive Summary" level="2">
<text>
This proposal outlines a plan to develop an AI-powered document generation system that can create professional-quality documents from simple text prompts. The system will leverage large language models to generate structured content that can be exported in multiple formats.
</text>
</section>

<section title="Problem Statement" level="2">
<text>
Creating professional documents requires significant time and expertise. Many professionals struggle with:
</text>

<list>
- Organizing information effectively
- Maintaining consistent formatting
- Writing clear and concise content
- Ensuring proper citations and references
</list>

<text>
Our AI-powered solution addresses these challenges by automating the document creation process while maintaining high quality and customizability.
</text>
</section>

<section title="Proposed Solution" level="2">
<text>
Our system will provide an intuitive interface for users to describe the document they need. The AI will then:
</text>

<list ordered="true">
- Interpret the user's requirements
- Generate structured content
- Format the document according to industry standards
- Allow for easy editing and refinement
</list>

<section title="Technical Architecture" level="3">
<text>
The system will be built using a modular architecture:
</text>

<code language="javascript">
// Core document generation module
class DocumentGenerator {
  constructor(llmClient) {
    this.llm = llmClient;
    this.processor = new FluffyTagProcessor();
    // Setup configuration
  }
  
  async generateDocument(prompt, template) {
    // Get content from LLM
    const content = await this.llm.complete(prompt);
    
    // Process structured content
    return this.processor.processString(content);
  }
  
  exportDocument(format) {
    // Handle different export formats
  }
}
</code>
</section>
</section>

<section title="Market Analysis" level="2">
<text>
The document automation market is growing rapidly, with a CAGR of 13.5% expected over the next five years.
</text>

<img src="market-growth.png" alt="Market Growth Chart" caption="Document Automation Market Growth 2023-2028" />

<quote author="McKinsey & Company" source="Future of Work Report, 2023">
AI-powered automation tools could save knowledge workers 30-40% of their time spent on document creation and management, representing a $500 billion opportunity globally.
</quote>
</section>

<section title="Implementation Timeline" level="2">
<text>
We propose a phased approach to development:
</text>

<list>
- Phase 1 (3 months): Core document generation engine
- Phase 2 (2 months): User interface and template system
- Phase 3 (2 months): Export capabilities and integration
- Phase 4 (1 month): Testing and refinement
</list>
</section>

<section title="Conclusion" level="2">
<text>
This AI-powered document generation system represents a significant opportunity to improve productivity and document quality across the organization. By leveraging the latest advancements in large language models, we can create a solution that adapts to various document types and user needs.
</text>

<text>
We recommend proceeding with Phase 1 immediately to capitalize on this opportunity.
</text>
</section>
`;

  // Generate the document
  const document = documentGenerator.generateDocument(title, content);
  
  // Show document generation complete
  console.log('Document generated:', document);
  
  // Export to different formats
  const htmlOutput = documentGenerator.renderToHTML(document);
  const markdownOutput = documentGenerator.exportToMarkdown(document);
  
  // In a real application, you would render this to the UI
  document.getElementById('html-output').innerHTML = htmlOutput;
  document.getElementById('markdown-output').textContent = markdownOutput;
}

// UI setup
document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-button');
  if (generateButton) {
    generateButton.addEventListener('click', generateDocument);
  }
});
```

### Building a v0-inspired UI Generator

This example demonstrates how to build a system that can generate UI components from text descriptions:

```javascript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import React from 'react';
import ReactDOM from 'react-dom';

class UIGenerator {
  constructor() {
    this.components = [];
    this.processor = new FluffyTagProcessor({
      debug: true
    });
    
    this.setupHandlers();
  }
  
  setupHandlers() {
    // Handler for component tags
    this.processor.registerHandler('component', (attributes, content) => {
      const component = {
        type: 'component',
        componentType: attributes.type || 'generic',
        content,
        props: this.parseProps(attributes),
        id: this.generateId('component'),
        children: []
      };
      
      // Process children if needed
      if (content.trim()) {
        const childProcessor = new FluffyTagProcessor();
        
        // Register handlers for nested components
        childProcessor.registerHandler('component', (childAttrs, childContent) => {
          const childComponent = {
            type: 'component',
            componentType: childAttrs.type || 'generic',
            content: childContent,
            props: this.parseProps(childAttrs),
            id: this.generateId('child-component')
          };
          
          component.children.push(childComponent);
          return childComponent.id;
        });
        
        // Process the component content to extract children
        childProcessor.processString(content);
        childProcessor.flush();
      }
      
      this.components.push(component);
      return component.id;
    });
    
    // Handler for layout tags
    this.processor.registerHandler('layout', (attributes, content) => {
      const layout = {
        type: 'layout',
        layoutType: attributes.type || 'flex',
        direction: attributes.direction || 'row',
        content,
        props: this.parseProps(attributes),
        id: this.generateId('layout'),
        children: []
      };
      
      // Process children
      const childProcessor = new FluffyTagProcessor();
      
      // Register handlers for components within layouts
      childProcessor.registerHandler('component', (childAttrs, childContent) => {
        const childComponent = {
          type: 'component',
          componentType: childAttrs.type || 'generic',
          content: childContent,
          props: this.parseProps(childAttrs),
          id: this.generateId('layout-component')
        };
        
        layout.children.push(childComponent);
        return childComponent.id;
      });
      
      // Register handlers for nested layouts
      childProcessor.registerHandler('layout', (childAttrs, childContent) => {
        const childLayout = {
          type: 'layout',
          layoutType: childAttrs.type || 'flex',
          direction: childAttrs.direction || 'row',
          content: childContent,
          props: this.parseProps(childAttrs),
          id: this.generateId('nested-layout')
        };
        
        // Recursively process nested layouts
        const nestedProcessor = new FluffyTagProcessor();
        nestedProcessor.registerHandler('component', childProcessor._handlers.get('component'));
        nestedProcessor.processString(childContent);
        nestedProcessor.flush();
        
        layout.children.push(childLayout);
        return childLayout.id;
      });
      
      // Process the layout content
      childProcessor.processString(content);
      childProcessor.flush();
      
      this.components.push(layout);
      return layout.id;
    });
    
    // Handle untagged content as text components
    this.processor.setUntaggedContentHandler((content) => {
      if (!content.trim()) return;
      
      const textComponent = {
        type: 'component',
        componentType: 'text',
        content,
        props: {},
        id: this.generateId('text')
      };
      
      this.components.push(textComponent);
      return textComponent.id;
    });
  }
  
  // Helper methods
  parseProps(attributes) {
    const props = { ...attributes };
    
    // Remove special attributes that aren't component props
    delete props.type;
    delete props.direction;
    
    // Convert string values to appropriate types
    Object.keys(props).forEach(key => {
      const value = props[key];
      
      // Convert boolean strings
      if (value === 'true') props[key] = true;
      else if (value === 'false') props[key] = false;
      
      // Convert numeric strings
      else if (/^-?\d+(\.\d+)?$/.test(value)) {
        props[key] = parseFloat(value);
      }
    });
    
    return props;
  }
  
  generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Process LLM output to generate UI components
  generateUI(description) {
    this.components = [];
    
    // Get LLM to generate component markup
    // In a real application, this would call the LLM
    const componentMarkup = this.mockLLMGeneration(description);
    
    // Process the markup
    this.processor.processString(componentMarkup);
    this.processor.flush();
    
    return this.components;
  }
  
  // Mock LLM response generation (in a real app, this would call an actual LLM)
  mockLLMGeneration(description) {
    // This is just a simple mock - a real implementation would call an LLM API
    console.log(`Generating UI from description: ${description}`);
    
    if (description.includes('login')) {
      return `
<layout type="flex" direction="column" gap="20" padding="40" backgroundColor="#f5f7fa" borderRadius="8">
  <component type="heading" level="2" textAlign="center">Login to Your Account</component>
  
  <layout type="flex" direction="column" gap="15">
    <component type="input" label="Email" placeholder="Enter your email" required="true" />
    <component type="input" label="Password" type="password" placeholder="Enter your password" required="true" />
    <component type="checkbox" label="Remember me" />
  </layout>
  
  <layout type="flex" direction="row" gap="10" justifyContent="space-between">
    <component type="button" variant="primary" fullWidth="true">Login</component>
    <component type="button" variant="outline" fullWidth="true">Register</component>
  </layout>
  
  <component type="link" textAlign="center">Forgot your password?</component>
</layout>
      `;
    } else if (description.includes('dashboard')) {
      return `
<layout type="grid" columns="3" gap="20" padding="20">
  <component type="card" title="Total Users" value="1,234" trend="up" trendValue="12%" />
  <component type="card" title="Revenue" value="$45,678" trend="up" trendValue="8%" />
  <component type="card" title="Active Sessions" value="327" trend="down" trendValue="3%" />
  
  <layout type="flex" direction="column" gap="20" gridColumn="span 3">
    <component type="heading" level="3">Recent Activity</component>
    <component type="table" columns="Date,User,Action,Status" data="2023-07-01,John Doe,Login,Success;2023-07-01,Jane Smith,Purchase,Completed;2023-07-02,Bob Johnson,Update Profile,Pending" />
  </layout>
  
  <layout type="flex" direction="column" gap="20" gridColumn="span 2">
    <component type="heading" level="3">Sales Overview</component>
    <component type="chart" type="bar" data="Jan,Feb,Mar,Apr,May,Jun;10,15,8,22,30,25" />
  </layout>
  
  <layout type="flex" direction="column" gap="20">
    <component type="heading" level="3">Notifications</component>
    <component type="list" items="New user registration: John Doe;Payment received: $250.00;System update scheduled for tonight;3 users require approval" />
  </layout>
</layout>
      `;
    } else {
      // Default simple UI
      return `
<layout type="flex" direction="column" gap="20" padding="20">
  <component type="heading" level="1">Generated UI</component>
  <component type="paragraph">This is a simple UI generated from your description.</component>
  <component type="button" variant="primary">Click Me</component>
</layout>
      `;
    }
  }
  
  // Render the components to React JSX
  renderToReact(components = null) {
    const comps = components || this.components;
    
    return comps.map(component => {
      if (component.type === 'layout') {
        return this.renderLayout(component);
      } else {
        return this.renderComponent(component);
      }
    });
  }
  
  renderLayout(layout) {
    const { layoutType, direction, props, id, children } = layout;
    
    // Create style based on layout properties
    const style = {
      display: layoutType === 'flex' ? 'flex' : 'grid',
      flexDirection: direction,
      gap: props.gap ? `${props.gap}px` : undefined,
      padding: props.padding ? `${props.padding}px` : undefined,
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems
    };
    
    // Add grid-specific properties
    if (layoutType === 'grid') {
      style.display = 'grid';
      style.gridTemplateColumns = `repeat(${props.columns || 1}, 1fr)`;
    }
    
    return React.createElement(
      'div',
      { key: id, className: `layout layout-${layoutType}`, style },
      this.renderToReact(children)
    );
  }
  
  renderComponent(component) {
    const { componentType, content, props, id, children } = component;
    
    switch (componentType) {
      case 'heading':
        const HeadingTag = `h${props.level || 1}`;
        return React.createElement(
          HeadingTag,
          { key: id, style: { textAlign: props.textAlign } },
          content
        );
      
      case 'paragraph':
        return React.createElement(
          'p',
          { key: id, style: { textAlign: props.textAlign } },
          content
        );
      
      case 'button':
        // Define button styles based on variant
        const buttonStyle = {
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: props.fullWidth ? '100%' : 'auto'
        };
        
        if (props.variant === 'primary') {
          buttonStyle.backgroundColor = '#0070f3';
          buttonStyle.color = 'white';
          buttonStyle.border = 'none';
        } else if (props.variant === 'outline') {
          buttonStyle.backgroundColor = 'transparent';
          buttonStyle.color = '#0070f3';
          buttonStyle.border = '1px solid #0070f3';
        }
        
        return React.createElement(
          'button',
          { key: id, style: buttonStyle },
          content || props.label || 'Button'
        );
      
      case 'input':
        return React.createElement(
          'div',
          { key: id, style: { display: 'flex', flexDirection: 'column', gap: '5px' } },
          props.label && React.createElement('label', {}, props.label),
          React.createElement('input', {
            type: props.type || 'text',
            placeholder: props.placeholder,
            required: props.required,
            style: {
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }
          })
        );
      
      case 'checkbox':
        return React.createElement(
          'div',
          { key: id, style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          React.createElement('input', { type: 'checkbox' }),
          React.createElement('label', {}, props.label)
        );
      
      case 'link':
        return React.createElement(
          'a',
          { 
            key: id, 
            href: props.href || '#',
            style: { 
              color: '#0070f3',
              textDecoration: 'none',
              textAlign: props.textAlign,
              display: 'block'
            }
          },
          content || props.label || 'Link'
        );
      
      case 'card':
        return React.createElement(
          'div',
          { 
            key: id,
            style: {
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backgroundColor: 'white'
            }
          },
          [
            React.createElement('h3', { key: 'title' }, props.title),
            React.createElement('p', { 
              key: 'value',
              style: { fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }
            }, props.value),
            props.trend && React.createElement('p', { 
              key: 'trend',
              style: { 
                color: props.trend === 'up' ? 'green' : 'red',
                display: 'flex',
                alignItems: 'center'
              }
            }, `${props.trend === 'up' ? '↑' : '↓'} ${props.trendValue}`)
          ]
        );
      
      case 'table':
        const columns = props.columns ? props.columns.split(',') : [];
        const rows = props.data ? props.data.split(';') : [];
        
        return React.createElement(
          'table',
          { 
            key: id,
            style: {
              width: '100%',
              borderCollapse: 'collapse'
            }
          },
          [
            React.createElement(
              'thead',
              { key: 'thead' },
              React.createElement(
                'tr',
                {},
                columns.map((col, index) => 
                  React.createElement('th', { 
                    key: `th-${index}`,
                    style: {
                      textAlign: 'left',
                      padding: '8px',
                      borderBottom: '2px solid #ddd'
                    }
                  }, col)
                )
              )
            ),
            React.createElement(
              'tbody',
              { key: 'tbody' },
              rows.map((row, rowIndex) => {
                const cells = row.split(',');
                return React.createElement(
                  'tr',
                  { key: `tr-${rowIndex}` },
                  cells.map((cell, cellIndex) => 
                    React.createElement('td', { 
                      key: `td-${rowIndex}-${cellIndex}`,
                      style: {
                        padding: '8px',
                        borderBottom: '1px solid #ddd'
                      }
                    }, cell)
                  )
                );
              })
            )
          ]
        );
      
      case 'list':
        const items = props.items ? props.items.split(';') : [];
        
        return React.createElement(
          'ul',
          { 
            key: id,
            style: {
              paddingLeft: '20px'
            }
          },
          items.map((item, index) => 
            React.createElement('li', { 
              key: `li-${index}`,
              style: {
                margin: '8px 0'
              }
            }, item)
          )
        );
      
      case 'chart':
        // In a real implementation, you would use a charting library
        return React.createElement(
          'div',
          { 
            key: id,
            style: {
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          },
          `[${props.type.toUpperCase()} CHART WOULD RENDER HERE]`
        );
      
      case 'text':
      default:
        return React.createElement(
          'div',
          { key: id },
          content
        );
    }
  }
  
  // Render the UI to a container element
  renderToDOM(containerId, components = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const reactElements = this.renderToReact(components);
    ReactDOM.render(reactElements, container);
  }
}

// Example usage
const uiGenerator = new UIGenerator();

function generateUI() {
  const descriptionInput = document.getElementById('ui-description');
  const description = descriptionInput?.value || 'Create a simple UI';
  
  // Generate UI components
  const components = uiGenerator.generateUI(description);
  
  // Log the components
  console.log('Generated components:', components);
  
  // Render the components to the DOM
  uiGenerator.renderToDOM('ui-preview', components);
}

// Setup UI
document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-ui-button');
  if (generateButton) {
    generateButton.addEventListener('click', generateUI);
  }
  
  // Generate default UI
  generateUI();
});
```

These real-world examples demonstrate how to use FluffyTagProcessor to build complete systems like Claude's artifacts, OpenAI's Canvas, or v0's UI generation. By adapting these examples to your specific needs, you can create rich, interactive experiences powered by LLMs.

---

## Conclusion

FluffyTagProcessor provides a powerful foundation for building structured content processing systems for LLMs. With its flexible architecture, robust error handling, and comprehensive feature set, you can create sophisticated artifact systems like those in Claude, OpenAI Canvas, or v0.

Key takeaways:

1. **Tag-based processing** allows LLMs to generate structured content that can be parsed and handled differently based on the tag type.

2. **Streaming support** enables real-time processing of content as it arrives from the LLM.

3. **Nested tag handling** supports complex hierarchical content structures.

4. **Robust error handling** ensures your system can recover from malformed tags or other issues.

5. **Extensible architecture** makes it easy to add new tag types and handlers as your needs evolve.

By implementing a custom artifact system with FluffyTagProcessor, you can enhance your LLM-powered applications with rich, interactive, and structured content that goes far beyond simple text responses.

We hope this comprehensive guide has given you the knowledge and tools to build your own artifact systems. Happy building!
