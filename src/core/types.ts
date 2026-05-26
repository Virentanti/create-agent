export type Role =
    | "system"
    | "user"
    | "assistant";

export interface ChatMessage {
    role: Role;
    content: string;
}

export interface ToolDefinition {
    name: string;
    description?: string;

    input_schema: {
        type: string;
        properties?: Record<string, unknown>;
        required?: string[];
    };
}

export interface ToolCall {
    name: string;
    arguments: Record<string, unknown>;
}

export interface LLMResponse {
    text?: string;
    toolCall?: ToolCall
}

export interface LLMProvider {

    generate(
        messages: ChatMessage[],
        tools?: ToolDefinition[],
    ): Promise<LLMResponse>;
}

export interface AgentTool{
    name: string;
    description?: string;

    schema: any;

    handler: (
        args: Record< string, unknown>
    ) => Promise<string>;
}