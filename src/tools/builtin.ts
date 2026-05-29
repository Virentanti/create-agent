import { AgentTool } from "../core/types.js";
import echoTool from "./echo.js"

export function loadBuiltinTools(): AgentTool[] {
    return [
        echoTool
    ]
}