# MCP Server Setup Guide

This project includes a Model Context Protocol (MCP) server that exposes project context to AI agents. This allows AI assistants to explore, read, and search the codebase.

## What is MCP?

Model Context Protocol (MCP) is an open standard for connecting AI assistants to external data sources and tools. It allows AI agents to access your project's codebase intelligently.

## Available Tools

The MCP server provides the following tools:

1. **list_files** - List files in the project with optional glob patterns
2. **read_file** - Read the contents of any file in the project
3. **search_code** - Search for code patterns across the project
4. **get_project_structure** - Get the directory structure of the project
5. **get_registry** - Get the Shaddy component/hook registry with metadata, dependencies, and file paths (can filter by category: hooks, components, utilities)

## Setup Options

There are two ways to connect to the MCP server:

### Option 1: HTTP/SSE Endpoint (For Production/Remote Access)

The MCP server is exposed as a Next.js API route and can be accessed over HTTP using Server-Sent Events (SSE).

**Production Endpoint**: `https://shaddy-docs.vercel.app/api/mcp`

This method works for:

- Web-based AI clients
- Custom integrations
- Remote access to your project context

#### Testing the Production Endpoint

```bash
# Get server info (shows available tools)
curl https://shaddy-docs.vercel.app/api/mcp

# List all available tools
curl -X POST https://shaddy-docs.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "id": 1
  }'

# Get the component registry
curl -X POST https://shaddy-docs.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "get_registry",
      "arguments": {
        "category": "all"
      }
    },
    "id": 2
  }'
```

#### Using Production Endpoint with VS Code Extensions

For **Cline** or other MCP-supporting VS Code extensions, you can connect to the production endpoint:

```json
{
  "cline.mcpServers": {
    "shaddy-production": {
      "command": "pnpm",
      "args": [
        "--dir",
        "/home/rijvi/Desktop/WorkSpace/Rijvi/shaddy/apps/web",
        "mcp:http"
      ],
      "env": {
        "MCP_ENDPOINT": "https://shaddy-docs.vercel.app/api/mcp"
      }
    }
  }
}
```

This uses a bridge client that connects stdio (used by VS Code extensions) to your production HTTP endpoint.

### Option 2: Stdio Transport (For Desktop Clients)

For desktop applications like Claude Desktop, VS Code, or Windsurf, use the stdio transport.

#### Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "shaddy-project": {
      "command": "pnpm",
      "args": ["--dir", "/path/to/shaddy/apps/web", "mcp:server"]
    }
  }
}
```

Replace `/path/to/shaddy/apps/web` with the actual path to your project's web app directory.

#### VS Code / Cursor / Windsurf

For VS Code-based editors with MCP support, add to your settings.json:

```json
{
  "mcp.servers": {
    "shaddy-project": {
      "command": "pnpm",
      "args": ["--dir", "/path/to/shaddy/apps/web", "mcp:server"],
      "cwd": "/path/to/shaddy"
    }
  }
}
```

#### Cline (VS Code Extension)

If you're using the Cline extension, add this to your Cline settings:

```json
{
  "mcpServers": {
    "shaddy-project": {
      "command": "pnpm",
      "args": ["--dir", "/path/to/shaddy/apps/web", "mcp:server"]
    }
  }
}
```

## Running the MCP Server Locally

### Development Mode

```bash
cd apps/web
pnpm mcp:server
```

The server will start in stdio mode and communicate via stdin/stdout.

### Testing with MCP Inspector

You can test the MCP server using the MCP Inspector tool:

```bash
npx @modelcontextprotocol/inspector pnpm --dir /path/to/shaddy/apps/web mcp:server
```

This will open a web interface where you can test all the available tools.

## Available Commands

```bash
# Run the MCP server (stdio mode)
pnpm mcp:server

# Start Next.js dev server (includes HTTP MCP endpoint)
pnpm dev

# Build the project
pnpm build

# Start production server (includes HTTP MCP endpoint)
pnpm start
```

## Example Usage

Once connected, you can use the MCP tools through your AI assistant:

```
# List all TypeScript files
list_files(pattern="**/*.ts")

# Read a specific file
read_file(path="apps/web/src/lib/mcp/server.ts")

# Search for a function
search_code(query="createMCPServer", filePattern="**/*.ts")

# Get project structure
get_project_structure(depth=3)

# Get all available components and hooks
get_registry(category="all")

# Get only hooks
get_registry(category="hooks")

# Get only UI components
get_registry(category="components")
```

## Security Notes

- The MCP server only provides read access to the project files
- It filters out sensitive directories like `node_modules`, `.next`, `.git`
- All file paths are validated to prevent directory traversal attacks
- For HTTP endpoint, consider adding authentication for production use

## Deployment

When deployed to Vercel:

1. The HTTP endpoint will be automatically available at `/api/mcp`
2. The function has a 60-second timeout configured in `vercel.json`
3. The server operates in serverless mode on Vercel

## Troubleshooting

### "Module not found" errors

Make sure you've installed dependencies:

```bash
pnpm install
```

### "Cannot find module" when running mcp:server

Ensure you're running the command from the `apps/web` directory or using the `--dir` flag.

### HTTP endpoint not working

- Check that your Next.js app is running (`pnpm dev` or deployed)
- Verify the endpoint URL is correct
- Check browser console for CORS or network errors

### Stdio mode not connecting

- Verify the path in your MCP client configuration is correct
- Ensure pnpm is installed and in your PATH
- Try running the command manually to see error messages

## Contributing

To add new tools to the MCP server:

1. Define the tool schema in `apps/web/src/lib/mcp/server.ts`
2. Add the tool to the `tools` array
3. Implement the handler in the `CallToolRequestSchema` handler
4. Update this documentation

## Quick Start Summary

### For VS Code (using Cline extension):

**Production (connects to Vercel deployment):**

```json
{
  "cline.mcpServers": {
    "shaddy-production": {
      "command": "pnpm",
      "args": [
        "--dir",
        "/home/rijvi/Desktop/WorkSpace/Rijvi/shaddy/apps/web",
        "mcp:http"
      ],
      "env": {
        "MCP_ENDPOINT": "https://shaddy-docs.vercel.app/api/mcp"
      }
    }
  }
}
```

**Local (reads local files directly):**

```json
{
  "cline.mcpServers": {
    "shaddy-local": {
      "command": "pnpm",
      "args": [
        "--dir",
        "/home/rijvi/Desktop/WorkSpace/Rijvi/shaddy/apps/web",
        "mcp:server"
      ]
    }
  }
}
```

### For Other Tools:

**Production HTTP Endpoint:**

```
POST https://shaddy-docs.vercel.app/api/mcp
```

**Test it:**

```bash
curl https://shaddy-docs.vercel.app/api/mcp
```

## Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP SDK GitHub](https://github.com/modelcontextprotocol/sdk)
- [Claude Desktop MCP Guide](https://modelcontextprotocol.io/docs/tools/claude-desktop)
