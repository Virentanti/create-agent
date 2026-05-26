import { env } from "./build/core/env.js";

export default {
  provider: {
    type: "openrouter",
    apiKey: env.OPENROUTER_API_KEY,
    model: "deepseek/deepseek-chat-v3-0324",
    baseURL: "https://openrouter.ai/api/v1",
  },

  mcp: {
    server: "build/mcp/server.js",
  },
};
