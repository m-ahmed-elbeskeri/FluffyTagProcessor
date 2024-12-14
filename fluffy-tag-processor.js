// FluffyTagProcessor - A resilient XML-like tag processing system
// Handles streaming content, nested tags, and custom handlers

/**
 * @typedef {Object} TagConfig
 * @property {Function} handler - Main handler function for the tag
 * @property {boolean} streamContent - Whether to stream content as it comes in
 * @property {boolean} processNested - Whether to process nested tags
 * @property {Function|null} streamingCallback - Optional callback for streaming content
 * @property {boolean} allowsNestedOfSameType - Whether the tag can be nested within itself
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

class FluffyTagProcessor {
    constructor() {
        this.tagConfigs = new Map();
        this.tagStack = [];
        this.partialBuffer = [];
        this.untaggedContent = [];
        this.inTag = false;
        this.currentTag = [];
        this.jsonDepth = 0;
        this.inQuotes = false;
        this.untaggedContentHandler = null;
    }

    /**
     * Register a handler for a specific tag type
     * @param {string} tagName - Name of the tag to handle
     * @param {Function} handler - Handler function for the tag
     * @param {Object} options - Configuration options
     */
    registerHandler(tagName, handler, {
        allowNested = true,
        allowsNestedOfSameType = false,
        streamContent = true,
        streamingCallback = null
    } = {}) {
        this.tagConfigs.set(tagName, {
            handler,
            streamContent,
            processNested: allowNested,
            streamingCallback,
            allowsNestedOfSameType
        });
    }

    /**
     * Set a handler for content outside of tags
     * @param {Function|null} handler - Handler function
     */
    setUntaggedContentHandler(handler) {
        this.untaggedContentHandler = handler;
    }

    /**
     * Process accumulated untagged content
     * @param {string} content - Content to process
     * @private
     */
    _processUntaggedContent(content) {
        if (content.trim() && this.untaggedContentHandler) {
            this.untaggedContentHandler(content);
        }
    }

    /**
     * Process incoming tokens
     * @param {string} token - Token to process
     */
    processToken(token) {
        if (!token.trim()) return;

        for (const char of token) {
            if (char === '"' && this.jsonDepth > 0) {
                this.inQuotes = !this.inQuotes;
            }

            if (!this.inQuotes) {
                if (char === '{') {
                    this.jsonDepth++;
                } else if (char === '}') {
                    this.jsonDepth = Math.max(0, this.jsonDepth - 1);
                }
            }

            if (char === '<' && !this.inQuotes && this.jsonDepth === 0) {
                if (this.untaggedContent.length) {
                    this._processUntaggedContent(this.untaggedContent.join('').trim());
                    this.untaggedContent = [];
                }
                this.inTag = true;
                this.currentTag = [char];
                continue;
            }

            if (this.inTag) {
                this.currentTag.push(char);
                if (char === '>') {
                    this._processCompleteTag(this.currentTag.join(''));
                    this.inTag = false;
                    this.currentTag = [];
                }
            } else {
                if (this.tagStack.length) {
                    const context = this.tagStack[this.tagStack.length - 1];
                    context.content.push(char);
                    if (context.config?.streamingCallback) {
                        context.config.streamingCallback(char, context.attributes);
                    }
                } else {
                    this.untaggedContent.push(char);
                }
            }

            if (this.untaggedContent.length > 20) {
                this._processUntaggedContent(this.untaggedContent.join('').trim());
                this.untaggedContent = [];
            }
        }
    }

    /**
     * Process a complete tag
     * @param {string} tagContent - Complete tag content
     * @private
     */
    _processCompleteTag(tagContent) {
        tagContent = tagContent.trim();

        if (tagContent.startsWith('</')) {
            const tagName = tagContent.slice(2, -1).trim();
            this._handleClosingTag(tagName);
        } else {
            tagContent = tagContent.slice(1, -1);
            const [tagName, ...rest] = tagContent.split(/\s+/);
            const attributes = {};

            if (rest.length) {
                const attrText = rest.join(' ');
                const attrMatches = [...attrText.matchAll(/(\w+)\s*=\s*"([^"]*)"/g)];
                for (const [, key, value] of attrMatches) {
                    attributes[key] = value;
                }
            }

            this._handleOpeningTag(tagName, attributes);
        }
    }

    /**
     * Handle an opening tag
     * @param {string} tagName - Name of the tag
     * @param {Object} attributes - Tag attributes
     * @private
     */
    _handleOpeningTag(tagName, attributes) {
        const config = this.tagConfigs.get(tagName);
        if (!config) {
            console.warn(`⚠️ Warning: Unregistered tag type: ${tagName}`);
            return;
        }

        const context = {
            name: tagName,
            attributes,
            content: [],
            parent: this.tagStack.length ? this.tagStack[this.tagStack.length - 1] : null,
            startTime: new Date(),
            isCollecting: false,
            config
        };

        this.tagStack.push(context);
    }

    /**
     * Handle a closing tag
     * @param {string} tagName - Name of the tag
     * @private
     */
    _handleClosingTag(tagName) {
        if (!this.tagStack.length) {
            console.warn(`⚠️ Warning: Found closing tag ${tagName} but no opening tags in stack`);
            return;
        }

        const lastTag = this.tagStack[this.tagStack.length - 1];
        if (lastTag.name === tagName) {
            const context = this.tagStack.pop();
            const content = context.content.join('').trim();
            if (context.config?.handler) {
                context.config.handler(context.attributes, content);
            }
        } else {
            console.warn(`⚠️ Warning: Mismatched closing tag: expected ${lastTag.name}, got ${tagName}`);
        }
    }
}

export default FluffyTagProcessor;
