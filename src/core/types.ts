export type Role =
    | "system"
    | "user"
    | "tool"
    | "assistant";

export interface BaseMessage {
    content: string
}

export interface UserMessage extends BaseMessage{
    role: "user"
}

export interface AssistantMessage extends BaseMessage{
    role: "assistant"
}

export interface SystemMessage extends BaseMessage{
    role: "system"
}

export interface ToolMessage extends BaseMessage{
    role: "tool";
    tool_call_id: string;
}

export type ChatMessage = 
    | UserMessage
    | AssistantMessage
    | SystemMessage
    | ToolMessage

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

export interface StreamChunk {

    type: 
        | "text"
        | "tool_call";

    content: string;
}

export interface LLMProvider {
    generate(
        messages: ChatMessage[],
        tools?: ToolDefinition[],
    ): Promise<LLMResponse>;

    stream(
        messages: ChatMessage[],
        tools?: ToolDefinition[],
    ): AsyncGenerator<StreamChunk>;
}