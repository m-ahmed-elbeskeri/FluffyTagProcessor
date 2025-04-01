/**
 * @fileoverview FluffyTagProcessor - XML/tag processor for LLM outputs
 *
 * A lightweight, production-ready processor for parsing XML-like tags in text,
 * particularly designed for processing structured output from Large Language Models.
 *
 * @version 1.0.0
 * @license MIT
 */

/**
 * @typedef {Object} TagConfig
 * @property {Function} handler - Main handler function for the tag
 * @property {boolean} streamContent - Whether to stream content as it comes in
 * @property {boolean} processNested - Whether to process nested tags
 * @property {Function|null} streamingCallback - Optional callback for streaming content
 * @property {boolean} allowsNestedOfSameType - Whether the tag can be nested within itself
 * @property {Function|null} onTagStartCallback - Optional callback when tag processing begins
 * @property {Function|null} onTagCompleteCallback - Optional callback when tag processing is completed
 */

/**
 * @typedef {Object} TagContext
 * @property {string} name - Tag name
 * @property {Object} attributes - Tag attributes
 * @property {Array<string>} content - Collected content
 * @property {TagContext|null} parent - Parent tag context
 * @property {Date} startTime - When the tag processing started
 * @property {boolean} isCollecting - Whether currently collecting content
 * @property {TagConfig|null} config - Configuration for this tag type
 */

/**
 * @typedef {Object} ProcessorOptions
 * @property {boolean} [debug=false] - Whether to enable debug mode
 * @property {Function} [errorHandler=null] - Custom error handler
 * @property {boolean} [autoProcessUntaggedContent=true] - Whether to auto-process untagged content
 * @property {number} [autoProcessThreshold=20] - Character threshold for processing untagged content
 */

/**
 * Error class for tag processing errors
 */
class TagProcessorError extends Error {
  /**
   * @param {string} message - Error message
   * @param {Object} context - Additional context for the error
   */
  constructor(message, context = {}) {
    super(message);
    this.name = 'TagProcessorError';
    this.context = context;
  }
}

/**
 * FluffyTagProcessor - A lightweight processor for XML-like tags
 *
 * Designed for processing custom tags in text content, particularly
 * from LLM outputs similar to Claude artifacts.
 */
class FluffyTagProcessor {
    /**
     * Create a new FluffyTagProcessor
     *
     * @param {ProcessorOptions} options - Configuration options
     */
    constructor({
      debug = false,
      errorHandler = null,
      autoProcessUntaggedContent = true,
      autoProcessThreshold = 20
    } = {}) {
        this.tagConfigs = new Map();
        this.tagStack = [];
        this.partialBuffer = [];
        this.untaggedContent = [];
        this.inTag = false;
        this.currentTag = [];
        this.jsonDepth = 0;
        this.inQuotes = false;
        this.quoteChar = '';
        this.untaggedContentHandler = null;
        this.debug = debug;
        this.errorHandler = errorHandler || this._defaultErrorHandler.bind(this);
        this.autoProcessUntaggedContent = autoProcessUntaggedContent;
        this.autoProcessThreshold = autoProcessThreshold;
    }

    /**
     * Default error handler
     *
     * @param {TagProcessorError} error - Error object
     * @private
     */
    _defaultErrorHandler(error) {
        if (this.debug) {
            console.error(`FluffyTagProcessor Error: ${error.message}`, error.context || '');
        }
    }

    /**
     * Log debug message if debug mode is enabled
     *
     * @param {string} message - Debug message
     * @param {any} data - Optional data to log
     * @private
     */
    _debugLog(message, data = null) {
        if (this.debug) {
            if (data) {
                console.debug(`[FluffyTagProcessor] ${message}`, data);
            } else {
                console.debug(`[FluffyTagProcessor] ${message}`);
            }
        }
    }

