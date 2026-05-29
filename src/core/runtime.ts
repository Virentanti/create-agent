import { ChatMessage, LLMProvider, ToolDefinition } from "./types.js";
import { Planner } from "./planner.js";
import { ToolRegistry } from "../tools/registry.js";

export class AgentRuntime {
  private messages: ChatMessage[] = [];
  private planner: Planner;
  private maxIteration = 10;

  constructor(private provider: LLMProvider, private registry: ToolRegistry) {
    this.planner = new Planner(provider);
  }

  async run(query: string): Promise<string> {
    this.messages.push({
      role: "user",
      content: query,
    });

    let iterations = 0;

    while (true) {
      iterations++;

      if (iterations > this.maxIteration) {
        throw new Error("Max iterations exceeded");
      }
      const tools: ToolDefinition[] = this.registry.list().map((tool) => ({
        name: tool.name,
        description: tool.description,
        input_schema: tool.schema,
      }));

      const response = await this.planner.nextStep(query, this.messages, tools);

    //   console.dir(response, {
    //     depth: null,
    //   });

      //   console.log("\nPlanner response:", response);

      if (response.text !== undefined) {
        this.messages.push({
          role: "assistant",
          content: response.text,
        });

        return response.text;
      }

      if (response.toolCall !== undefined) {
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

          content: response.text!,
        });
        continue;
      }

      return "No response generated";
    }
  }

  async stream(query: string) {
    const result = await this.run(query);
    console.log("Stream result", result);

    for (const char of result) {
      process.stdout.write(char);

      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    process.stdout.write("\n");
    // this.messages.push({
    //     role: "user",
    //     content: query,
    // })

    // const tools = this.registry.list().map(
    //     tool =>({
    //         name: tool.name,
    //         description: tool.description,
    //         input_schema: tool.schema
    //     })
    // )

    // let finalText = ""

    // for await (
    //     const chunk of this.provider.stream(
    //         this.messages,
    //         tools,
    //     )
    // ){
    //     process.stdout.write(
    //         chunk.content
    //     )

    //     finalText +=chunk.content
    // }

    // // process.stdout.write("\n")

    // this.messages.push({
    //     role: "assistant",
    //     content: finalText
    // })
  }

  clearMemory() {
    this.messages = [];
  }

  getMessage() {
    return this.messages;
  }
}
