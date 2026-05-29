#!/usr/bin/env node
import dotenv from "dotenv";
import { spawn } from "child_process";

dotenv.config();

const command = process.argv[2];

switch (command) {
  case "dev": {
    const child = spawn(
      "npx",

      //   ["tsx", "watch", "src/index.ts"],
      [
        "tsx",
        "watch",

        "--clear-screen=false",

        "--ignore",
        "build",

        "--ignore",
        "tools",

        "--ignore",
        ".git",

        "src/index.ts",
      ],

      {
        stdio: "inherit",
        shell: true,
      },
    );

    child.on("close", (code) => {
      process.exit(code || 0);
    });

    break;
  }

  case "start": {
    await import("../index.js");

    break;
  }

  default:
    console.log(`
            Create-Agent CLI
            
            Commands:
                create-agent dev
                create-agent start
            `);
}
