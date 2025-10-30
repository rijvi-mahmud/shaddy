import { NextRequest } from 'next/server'
import { createMCPServer } from '@/lib/mcp/server'
import { HTTPServerTransport } from '@/lib/mcp/http-transport'
import { JSONRPCRequest } from '@modelcontextprotocol/sdk/types.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * MCP Server endpoint using Server-Sent Events (SSE)
 * This allows AI agents to connect to the project context server
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate JSON-RPC request
    if (!body.jsonrpc || !body.method) {
      return new Response(
        JSON.stringify({
          jsonrpc: '2.0',
          error: {
            code: -32600,
            message: 'Invalid Request',
          },
          id: body.id || null,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Create a readable stream for SSE
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Create MCP server instance
          const server = createMCPServer()

          // Create HTTP transport with the controller
          const writer = new WritableStream<Uint8Array>({
            write(chunk) {
              controller.enqueue(chunk)
            },
            close() {
              controller.close()
            },
          }).getWriter()

          const transport = new HTTPServerTransport(writer)

          // Connect server to transport
          await server.connect(transport)

          // Process the incoming request
          await transport.processRequest(body as JSONRPCRequest)

          // Close the connection after response
          await writer.close()
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error'
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                jsonrpc: '2.0',
                error: {
                  code: -32603,
                  message: `Internal error: ${errorMessage}`,
                },
                id: body.id || null,
              })}\n\n`
            )
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32700,
          message: `Parse error: ${errorMessage}`,
        },
        id: null,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

/**
 * GET endpoint to provide server information
 */
export async function GET() {
  return new Response(
    JSON.stringify({
      name: 'Shaddy MCP Server',
      version: '1.0.0',
      description: 'Model Context Protocol server for Shaddy project',
      protocol: 'mcp/1.0',
      transport: 'http+sse',
      capabilities: {
        tools: {
          list_files: 'List files in the project',
          read_file: 'Read file contents',
          search_code: 'Search code patterns',
          get_project_structure: 'Get project directory structure',
          get_registry: 'Get Shaddy component/hook registry',
        },
      },
      endpoints: {
        mcp: '/api/mcp (POST)',
        info: '/api/mcp (GET)',
      },
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
