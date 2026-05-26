import path from "path";
import { pathToFileURL } from "url";
import { AgentConfig } from "./config.js";

export async function loadConfig(): Promise<AgentConfig> {
  const configPath = path.resolve(process.cwd(), "agent.config.js");

  const configModule = await import(pathToFileURL(configPath).href);

  return configModule.default;
}
