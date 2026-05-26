import OpenAI from "openai";

import {
  ChatMessage,
  ToolDefinition,
  LLMProvider,
  LLMResponse,
} from "../core/types.js";

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string, baseURL?: string) {
    this.model = model;

    this.client = new OpenAI({
      apiKey,
      baseURL,
    });
  }

  async generate(
    messages: ChatMessage[],
    tools?: ToolDefinition[],
  ): Promise<LLMResponse> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,

      tools: tools?.map((tool) => ({
        type: "function",

        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.input_schema,
        },
      })),
    });

    const msg = response.choices[0].message;

    if (msg.tool_calls?.length) {
      const tool = msg.tool_calls[0];

      return {
        toolCall: {
          name: tool.function.name,

          arguments: JSON.parse(tool.function.arguments),
        },
      };
    }

    return {
      text: msg.content || "",
    };
  }
}
