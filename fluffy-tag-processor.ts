interface TagConfig {
    handler: (attributes: Record<string, string>, content: string) => void;
    streamContent: boolean;
    processNested: boolean;
    streamingCallback?: (char: string, attributes: Record<string, string>) => void;
    allowsNestedOfSameType: boolean;
    onTagCompleteCallback?: (tagName: string, attributes: Record<string, string>, content: string) => void;
}

interface TagContext {
    name: string;
    attributes: Record<string, string>;
    content: string[];
    parent: TagContext | null;
    startTime: Date;
    isCollecting: boolean;
    config: TagConfig | null;
}

interface HandlerOptions {
    allowNested?: boolean;
    allowsNestedOfSameType?: boolean;
    streamContent?: boolean;
    streamingCallback?: (char: string, attributes: Record<string, string>) => void;
    onTagCompleteCallback?: (tagName: string, attributes: Record<string, string>, content: string) => void;
}

class FluffyTagProcessor {
    private tagConfigs: Map<string, TagConfig>;
    private tagStack: TagContext[];
    private partialBuffer: string[];
    private untaggedContent: string[];
    private inTag: boolean;
    private currentTag: string[];
    private jsonDepth: number;
    private inQuotes: boolean;
    private untaggedContentHandler: ((content: string) => void) | null;

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
     */
    public registerHandler(
        tagName: string,
        handler: (attributes: Record<string, string>, content: string) => void,
        {
            allowNested = true,
            allowsNestedOfSameType = false,
            streamContent = true,
            streamingCallback = null,
            onTagCompleteCallback = null
        }: HandlerOptions = {}
    ): void {
        this.tagConfigs.set(tagName, {
            handler,
            streamContent,
            processNested: allowNested,
            streamingCallback,
            allowsNestedOfSameType,
            onTagCompleteCallback
        });
    }

    /**
     * Set a handler for content outside of tags
     */
    public setUntaggedContentHandler(handler: ((content: string) => void) | null): void {
        this.untaggedContentHandler = handler;
    }

    /**
     * Process accumulated untagged content
     */
    private _processUntaggedContent(content: string): void {
        if (content.trim() && this.untaggedContentHandler) {
            this.untaggedContentHandler(content);
        }
    }

    /**
     * Process incoming tokens
     */
    public processToken(token: string): void {
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
     */
    private _processCompleteTag(tagContent: string): void {
        tagContent = tagContent.trim();

        if (tagContent.startsWith('</')) {
            const tagName = tagContent.slice(2, -1).trim();
            this._handleClosingTag(tagName);
        } else {
            tagContent = tagContent.slice(1, -1);
            const [tagName, ...rest] = tagContent.split(/\s+/);
            const attributes: Record<string, string> = {};

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
     */
    private _handleOpeningTag(tagName: string, attributes: Record<string, string>): void {
        const config = this.tagConfigs.get(tagName);
        if (!config) {
            console.warn(`⚠️ Warning: Unregistered tag type: ${tagName}`);
            return;
        }

        const context: TagContext = {
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
     */
    private _handleClosingTag(tagName: string): void {
        if (!this.tagStack.length) {
            console.warn(`⚠️ Warning: Found closing tag ${tagName} but no opening tags in stack`);
            return;
        }

        const lastTag = this.tagStack[this.tagStack.length - 1];
        if (lastTag.name === tagName) {
            const context = this.tagStack.pop()!;
            const content = context.content.join('').trim();

            // Main handler
            if (context.config?.handler) {
                context.config.handler(context.attributes, content);
            }

            // onTagCompleteCallback
            if (context.config?.onTagCompleteCallback) {
                context.config.onTagCompleteCallback(tagName, context.attributes, content);
            }
        } else {
            console.warn(`⚠️ Warning: Mismatched closing tag: expected ${lastTag.name}, got ${tagName}`);
        }
    }
}

export default FluffyTagProcessor;
