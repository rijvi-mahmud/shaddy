import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
import {
  JSONRPCMessage,
  JSONRPCRequest,
} from '@modelcontextprotocol/sdk/types.js'

/**
 * HTTP-based transport for MCP server using Server-Sent Events
 * This allows the MCP server to work over HTTP, perfect for Next.js API routes
 */
export class HTTPServerTransport implements Transport {
  private messageQueue: JSONRPCMessage[] = []
  private messageHandler?: (message: JSONRPCMessage) => Promise<void>
  private closeHandler?: () => void
  private errorHandler?: (error: Error) => void
  private encoder = new TextEncoder()

  constructor(
    private readonly writer: WritableStreamDefaultWriter<Uint8Array>
  ) {}

  async start(): Promise<void> {
    // Transport is ready immediately for HTTP
  }

  async send(message: JSONRPCMessage): Promise<void> {
    const data = `data: ${JSON.stringify(message)}\n\n`
    await this.writer.write(this.encoder.encode(data))
  }

  async close(): Promise<void> {
    await this.writer.close()
    if (this.closeHandler) {
      this.closeHandler()
    }
  }

  onMessage(handler: (message: JSONRPCMessage) => Promise<void>): void {
    this.messageHandler = handler
  }

  onClose(handler: () => void): void {
    this.closeHandler = handler
  }

  onError(handler: (error: Error) => void): void {
    this.errorHandler = handler
  }

  async processRequest(request: JSONRPCRequest): Promise<void> {
    if (this.messageHandler) {
      await this.messageHandler(request)
    }
  }
}
