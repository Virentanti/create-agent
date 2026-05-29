import { ChatMessage, LLMProvider, ToolDefinition } from "./types.js";

export class Planner {
  constructor(private provider: LLMProvider) {}

  async nextStep(
    objective: string,
    history: ChatMessage[],
    tools: ToolDefinition[],
  ) {
    const planningPrompt = `
        You are an autonomous AI agent.

        Your job is to COMPLETE the user's goal.

        IMPORTANT RULES:

        - If a tool can help, you MUST use it.
        - Do NOT explain tools.
        - Do NOT describe what you would do.
        - ACT using tools.
        - Only answer directly if no tool is needed.

        When tool results are provided:
        - analyze them
        - decide next action
        - continue until task is complete

        Be concise and action-oriented.
        
        Goal:
        ${objective}
        
        Decide carefully
        `;

    return await this.provider.generate(
      [
        {
          role: "system",
          content: planningPrompt,
        },
        ...history,
      ],

      tools,
    );
  }
}
