import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class MCPClient {
  private client: Client;

  constructor() {
    this.client = new Client({
      name: "create-agent",
      version: "0.1.0",
    });
  }

  async connect(serverPath: string) {
    const transport = new StdioClientTransport({
      command: process.execPath,

      args: [serverPath],
    });

    await this.client.connect(transport);
  }

  async listTools() {
    const result = await this.client.listTools();

    return result.tools;
  }

  async callTool(name: string, args: Record<string, unknown>) {
    return await this.client.callTool({
      name,
      arguments: args,
    });
  }
}
