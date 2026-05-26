import { AgentTool } from "../core/types.js";
import { MCPClient } from "./client.js";

export async function loadMCPTools(mcp: MCPClient): Promise<AgentTool[]> {
  const tools = await mcp.listTools();

  return tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    schema: tool.inputSchema,

    handler: async (args) => {
      const result = await mcp.callTool(tool.name, args);

      const content = result.content as any[]

      return content.map((x: any) => x.text).join("\\n");
    },
  }));
}