    /**
     * Register a handler for a specific tag type
     *
     * @param {string} tagName - Name of the tag to handle
     * @param {Function} handler - Handler function for the tag
     * @param {Object} options - Configuration options
     * @param {boolean} [options.allowNested=true] - Whether to allow nested tags
     * @param {boolean} [options.allowsNestedOfSameType=false] - Whether tag can be nested in itself
     * @param {boolean} [options.streamContent=true] - Whether to stream content as it comes in
     * @param {Function} [options.streamingCallback=null] - Callback for streaming content
     * @param {Function} [options.onTagStartCallback=null] - Callback when tag starts
     * @param {Function} [options.onTagCompleteCallback=null] - Callback when tag completes
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    registerHandler(tagName, handler, {
        allowNested = true,
        allowsNestedOfSameType = false,
        streamContent = true,
        streamingCallback = null,
        onTagStartCallback = null,
        onTagCompleteCallback = null
    } = {}) {
        if (!tagName || typeof tagName !== 'string') {
            throw new TagProcessorError('Tag name must be a non-empty string', { tagName });
        }

        if (typeof handler !== 'function') {
            throw new TagProcessorError('Handler must be a function', { tagName });
        }

        this.tagConfigs.set(tagName, {
            handler,
            streamContent,
            processNested: allowNested,
            streamingCallback: typeof streamingCallback === 'function' ? streamingCallback : null,
            allowsNestedOfSameType,
            onTagStartCallback: typeof onTagStartCallback === 'function' ? onTagStartCallback : null,
            onTagCompleteCallback: typeof onTagCompleteCallback === 'function' ? onTagCompleteCallback : null
        });

        this._debugLog(`Registered handler for tag: ${tagName}`);
        return this;
    }

    /**
     * Set a handler for content outside of tags
     *
     * @param {Function|null} handler - Handler function
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    setUntaggedContentHandler(handler) {
        if (handler !== null && typeof handler !== 'function') {
            throw new TagProcessorError('Untagged content handler must be a function or null');
        }

        this.untaggedContentHandler = handler;
        this._debugLog('Set untagged content handler');
        return this;
    }

    /**
     * Set the threshold for auto-processing untagged content
     *
     * @param {number} threshold - Number of characters to accumulate before processing
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    setAutoProcessThreshold(threshold) {
        if (typeof threshold !== 'number' || threshold < 1) {
            throw new TagProcessorError('Threshold must be a positive number');
        }

        this.autoProcessThreshold = threshold;
        return this;
    }

    /**
     * Process accumulated untagged content
     *
     * @param {string} content - Content to process
     * @private
     */
    _processUntaggedContent(content) {
        const trimmedContent = content.trim();
        if (trimmedContent && this.untaggedContentHandler) {
            try {
                this.untaggedContentHandler(trimmedContent);
                this._debugLog(`Processed untagged content (${trimmedContent.length} chars)`);
            } catch (error) {
                this.errorHandler(new TagProcessorError('Error in untagged content handler', {
                    originalError: error,
                    content: trimmedContent.slice(0, 100) + (trimmedContent.length > 100 ? '...' : '')
                }));
            }
        }
    }

    /**
     * Process a batch of tokens at once
     *
     * @param {string[]} tokens - Array of tokens to process
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    processTokens(tokens) {
        if (!Array.isArray(tokens)) {
            throw new TagProcessorError('Tokens must be an array');
        }

        for (const token of tokens) {
            this.processToken(token);
        }

        return this;
    }

    /**
     * Process a string as a single token
     *
     * @param {string} content - String content to process
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    processString(content) {
        if (typeof content !== 'string') {
            throw new TagProcessorError('Content must be a string');
        }

        this.processToken(content);
        return this;
    }

    /**
     * Process incoming tokens
     *
     * @param {string} token - Token to process
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    processToken(token) {
        if (!token || typeof token !== 'string') {
            return this; // Skip empty tokens
        }

        if (!token.trim()) {
            return this; // Skip whitespace-only tokens
        }

        try {
            this._processTokenInternal(token);
        } catch (error) {
            if (error instanceof TagProcessorError) {
                this.errorHandler(error);
            } else {
                this.errorHandler(new TagProcessorError('Error processing token', {
                    originalError: error,
                    token: token.slice(0, 50) + (token.length > 50 ? '...' : '')
                }));
            }
        }

        return this;
    }

    /**
     * Internal token processing logic
     *
     * @param {string} token - Token to process
     * @private
     */
    _processTokenInternal(token) {
        for (const char of token) {
            this._processChar(char);
        }
    }

