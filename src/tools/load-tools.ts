import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";
import { AgentTool } from "../core/types.js";

export async function loadTools(): Promise<AgentTool[]> {
  const toolsDir = path.resolve(process.cwd(), "tools");

  const files = await fs.readdir(toolsDir);

  const tools: AgentTool[] = [];

  for (const file of files) {
    if (!file.endsWith(".js")) {
      continue;
    }

    const filePath = path.join(toolsDir, file);

    const module = await import(pathToFileURL(filePath).href);

    if (module.default) {
      tools.push(module.default);
    }
  }

  return tools;
}
