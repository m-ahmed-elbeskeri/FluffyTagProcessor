# 🎯 FluffyTagProcessor

[![npm version](https://img.shields.io/npm/v/fluffy-tag-processor.svg)](https://www.npmjs.com/package/fluffy-tag-processor)
[![PyPI version](https://img.shields.io/pypi/v/fluffy-tag-processor.svg)](https://pypi.org/project/fluffy-tag-processor/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/fluffy-tag-processor.svg)](https://www.npmjs.com/package/fluffy-tag-processor)

A lightweight tag processor for building AI assistants with structured outputs. Create systems that can handle code artifacts, documentation, and multi-modal content - without writing custom parsers every time.

## Why FluffyTagProcessor?

- 🚀 **Build AI Systems Fast**: Create structured output systems in minutes
- ⚡ **Streaming-First**: Built for real-time token processing
- 🎯 **Zero Boilerplate**: Stop writing parsers for every project
- 🔄 **Mixed Content**: Handle both tagged and untagged content seamlessly
- 🛡️ **Type-Safe**: Full TypeScript and Python type support
- 🪶 **Lightweight**: ~4KB minified, zero dependencies

## Perfect For Building

- 🤖 AI assistants with structured outputs
- 💻 Code generation systems
- 📚 Interactive documentation tools
- 🎓 Educational platforms
- 📊 Data visualization tools

## Quick Start

### JavaScript/TypeScript
```typescript
import { FluffyTagProcessor } from 'fluffy-tag-processor';
import OpenAI from 'openai';

// Initialize processor
const processor = new FluffyTagProcessor();

// Handle regular conversation
processor.setUntaggedContentHandler((content) => {
    appendToConversation(content);
});

// Handle code artifacts
processor.registerHandler('code', {
    handler: (attrs, content) => {
        createCodeArtifact({
            language: attrs.language,
            title: attrs.title,
            content: content
        });
    }
});

// Use with OpenAI
const openai = new OpenAI();

// System prompt for structured outputs
const SYSTEM_PROMPT = `You are a helpful assistant that provides responses in a structured format.
When providing code or technical content, use appropriate tags:

<code language="python" title="Example Script">
def hello():
    return "Hello, World!"
</code>

For regular conversation, simply write normally without tags.

Example response:
Let me show you a Python function.

<code language="python" title="Greeting Function">
def greet(name):
    return f"Hello, {name}!"
</code>

Now you can use this function in your program.`;

// Process AI response
const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: "Show me a Python class example" }
    ],
    stream: true
});

for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
        processor.processToken(chunk.choices[0].delta.content);
    }
}
```

### Python
```python
from fluffy_tag_processor import FluffyTagProcessor
from anthropic import Anthropic

# Initialize processor
processor = FluffyTagProcessor()

# Handle conversation
def handle_conversation(content: str):
    append_to_conversation(content)

processor.set_untagged_content_handler(handle_conversation)

# Handle code artifacts
def handle_code(attrs: dict, content: str):
    create_code_artifact(
        language=attrs.get('language', 'plaintext'),
        title=attrs.get('title', 'Code'),
        content=content
    )

processor.register_handler(
    "code",
    handler=handle_code
)

# Use with Anthropic
client = Anthropic()

SYSTEM_PROMPT = """You are a helpful assistant that provides responses in a structured format.
When providing code or technical content, use appropriate tags:

<code language="python" title="Example Script">
def hello():
    return "Hello, World!"
</code>

For regular conversation, simply write normally without tags.

Example response:
Let me explain functions in Python.

<code language="python" title="Function Example">
def add(a, b):
    return a + b
</code>

This function takes two parameters and returns their sum."""

# Process AI response
message = await client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    messages=[
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "role": "user",
            "content": "Explain Python classes"
        }
    ],
    stream=True
)

async for chunk in message:
    if chunk.type == "content_block_delta":
        processor.process_token(chunk.delta.text)
```

## Advanced Features

### Multi-Modal Content Processing
```typescript
class AIAssistant {
    constructor() {
        this.processor = new FluffyTagProcessor();
        
        // Handle conversation
        this.processor.setUntaggedContentHandler((content) => {
            this.updateConversation(content);
        });

        // Handle code
        this.processor.registerHandler('code', {
            handler: (attrs, content) => {
                this.createArtifact('code', attrs, content);
            }
        });

        // Handle technical documents
        this.processor.registerHandler('doc', {
            handler: (attrs, content) => {
                this.createArtifact('document', attrs, content);
            }
        });

        // Handle diagrams
        this.processor.registerHandler('diagram', {
            handler: (attrs, content) => {
                this.createArtifact('diagram', attrs, content);
            }
        });
    }

    private createArtifact(type: string, attrs: Record<string, string>, content: string) {
        // Create and store artifact
        const artifact = {
            type,
            attributes: attrs,
            content,
            id: generateId()
        };
        
        this.artifacts.set(artifact.id, artifact);
        this.notifyArtifactCreated(artifact);
    }
}
```

### Real-Time UI Updates
```typescript
processor.registerHandler('code', {
    handler: (attrs, content) => {
        updateArtifact(attrs.id, content);
    },
    streamingCallback: (char, attrs) => {
        appendToArtifact(attrs.id, char);
    }
});

processor.setUntaggedContentHandler((content) => {
    appendToConversation(content);
});
```

### System Prompt Examples

#### Basic Assistant
```typescript
const BASIC_PROMPT = `You are a helpful assistant that provides structured responses.
Use tags when appropriate:

<code language="[language]" title="[description]">
Code content
</code>

Regular text for explanations and conversation.`;
```

#### Technical Documentation Assistant
```typescript
const DOCS_PROMPT = `You are a technical documentation assistant.
Structure your responses using:

<code language="[language]" title="[title]">
Code examples
</code>

<doc type="[api|guide|reference]" title="[title]">
Documentation content
</doc>

<diagram type="[flowchart|sequence|architecture]">
Diagram content
</diagram>

Regular text for explanations and context.`;
```

## API Reference

### Constructor
```typescript
new FluffyTagProcessor(options?: {
    debug?: boolean;
    bufferSize?: number;
    sanitize?: boolean;
})
```

### Methods
```typescript
registerHandler(
    tagName: string,
    options: {
        handler: (attrs: Record<string, string>, content: string) => void;
        streamingCallback?: (char: string, attrs: Record<string, string>) => void;
        allowNested?: boolean;
        bufferSize?: number;
    }
): void

setUntaggedContentHandler(
    handler: (content: string) => void
): void

processToken(token: string): void
```

## Performance Tips

1. **Buffer Management**: Adjust buffer size for your needs
```typescript
const processor = new FluffyTagProcessor({
    bufferSize: 1024  // Default: 512
});
```

2. **UI Updates**: Batch streaming updates
```typescript
let buffer = '';
processor.registerHandler('code', {
    streamingCallback: (char, attrs) => {
        buffer += char;
        if (buffer.length >= 100) {
            updateUI(buffer);
            buffer = '';
        }
    }
});
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details

## Support

- GitHub Issues: [Create an issue](https://github.com/m-ahmed-elbeskeri/FluffyTagProcessor/issues)
- Documentation: [Visit docs](DOCUMENTATION.md)

---

Made with ❤️ by Mohamed Elbeskeri
