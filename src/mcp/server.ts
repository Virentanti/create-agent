import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0",
});

server.registerTool(
  "echo",

  {
    title: "Echo Tool",
    description: "Echo back text",
    inputSchema: {
      text: z.string(),
    },
  },

  async ({ text }) => {
    return {
      content: [
        {
          type: "text",
          text: `Echo ${text}`,
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("MCP server running");
