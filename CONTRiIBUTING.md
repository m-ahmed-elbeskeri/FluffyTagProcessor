# Contributing to FluffyTagProcessor 🎯

First off, thanks for taking the time to contribute! FluffyTagProcessor aims to be the go-to solution for building AI assistants with structured outputs. Every contribution helps make this goal a reality.

## Quick Links

- [Report a bug](https://github.com/username/fluffy-tag-processor/issues/new?template=bug_report.md)
- [Request a feature](https://github.com/username/fluffy-tag-processor/issues/new?template=feature_request.md)


## Ways to Contribute

Every contribution matters! Here are some ways you can help:

### 🐛 Bug Reports & Feature Requests
- Use the issue templates
- Include minimal reproduction steps
- Share your use case for feature requests
- Check existing issues before creating new ones

### 💻 Code Contributions

#### Development Environment Setup

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/fluffy-tag-processor.git
   cd fluffy-tag-processor
   ```

2. **Install Dependencies**
   ```bash
   # JavaScript/TypeScript
   npm install
   
   # Python
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -e ".[dev]"
   ```

3. **Set Up Pre-commit Hooks**
   ```bash
   # JavaScript/TypeScript
   npm run prepare
   
   # Python
   pre-commit install
   ```

#### Code Style & Standards

##### JavaScript/TypeScript
```typescript
// ✅ Good
interface TagAttributes {
  language?: string;
  title: string;
}

class TagProcessor {
  private processTag(attrs: TagAttributes): void {
    // Implementation
  }
}

// ❌ Avoid
interface attrs {
  l?: string;
  t: string;
}

class processor {
  process(a: attrs) {
    // Implementation
  }
}
```

##### Python
```python
# ✅ Good
from typing import Dict, Optional

class TagProcessor:
    def process_tag(self, attributes: Dict[str, str]) -> Optional[str]:
        """Process a tag with given attributes.
        
        Args:
            attributes: Dictionary of tag attributes
            
        Returns:
            Processed content or None if invalid
        """
        return self._handle_tag(attributes)

# ❌ Avoid
class processor:
    def process(self, attrs):
        # No type hints
        # No docstring
        return self._handle(attrs)
```

### 🧪 Testing

#### Writing Tests

1. **Test Structure**
```typescript
// JavaScript/TypeScript
describe('TagProcessor', () => {
  describe('processToken', () => {
    it('should handle nested tags correctly', () => {
      const processor = new TagProcessor();
      const input = '<outer><inner>content</inner></outer>';
      const result = processor.processToken(input);
      expect(result).toMatchSnapshot();
    });
  });
});
```

```python
# Python
def test_nested_tags():
    """Test processing of nested tags."""
    processor = TagProcessor()
    input_text = '<outer><inner>content</inner></outer>'
    result = processor.process_token(input_text)
    assert result == expected_output
```

2. **Running Tests**
```bash
# JavaScript/TypeScript
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run test:coverage

# Python
pytest              # Run tests
pytest -v           # Verbose output
pytest --cov        # Coverage report
```

### 📚 Documentation

#### API Documentation Style

```typescript
/**
 * Processes a token stream for tag content.
 *
 * @param token - The input token to process
 * @param options - Processing options
 * @returns Processed token result
 *
 * @example
 * ```typescript
 * const processor = new TagProcessor();
 * processor.processToken('<code>hello</code>');
 * ```
 */
processToken(token: string, options?: ProcessOptions): TokenResult;
```

#### Example Documentation

Create examples that:
- Show real-world use cases
- Include error handling
- Demonstrate best practices
- Are tested and runnable

```typescript
// examples/streaming-processor.ts
import { FluffyTagProcessor } from 'fluffy-tag-processor';

// Initialize with streaming support
const processor = new FluffyTagProcessor({
  streamContent: true,
  bufferSize: 1024
});

// Register streaming handler
processor.registerHandler('code', {
  handler: (attrs, content) => {
    console.log(`Completed code block: ${content}`);
  },
  streamingCallback: (char, attrs) => {
    process.stdout.write(char);
  }
});

// Process streaming content
async function processStream(stream: AsyncIterator<string>) {
  for await (const chunk of stream) {
    processor.processToken(chunk);
  }
}
```

### 🚀 Pull Request Process

1. **Branch Naming**
   ```
   feature/tag-streaming
   fix/nested-tag-bug
   docs/api-examples
   perf/buffer-optimization
   ```

2. **Commit Messages**
   ```
   feat(processor): add streaming tag support
   fix(parser): handle nested tags correctly
   docs(api): add streaming examples
   test(processor): improve coverage for edge cases
   perf(buffer): optimize memory usage
   ```

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Performance improvement

   ## Testing
   - [ ] Added unit tests
   - [ ] Updated existing tests
   - [ ] Manually tested edge cases

   ## Screenshots/Examples
   If applicable

   ## Related Issues
   Fixes #123
   ```

### 🔍 Code Review Process

1. **Review Checklist**
   - [ ] Code follows style guide
   - [ ] Tests cover new/modified code
   - [ ] Documentation is updated
   - [ ] Performance impact considered
   - [ ] Edge cases handled

2. **Review Comments**
   ```
   Consider handling this edge case:
   ```typescript
   // What happens when tag is incomplete?
   processor.processToken('<code>incomplete');
   ```

### 🎯 Performance Guidelines

1. **Memory Usage**
   - Implement streaming where possible
   - Use buffer pooling for large content
   - Clean up resources properly

2. **Processing Speed**
   - Profile hot code paths
   - Optimize regex patterns
   - Use appropriate data structures

```typescript
// ✅ Good: Efficient buffer usage
const buffer = new CircularBuffer(1024);
buffer.write(chunk);

// ❌ Avoid: Memory inefficient
const chunks: string[] = [];
chunks.push(chunk);
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions & Support

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features

Thank you for making FluffyTagProcessor better! 🚀