    /**
     * Process a single character
     *
     * @param {string} char - Character to process
     * @private
     */
    _processChar(char) {
        // Handle quotes inside JSON
        if ((char === '"' || char === "'") && this.jsonDepth > 0) {
            if (!this.inQuotes) {
                this.inQuotes = true;
                this.quoteChar = char;
            } else if (char === this.quoteChar) {
                this.inQuotes = false;
                this.quoteChar = '';
            }
        }

        // Track JSON depth
        if (!this.inQuotes) {
            if (char === '{') {
                this.jsonDepth++;
            } else if (char === '}') {
                this.jsonDepth = Math.max(0, this.jsonDepth - 1);
            }
        }

        // Handle tag markers
        if (char === '<' && !this.inQuotes && this.jsonDepth === 0) {
            if (this.untaggedContent.length) {
                this._processUntaggedContent(this.untaggedContent.join(''));
                this.untaggedContent = [];
            }
            this.inTag = true;
            this.currentTag = [char];
            return;
        }

        // Handle characters inside a tag
        if (this.inTag) {
            this.currentTag.push(char);
            if (char === '>') {
                this._processCompleteTag(this.currentTag.join(''));
                this.inTag = false;
                this.currentTag = [];
            }
        } else {
            // Handle characters inside content
            if (this.tagStack.length) {
                const context = this.tagStack[this.tagStack.length - 1];
                context.content.push(char);
                if (context.config?.streamingCallback) {
                    try {
                        context.config.streamingCallback(char, context.attributes);
                    } catch (error) {
                        this.errorHandler(new TagProcessorError('Error in streaming callback', {
                            originalError: error,
                            tagName: context.name,
                            char
                        }));
                    }
                }
            } else {
                this.untaggedContent.push(char);
            }
        }

        // Auto-process untagged content when threshold is reached
        if (this.autoProcessUntaggedContent && this.untaggedContent.length > this.autoProcessThreshold) {
            this._processUntaggedContent(this.untaggedContent.join(''));
            this.untaggedContent = [];
        }
    }

    /**
     * Process a complete tag
     *
     * @param {string} tagContent - Complete tag content
     * @private
     */
    _processCompleteTag(tagContent) {
        tagContent = tagContent.trim();

        if (tagContent.startsWith('</')) {
            // Closing tag
            const tagName = tagContent.slice(2, -1).trim();
            this._handleClosingTag(tagName);
        } else if (tagContent.endsWith('/>')) {
            // Self-closing tag
            tagContent = tagContent.slice(1, -2).trim();
            const [tagName, ...rest] = tagContent.split(/\s+/);
            const attributes = this._parseAttributes(rest.join(' '));
            this._handleSelfClosingTag(tagName, attributes);
        } else {
            // Opening tag
            tagContent = tagContent.slice(1, -1).trim();
            const [tagName, ...rest] = tagContent.split(/\s+/);
            const attributes = this._parseAttributes(rest.join(' '));
            this._handleOpeningTag(tagName, attributes);
        }
    }

