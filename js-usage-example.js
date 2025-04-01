/**
 * FluffyTagProcessor Usage Examples
 *
 * This file demonstrates common usage patterns for the FluffyTagProcessor
 * library when working with LLM outputs containing tags.
 */

// Import the library (ESM style)
import { FluffyTagProcessor } from './fluffy-tag-processor.js';

// Alternative import for CommonJS
// const { FluffyTagProcessor } = require('./fluffy-tag-processor.js');

// Example 1: Basic usage with a simple tag
function basicExample() {
  console.log("=== Basic Example ===");

  // Create a processor
  const processor = new FluffyTagProcessor();

  // Register a handler for the 'code' tag
  processor.registerHandler('code', (attributes, content) => {
    console.log(`Code in ${attributes.language || 'unknown'} language:`);
    console.log(content);
  });

  // Process a string with tags
  const input = `Here's a code example:
  <code language="javascript">
  function hello() {
    console.log("Hello, world!");
  }
  </code>`;

  processor.processString(input);
  processor.flush();
}

// Example 2: Using callbacks and streaming
function callbacksExample() {
  console.log("\n=== Callbacks Example ===");

  const processor = new FluffyTagProcessor();

  let collectedChars = [];

  processor.registerHandler('stream', (attributes, content) => {
    console.log(`Completed collecting: ${content}`);
  }, {
    streamContent: true,
    streamingCallback: (char, attributes) => {
      collectedChars.push(char);
      if (collectedChars.length % 10 === 0) {
        console.log(`Streamed ${collectedChars.length} characters so far...`);
      }
    },
    onTagStartCallback: (tagName, attributes) => {
      console.log(`Started streaming with name: ${attributes.name || 'unnamed'}`);
      collectedChars = [];
    },
    onTagCompleteCallback: (tagName, attributes, content) => {
      console.log(`Finished streaming ${collectedChars.length} total characters`);
    }
  });

  const input = `<stream name="test">This is a streaming test with character-by-character processing</stream>`;
  processor.processString(input);
  processor.flush();
}

// Example 3: Handling untagged content
function untaggedContentExample() {
  console.log("\n=== Untagged Content Example ===");

  const processor = new FluffyTagProcessor({
    autoProcessUntaggedContent: true,
    autoProcessThreshold: 10  // Process every 10 chars
  });

  // Set a handler for untagged content
  processor.setUntaggedContentHandler((content) => {
    console.log(`Untagged content: "${content}"`);
  });

  // Register a handler for the 'highlight' tag
  processor.registerHandler('highlight', (attributes, content) => {
    console.log(`Highlighted: "${content}"`);
  });

  const input = `This is regular text. <highlight>This is highlighted.</highlight> Back to regular text.`;
  processor.processString(input);
  processor.flush();
}

// Example 4: Error handling
function errorHandlingExample() {
  console.log("\n=== Error Handling Example ===");

  const processor = new FluffyTagProcessor({
    debug: true,
    errorHandler: (error) => {
      console.error(`Custom error handler: ${error.message}`, error.context);
    }
  });

  // Register a handler that will throw an error
  processor.registerHandler('problem', (attributes, content) => {
    throw new Error("Simulated error in handler");
  });

  // Register a normal handler
  processor.registerHandler('normal', (attributes, content) => {
    console.log(`Normal tag content: ${content}`);
  });

  const input = `<problem>This will cause an error</problem>
  <normal>This should still work</normal>`;

  processor.processString(input);
  processor.flush();
}

// Example 5: Processing LLM output with multiple tag types
function llmOutputExample() {
  console.log("\n=== LLM Output Example ===");

  const processor = new FluffyTagProcessor();

  // Handler for code blocks
  processor.registerHandler('code', (attributes, content) => {
    console.log(`Code block (${attributes.language || 'unknown'}):`);
    console.log(content);
  });

  // Handler for thought process
  processor.registerHandler('thinking', (attributes, content) => {
    console.log("LLM's thinking process:");
    console.log(content.slice(0, 100) + (content.length > 100 ? '...' : ''));
  });

  // Handler for facts
  processor.registerHandler('fact', (attributes, content) => {
    console.log(`Fact: ${content}`);
  });

  // Handler for regular content
  processor.setUntaggedContentHandler((content) => {
    console.log(`Response: ${content}`);
  });

  const simulatedLLMOutput = `
  <thinking>
  I need to answer the user's question about JavaScript promises.
  First, I'll explain what promises are, then provide an example.
  </thinking>

  Promises in JavaScript are objects representing the eventual completion or failure of an asynchronous operation.

  <fact>Promises were introduced in ES6 (2015)</fact>

  Here's a simple example:

  <code language="javascript">
  const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation
    setTimeout(() => {
      resolve('Operation completed!');
    }, 1000);
  });

  myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));
  </code>

  Let me know if you have more questions!
  `;

  processor.processString(simulatedLLMOutput);
  processor.flush();
}

// Run all examples
function runAllExamples() {
  basicExample();
  callbacksExample();
  untaggedContentExample();
  errorHandlingExample();
  llmOutputExample();
}

// Run the examples
runAllExamples();