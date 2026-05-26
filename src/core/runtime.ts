import { ChatMessage, LLMProvider, ToolDefinition } from "./types.js";

import { ToolRegistry } from "../tools/registry.js";

export class AgentRuntime {
  private messages: ChatMessage[] = [];

  constructor(private provider: LLMProvider, private registry: ToolRegistry) {}

  async run(query: string): Promise<string> {
    this.messages.push({
      role: "user",
      content: query,
    });

    let iterations = 0

    while (true) {

        iterations++;

        if(iterations > 10){
            throw new Error(
                "Max agent iterations exceeded"
            )
        }
      const tools: ToolDefinition[] = this.registry.list().map((tool) => ({
        name: tool.name,
        description: tool.description,
        input_schema: tool.schema,
      }));

      const response = await this.provider.generate(this.messages, tools);

      if(response.text){
        this.messages.push({
            role: "assistant",
            content: response.text
        })

        return response.text
      }

      if (response.toolCall) {
        const tool = this.registry.get(response.toolCall.name);

        if (!tool) {
          throw new Error(`Tool not found: ${response.toolCall.name}`);
        }

        const result = await tool.handler(response.toolCall.arguments);

        this.messages.push({
          role: "assistant",
          content: `Using tool: ${tool.name}`,
        });

        this.messages.push({
          role: "user",

          content: `Tool result: ${result}`,
        });
      }
    }
  }

  clearMemory() {
    this.messages = [];
  }

  getMessage() {
    return this.messages;
  }
}