    /**
     * Parse tag attributes from text
     *
     * @param {string} attrText - Attribute text to parse
     * @returns {Object} - Parsed attributes
     * @private
     */
    _parseAttributes(attrText) {
        const attributes = {};

        if (!attrText) {
            return attributes;
        }

        // Match both single and double quoted attributes
        const attrRegex = /(\w+)\s*=\s*(['"])((?:(?!\2).)*)\2/g;
        let match;

        while ((match = attrRegex.exec(attrText)) !== null) {
            const [, key, , value] = match;
            attributes[key] = value;
        }

        return attributes;
    }

    /**
     * Handle an opening tag
     *
     * @param {string} tagName - Name of the tag
     * @param {Object} attributes - Tag attributes
     * @private
     */
    _handleOpeningTag(tagName, attributes) {
        const config = this.tagConfigs.get(tagName);
        if (!config) {
            this._debugLog(`Unregistered tag type: ${tagName}`);
            return;
        }

        // Check if tag can be nested within itself
        if (!config.allowsNestedOfSameType) {
            const hasParentOfSameType = this.tagStack.some(context => context.name === tagName);
            if (hasParentOfSameType) {
                this.errorHandler(new TagProcessorError(
                    `Tag "${tagName}" cannot be nested within itself`,
                    { tagName, attributes }
                ));
                return;
            }
        }

        const context = {
            name: tagName,
            attributes,
            content: [],
            parent: this.tagStack.length ? this.tagStack[this.tagStack.length - 1] : null,
            startTime: new Date(),
            isCollecting: true,
            config
        };

        // Call onTagStartCallback if defined
        if (config.onTagStartCallback) {
            try {
                config.onTagStartCallback(tagName, attributes);
            } catch (error) {
                this.errorHandler(new TagProcessorError('Error in onTagStartCallback', {
                    originalError: error,
                    tagName,
                    attributes
                }));
            }
        }

        this.tagStack.push(context);
        this._debugLog(`Started tag: ${tagName}`, attributes);
    }

    /**
     * Handle a self-closing tag
     *
     * @param {string} tagName - Name of the tag
     * @param {Object} attributes - Tag attributes
     * @private
     */
    _handleSelfClosingTag(tagName, attributes) {
        const config = this.tagConfigs.get(tagName);
        if (!config) {
            this._debugLog(`Unregistered tag type: ${tagName}`);
            return;
        }

        this._debugLog(`Processing self-closing tag: ${tagName}`, attributes);

        // Call onTagStartCallback if defined
        if (config.onTagStartCallback) {
            try {
                config.onTagStartCallback(tagName, attributes);
            } catch (error) {
                this.errorHandler(new TagProcessorError('Error in onTagStartCallback', {
                    originalError: error,
                    tagName,
                    attributes
                }));
            }
        }

        // For self-closing tags, invoke handler directly with empty content
        try {
            if (config.handler) {
                config.handler(attributes, "");
            }
        } catch (error) {
            this.errorHandler(new TagProcessorError('Error in tag handler', {
                originalError: error,
                tagName,
                attributes
            }));
        }

        // Call onTagCompleteCallback if defined
        if (config.onTagCompleteCallback) {
            try {
                config.onTagCompleteCallback(tagName, attributes, "");
            } catch (error) {
                this.errorHandler(new TagProcessorError('Error in onTagCompleteCallback', {
                    originalError: error,
                    tagName,
                    attributes
                }));
            }
        }
    }

    /**
     * Handle a closing tag
     *
     * @param {string} tagName - Name of the tag
     * @private
     */
    _handleClosingTag(tagName) {
        if (!this.tagStack.length) {
            this.errorHandler(new TagProcessorError(
                `Found closing tag "${tagName}" but no opening tags in stack`,
                { tagName }
            ));
            return;
        }

        const lastTag = this.tagStack[this.tagStack.length - 1];
        if (lastTag.name === tagName) {
            const context = this.tagStack.pop();
            const content = context.content.join('');

            this._debugLog(`Completed tag: ${tagName}`);

            // Invoke main handler
            if (context.config?.handler) {
                try {
                    context.config.handler(context.attributes, content);
                } catch (error) {
                    this.errorHandler(new TagProcessorError('Error in tag handler', {
                        originalError: error,
                        tagName,
                        attributes: context.attributes
                    }));
                }
            }

            // Invoke onTagCompleteCallback, if defined
            if (context.config?.onTagCompleteCallback) {
                try {
                    context.config.onTagCompleteCallback(tagName, context.attributes, content);
                } catch (error) {
                    this.errorHandler(new TagProcessorError('Error in onTagCompleteCallback', {
                        originalError: error,
                        tagName,
                        attributes: context.attributes
                    }));
                }
            }
        } else {
            this.errorHandler(new TagProcessorError(
                `Mismatched closing tag: expected "${lastTag.name}", got "${tagName}"`,
                { expected: lastTag.name, received: tagName }
            ));
        }
    }

    /**
     * Reset the processor to its initial state
     *
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    reset() {
        this.tagStack = [];
        this.partialBuffer = [];
        this.untaggedContent = [];
        this.inTag = false;
        this.currentTag = [];
        this.jsonDepth = 0;
        this.inQuotes = false;
        this.quoteChar = '';
        this._debugLog('Processor reset');
        return this;
    }

    /**
     * Force processing of any remaining untagged content
     *
     * @returns {FluffyTagProcessor} - This instance for chaining
     */
    flush() {
        if (this.untaggedContent.length) {
            this._processUntaggedContent(this.untaggedContent.join(''));
            this.untaggedContent = [];
        }

        if (this.tagStack.length > 0) {
            this._debugLog('Warning: Unclosed tags remain in stack',
                this.tagStack.map(tag => tag.name)
            );
        }

        return this;
    }

    /**
     * Get the current tag stack depth
     *
     * @returns {number} - Current stack depth
     */
    getStackDepth() {
        return this.tagStack.length;
    }

    /**
     * Check if currently inside a specific tag
     *
     * @param {string} tagName - Tag name to check
     * @returns {boolean} - Whether inside the specified tag
     */
    isInsideTag(tagName) {
        return this.tagStack.some(context => context.name === tagName);
    }

    /**
     * Get information about pending unprocessed tags
     *
     * @returns {Array<{name: string, startTime: Date}>} - Array of tag info objects
     */
    getPendingTagInfo() {
        return this.tagStack.map(context => ({
            name: context.name,
            startTime: context.startTime
        }));
    }
}

// Export for CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FluffyTagProcessor,
        TagProcessorError
    };
}

// Export for ESM environments
export { FluffyTagProcessor, TagProcessorError };

// Fallback to global for browser environments
if (typeof window !== 'undefined') {
    window.FluffyTagProcessor = FluffyTagProcessor;
    window.TagProcessorError = TagProcessorError;
}