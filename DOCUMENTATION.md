# FluffyTagProcessor: Step-by-Step Guide

## Basic Setup
First, let's understand how to start using the processor:

```python
from fluffy_tag_processor import FluffyTagProcessor

# Create a new processor
processor = FluffyTagProcessor()
```

## Feature 1: Basic Tag Processing
The most basic feature is processing simple tags.

```python
# Step 1: Create a handler function
def basic_handler(attributes, content):
    print(f"I received: {content}")

# Step 2: Register the handler for a tag type
processor.register_handler("basic", basic_handler)

# Step 3: Process content
processor.process_token('<basic>Hello World</basic>')
# Output: I received: Hello World
```

## Feature 2: Tag Attributes
Tags can have attributes (like HTML):

```python
# Step 1: Create handler that uses attributes
def color_handler(attributes, content):
    color = attributes.get('color', 'black')  # 'black' is default
    print(f"Color is {color}, content is: {content}")

# Step 2: Register handler
processor.register_handler("colored", color_handler)

# Step 3: Use with attributes
processor.process_token('<colored color="red">This is red text</colored>')
# Output: Color is red, content is: This is red text
```

## Feature 3: Nested Tags
You can put tags inside other tags:

```python
# Step 1: Create handlers for outer and inner tags
def outer_handler(attributes, content):
    print(f"Outer content: {content}")

def inner_handler(attributes, content):
    print(f"Inner content: {content}")

# Step 2: Register both handlers
processor.register_handler("outer", outer_handler)
processor.register_handler("inner", inner_handler)

# Step 3: Use nested tags
processor.process_token("""
<outer>
    Start of outer
    <inner>This is inside</inner>
    End of outer
</outer>
""")
```

## Feature 4: Streaming Processing
Process content character by character as it arrives:

```python
# Step 1: Create streaming handler
def stream_char_handler(char, attributes):
    print(char, end='')  # Print each character immediately

def final_handler(attributes, content):
    print("\nAll done!")

# Step 2: Register with streaming enabled
processor.register_handler(
    "stream",
    handler=final_handler,
    stream_content=True,
    streaming_callback=stream_char_handler
)

# Step 3: Process content
processor.process_token('<stream>Loading...</stream>')
# Output: Loading...
# Output: All done!
```

## Feature 5: Regular Text Handling
Handle text that's not in any tags:

```python
# Step 1: Create regular text handler
def handle_regular_text(content):
    print(f"Regular text: {content}")

# Step 2: Set the handler
processor.set_untagged_content_handler(handle_regular_text)

# Step 3: Process mixed content
processor.process_token("""
This is regular text
<basic>This is in a tag</basic>
More regular text
""")
```

## Feature 6: Tag Completion Callbacks
Know when a tag is fully processed:

```python
# Step 1: Create completion callback
def on_tag_complete(tag_name, attributes, content):
    print(f"Finished processing {tag_name}")

# Step 2: Register handler with callback
processor.register_handler(
    "task",
    handler=basic_handler,
    on_tag_complete_callback=on_tag_complete
)

# Step 3: Process content
processor.process_token('<task>Do something</task>')
# Output: I received: Do something
# Output: Finished processing task
```

## Feature 7: JSON Content Handling
Process JSON inside tags without breaking:

```python
# Step 1: Create JSON handler
def json_handler(attributes, content):
    print(f"Got JSON: {content}")

# Step 2: Register handler
processor.register_handler("json", json_handler)

# Step 3: Process JSON content
processor.process_token('''
<json>
    {
        "name": "John",
        "age": 30,
        "city": "New York"
    }
</json>
''')
```

## Putting It All Together
Here's a complete example using multiple features:

```python
# Create processor
processor = FluffyTagProcessor()

# Define handlers
def text_handler(attributes, content):
    print(content)

def code_handler(attributes, content):
    language = attributes.get('language', 'text')
    print(f"\nCode in {language}:")
    print(content)

def regular_text(content):
    print(f"Regular: {content}")

def on_complete(tag_name, attrs, content):
    print(f"Finished {tag_name}\n")

# Register everything
processor.set_untagged_content_handler(regular_text)
processor.register_handler(
    "text",
    handler=text_handler,
    on_tag_complete_callback=on_complete
)
processor.register_handler(
    "code",
    handler=code_handler,
    on_tag_complete_callback=on_complete
)

# Use it
processor.process_token("""
Let's look at some code:
<text>Here's a Python example:</text>
<code language="python">
def hello():
    print("Hello, World!")
</code>
That's all folks!
""")
```

## Common Mistakes to Avoid

1. **Forgetting to Register Handlers**
```python
# ❌ Wrong: Using tag without handler
processor.process_token('<example>content</example>')

# ✅ Right: Register handler first
processor.register_handler("example", handler)
processor.process_token('<example>content</example>')
```

2. **Mismatched Tags**
```python
# ❌ Wrong: Tags don't match
processor.process_token('<outer><inner></outer></inner>')

# ✅ Right: Proper nesting
processor.process_token('<outer><inner></inner></outer>')
```

3. **Incorrect Attribute Format**
```python
# ❌ Wrong: Bad attribute format
processor.process_token('<tag color=red>content</tag>')

# ✅ Right: Use quotes for attributes
processor.process_token('<tag color="red">content</tag>')
```


Need help with something specific? Just ask!
