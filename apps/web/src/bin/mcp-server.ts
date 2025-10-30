#!/usr/bin/env node

/**
 * MCP Server CLI entry point
 * This allows the server to be run via stdio for desktop applications
 */

import { runStdioServer } from '../lib/mcp/server.js'

runStdioServer().catch((error) => {
  console.error('MCP Server error:', error)
  process.exit(1)
})
