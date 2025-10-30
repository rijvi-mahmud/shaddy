#!/usr/bin/env node

/**
 * MCP HTTP Client - Bridges stdio transport to HTTP endpoint
 * This allows MCP clients (Claude Desktop, Cline, etc.) to connect to the production server
 */

import * as readline from 'readline'
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js'

const MCP_ENDPOINT =
  process.env.MCP_ENDPOINT || 'https://shaddy-docs.vercel.app/api/mcp'

/**
 * Sends a JSON-RPC message to the HTTP endpoint and returns the response
 */
async function sendToHTTP(message: JSONRPCMessage): Promise<void> {
  try {
    const response = await fetch(MCP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    // Read SSE stream
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error('No response body')
    }

    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          try {
            const parsed = JSON.parse(data)
            // Write response to stdout
            process.stdout.write(JSON.stringify(parsed) + '\n')
          } catch (e) {
            console.error('Failed to parse SSE message:', e)
          }
        }
      }
    }
  } catch (error) {
    console.error('HTTP request failed:', error)
    process.exit(1)
  }
}

/**
 * Stdio server that forwards requests to HTTP endpoint
 */
async function runHTTPBridge() {
  console.error(`MCP HTTP Bridge starting...`)
  console.error(`Endpoint: ${MCP_ENDPOINT}`)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })

  rl.on('line', async (line) => {
    try {
      const message = JSON.parse(line) as JSONRPCMessage
      await sendToHTTP(message)
    } catch (error) {
      console.error('Failed to process message:', error)
    }
  })

  rl.on('close', () => {
    process.exit(0)
  })

  console.error('MCP HTTP Bridge ready')
}

runHTTPBridge().catch((error) => {
  console.error('MCP HTTP Bridge error:', error)
  process.exit(1)
})
