export * from "./core/index.js";
export * from "./providers/index.js";
export * from "./tools/index.js";
export * from "./mcp/index.js";

import readline from "readline/promises";
import { loadConfig } from "./core/load-config.js";
import { createProvider } from "./providers/factory.js";
import { ToolRegistry } from "./tools/registry.js";
import { MCPClient } from "./mcp/client.js";
import { loadMCPTools } from "./mcp/transport.js";
import { AgentRuntime } from "./core/runtime.js";
import { loadTools } from "./tools/load-tools.js";

const config = await loadConfig();

const provider = createProvider(config.provider);

const registry = new ToolRegistry();

const mcp = new MCPClient();

await mcp.connect(config.mcp.server);

const tools = await loadTools();
// const tools = await loadMCPTools(mcp);

for (const tool of tools) {
  registry.register(tool);
}

const runtime = new AgentRuntime(provider, registry);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Create-Agent ready");

while (true) {
  const query = await rl.question("\nQuery: ");

  if (query.toLowerCase() === "quit") {
    break;
  }

  const result = await runtime.run(query);

  console.log("\n" + result);
}
