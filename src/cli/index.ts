#!/usr/bin/env node
import dotenv from "dotenv";

dotenv.config();

const command = process.argv[2];

switch (command) {
  case "dev":
    await import("../index.js");

    break;

  case "inspect":
    console.log("INspect mode coming soon");

    break;

  default:
    console.log(`
            Create_agent CLI
            
            commands:
            
            create-agent dev
            create-agent inspect`);
}
