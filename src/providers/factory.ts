import { ProviderConfig } from "../core/config.js";
import { OpenAIProvider } from "./openai.js";

export function createProvider(config: ProviderConfig) {
  switch (config.type) {
    case "openrouter":
      return new OpenAIProvider(config.apiKey!, config.model, config.baseURL);

    default:
      throw new Error(`Unknown provider: ${config.type}`);
  }
}
