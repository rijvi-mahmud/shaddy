#!/usr/bin/env node

/**
 * @shaddy/mcp - Universal MCP Client for Shaddy
 *
 * Bridges stdio (used by MCP clients) to Shaddy's production HTTP endpoint.
 * Works with Claude Code, Cursor, VS Code, Codex, and any MCP-compatible client.
 */

import * as readline from "readline";
import { stdin, stdout, stderr } from "process";

// ============================================================================
// Configuration
// ============================================================================

const MCP_ENDPOINT =
  process.env.SHADDY_MCP_ENDPOINT || "https://shaddy-docs.vercel.app/api/mcp";

// ============================================================================
// Main Bridge Implementation
// ============================================================================

/**
 * Sends a JSON-RPC message to the HTTP endpoint and streams back the response
 */
async function sendToHTTP(message: any): Promise<void> {
  try {
    const response = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Read SSE stream from production endpoint
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("No response body from server");
    }

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          try {
            const parsed = JSON.parse(data);
            // Write JSON-RPC response to stdout for MCP client
            stdout.write(JSON.stringify(parsed) + "\n");
          } catch (e) {
            stderr.write(`Failed to parse SSE message: ${e}\n`);
          }
        }
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    stderr.write(`HTTP request failed: ${errorMessage}\n`);

    // Send error response to MCP client
    const errorResponse = {
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: errorMessage,
      },
      id: message.id || null,
    };
    stdout.write(JSON.stringify(errorResponse) + "\n");
  }
}

/**
 * Main function - sets up stdio interface
 */
async function main() {
  stderr.write("Shaddy MCP Client starting...\n");
  stderr.write(`Endpoint: ${MCP_ENDPOINT}\n`);
  stderr.write("Waiting for JSON-RPC messages on stdin...\n");

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    terminal: false,
  });

  rl.on("line", async (line) => {
    try {
      const message = JSON.parse(line);
      await sendToHTTP(message);
    } catch (error) {
      stderr.write(`Failed to process message: ${error}\n`);
    }
  });

  rl.on("close", () => {
    stderr.write("Shaddy MCP Client shutting down...\n");
    process.exit(0);
  });

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    stderr.write("\nReceived SIGINT, shutting down...\n");
    rl.close();
  });

  process.on("SIGTERM", () => {
    stderr.write("\nReceived SIGTERM, shutting down...\n");
    rl.close();
  });
}

// ============================================================================
// Entry Point
// ============================================================================

main().catch((error) => {
  stderr.write(`Fatal error: ${error}\n`);
  process.exit(1);
});
