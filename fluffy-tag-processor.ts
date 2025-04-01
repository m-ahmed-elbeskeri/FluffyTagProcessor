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
 * Configuration for a tag handler
 */
export interface TagConfig {
    /** Main handler function for the tag */
    handler: (attributes: Record<string, string>, content: string) => void;
    /** Whether to stream content as it comes in */
    streamContent: boolean;
    /** Whether to process nested tags */
    processNested: boolean;
    /** Optional callback for streaming content */
    streamingCallback?: (char: string, attributes: Record<string, string>) => void;
    /** Whether the tag can be nested within itself */
    allowsNestedOfSameType: boolean;
    /** Optional callback when tag processing begins */
    onTagStartCallback?: (tagName: string, attributes: Record<string, string>) => void;
    /** Optional callback when tag processing is completed */
    onTagCompleteCallback?: (tagName: string, attributes: Record<string, string>, content: string) => void;
}

/**
 * Context for an active tag being processed
 */
export interface TagContext {
    /** Name of the tag */
    name: string;
    /** Tag attributes */
    attributes: Record<string, string>;
    /** Collected content */
    content: string[];
    /** Parent tag context */
    parent: TagContext | null;
    /** When the tag processing started */
    startTime: Date;
    /** Whether currently collecting content */
    isCollecting: boolean;
    /** Configuration for this tag type */
    config: TagConfig | null;
}

/**
 * Options when registering a handler
 */
export interface HandlerOptions {
    /** Whether to allow nested tags */
    allowNested?: boolean;
    /** Whether the tag can be nested within itself */
    allowsNestedOfSameType?: boolean;
    /** Whether to stream content as it comes in */
    streamContent?: boolean;
    /** Optional callback for streaming content */
    streamingCallback?: (char: string, attributes: Record<string, string>) => void;
    /** Optional callback when tag processing begins */
    onTagStartCallback?: (tagName: string, attributes: Record<string, string>) => void;
    /** Optional callback when tag processing is completed */
    onTagCompleteCallback?: (tagName: string, attributes: Record<string, string>, content: string) => void;
}

/**
 * Options when creating a processor instance
 */
export interface ProcessorOptions {
    /** Whether to enable debug mode */
    debug?: boolean;
    /** Custom error handler */
    errorHandler?: (error: TagProcessorError) => void;
    /** Whether to automatically process untagged content */
    autoProcessUntaggedContent?: boolean;
    /** Character threshold for processing untagged content */
    autoProcessThreshold?: number;
}

/**
 * Custom error class for tag processing errors
 */
export class TagProcessorError extends Error {
    /** Additional context information for the error */
    context: Record<string, any>;

