export interface ProviderConfig {

    type: string;
    apiKey?: string;
    model: string;
    baseURL?: string;
}

export interface MCPConfig {
    server: string;
}

export interface AgentConfig {
    provider: ProviderConfig;
    mcp: MCPConfig
}