    /**
     * Create a new TagProcessorError
     * 
     * @param message - Error message
     * @param context - Additional context for the error
     */
    constructor(message: string, context: Record<string, any> = {}) {
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
export class FluffyTagProcessor {
    /** Map of registered tag configurations */
    private tagConfigs: Map<string, TagConfig>;
    /** Stack of currently active tags */
    private tagStack: TagContext[];
    /** Buffer for partial content */
    private partialBuffer: string[];
    /** Buffer for content outside of tags */
    private untaggedContent: string[];
    /** Whether currently inside a tag */
    private inTag: boolean;
    /** Buffer for current tag being processed */
    private currentTag: string[];
    /** Current depth in JSON objects (to avoid processing tags inside JSON) */
    private jsonDepth: number;
    /** Whether currently inside quotes */
    private inQuotes: boolean;
    /** Current quote character (' or ") */
    private quoteChar: string;
    /** Handler for content outside of tags */
    private untaggedContentHandler: ((content: string) => void) | null;
    /** Whether debug mode is enabled */
    private debug: boolean;
    /** Custom error handler */
    private errorHandler: (error: TagProcessorError) => void;
    /** Whether to automatically process untagged content */
    private autoProcessUntaggedContent: boolean;
    /** Character threshold for processing untagged content */
    private autoProcessThreshold: number;

    /**
     * Create a new FluffyTagProcessor
     * 
     * @param options - Configuration options
     */
    constructor({
        debug = false,
        errorHandler,
        autoProcessUntaggedContent = true,
        autoProcessThreshold = 20
    }: ProcessorOptions = {}) {
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
     * Default error handler implementation
     * 
     * @param error - Error object
     */
    private _defaultErrorHandler(error: TagProcessorError): void {
        if (this.debug) {
            console.error(`FluffyTagProcessor Error: ${error.message}`, error.context || '');
        }
    }

    /**
     * Log debug message if debug mode is enabled
     * 
     * @param message - Debug message
     * @param data - Optional data to log
     */
    private _debugLog(message: string, data: any = null): void {
        if (this.debug) {
            if (data !== null) {
                console.debug(`[FluffyTagProcessor] ${message}`, data);
            } else {
                console.debug(`[FluffyTagProcessor] ${message}`);
            }
        }
    }

    /**
     * Register a handler for a specific tag type
     * 
     * @param tagName - Name of the tag to handle
     * @param handler - Handler function for the tag
     * @param options - Configuration options
     * @returns This instance for chaining
     */
    public registerHandler(
        tagName: string,
        handler: (attributes: Record<string, string>, content: string) => void,
        {
            allowNested = true,
            allowsNestedOfSameType = false,
            streamContent = true,
            streamingCallback = null,
            onTagStartCallback = null,
            onTagCompleteCallback = null
        }: HandlerOptions = {}
    ): FluffyTagProcessor {
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
            streamingCallback: typeof streamingCallback === 'function' ? streamingCallback : undefined,
            allowsNestedOfSameType,
            onTagStartCallback: typeof onTagStartCallback === 'function' ? onTagStartCallback : undefined,
            onTagCompleteCallback: typeof onTagCompleteCallback === 'function' ? onTagCompleteCallback : undefined
        });

        this._debugLog(`Registered handler for tag: ${tagName}`);
        return this;
    }

    /**
     * Set a handler for content outside of tags
     * 
     * @param handler - Handler function or null to disable
     * @returns This instance for chaining
     */
    public setUntaggedContentHandler(handler: ((content: string) => void) | null): FluffyTagProcessor {
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
     * @param threshold - Number of characters to accumulate before processing
     * @returns This instance for chaining
     */
    public setAutoProcessThreshold(threshold: number): FluffyTagProcessor {
        if (typeof threshold !== 'number' || threshold < 1) {
            throw new TagProcessorError('Threshold must be a positive number');
        }
        
        this.autoProcessThreshold = threshold;
        return this;
    }

    /**
     * Process accumulated untagged content
     * 
     * @param content - Content to process
     */
    private _processUntaggedContent(content: string): void {
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
     * @param tokens - Array of tokens to process
     * @returns This instance for chaining
     */
    public processTokens(tokens: string[]): FluffyTagProcessor {
        if (!Array.isArray(tokens)) {
            throw new TagProcessorError('Tokens must be an array');
        }
        
        tokens.forEach(token => this.processToken(token));
        return this;
    }

    /**
     * Process a complete string as a single token
     * 
     * @param content - String content to process
     * @returns This instance for chaining
     */
    public processString(content: string): FluffyTagProcessor {
        if (typeof content !== 'string') {
            throw new TagProcessorError('Content must be a string');
        }
        
        this.processToken(content);
        return this;
    }

    /**
     * Process incoming tokens
     * 
     * @param token - Token to process
     * @returns This instance for chaining
     */
    public processToken(token: string): FluffyTagProcessor {
        if (!token || !token.trim()) {
            return this; // Skip empty or whitespace-only tokens
        }

        try {
            this._processTokenInternal(token);
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error(String(error));
            
            this.errorHandler(new TagProcessorError('Error processing token', {
                originalError: errorObj,
                token: token.slice(0, 50) + (token.length > 50 ? '...' : '')
            }));
        }
        
        return this;
    }

    /**
     * Internal token processing logic
     * 
     * @param token - Token to process
     */
    private _processTokenInternal(token: string): void {
        for (const char of token) {
            this._processChar(char);
        }
    }
    
    /**
     * Process a single character
     * 
     * @param char - Character to process
     */
    private _processChar(char: string): void {
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
                        const errorObj = error instanceof Error ? error : new Error(String(error));
                        
                        this.errorHandler(new TagProcessorError('Error in streaming callback', {
                            originalError: errorObj,
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
     * @param tagContent - Complete tag content
     */
    private _processCompleteTag(tagContent: string): void {
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
     * @param attrText - Attribute text to parse
     * @returns Dictionary of parsed attributes
     */
    private _parseAttributes(attrText: string): Record<string, string> {
        const attributes: Record<string, string> = {};
        
        if (!attrText) {
            return attributes;
        }

        // Match both single and double quoted attributes
        const attrRegex = /(\w+)\s*=\s*(['"])((?:(?!\2).)*)\2/g;
        let match: RegExpExecArray | null;
        
        while ((match = attrRegex.exec(attrText)) !== null) {
            const [, key, , value] = match;
            attributes[key] = value;
        }
        
        return attributes;
    }

    /**
     * Handle an opening tag
     * 
     * @param tagName - Name of the tag
     * @param attributes - Tag attributes
     */
    private _handleOpeningTag(tagName: string, attributes: Record<string, string>): void {
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

        const context: TagContext = {
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
                const errorObj = error instanceof Error ? error : new Error(String(error));
                
                this.errorHandler(new TagProcessorError('Error in onTagStartCallback', {
                    originalError: errorObj,
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
     * @param tagName - Name of the tag
     * @param attributes - Tag attributes
     */
    private _handleSelfClosingTag(tagName: string, attributes: Record<string, string>): void {
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
                const errorObj = error instanceof Error ? error : new Error(String(error));
                
                this.errorHandler(new TagProcessorError('Error in onTagStartCallback', {
                    originalError: errorObj,
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
            const errorObj = error instanceof Error ? error : new Error(String(error));
            
            this.errorHandler(new TagProcessorError('Error in tag handler', {
                originalError: errorObj,
                tagName,
                attributes
            }));
        }

        // Call onTagCompleteCallback if defined
        if (config.onTagCompleteCallback) {
            try {
                config.onTagCompleteCallback(tagName, attributes, "");
            } catch (error) {
                const errorObj = error instanceof Error ? error : new Error(String(error));
                
                this.errorHandler(new TagProcessorError('Error in onTagCompleteCallback', {
                    originalError: errorObj,
                    tagName,
                    attributes
                }));
            }
        }
    }

    /**
     * Handle a closing tag
     * 
     * @param tagName - Name of the tag
     */
    private _handleClosingTag(tagName: string): void {
        if (!this.tagStack.length) {
            this.errorHandler(new TagProcessorError(
                `Found closing tag "${tagName}" but no opening tags in stack`, 
                { tagName }
            ));
            return;
        }

        const lastTag = this.tagStack[this.tagStack.length - 1];
        if (lastTag.name === tagName) {
            const context = this.tagStack.pop()!;
            const content = context.content.join('');

            this._debugLog(`Completed tag: ${tagName}`);

            // Invoke main handler
            if (context.config?.handler) {
                try {
                    context.config.handler(context.attributes, content);
                } catch (error) {
                    const errorObj = error instanceof Error ? error : new Error(String(error));
                    
                    this.errorHandler(new TagProcessorError('Error in tag handler', {
                        originalError: errorObj,
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
                    const errorObj = error instanceof Error ? error : new Error(String(error));
                    
                    this.errorHandler(new TagProcessorError('Error in onTagCompleteCallback', {
                        originalError: errorObj,
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
     * @returns This instance for chaining
     */
    public reset(): FluffyTagProcessor {
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
     * @returns This instance for chaining
     */
    public flush(): FluffyTagProcessor {
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
     * @returns Current stack depth
     */
    public getStackDepth(): number {
        return this.tagStack.length;
    }

    /**
     * Check if currently inside a specific tag
     * 
     * @param tagName - Tag name to check
     * @returns Whether inside the specified tag
     */
    public isInsideTag(tagName: string): boolean {
        return this.tagStack.some(context => context.name === tagName);
    }

    /**
     * Get information about pending unprocessed tags
     * 
     * @returns Array of tag information objects
     */
    public getPendingTagInfo(): Array<{name: string, startTime: Date}> {
        return this.tagStack.map(context => ({
            name: context.name,
            startTime: context.startTime
        }));
    }
}