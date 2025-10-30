# Shaddy MCP Server - Developer Guide

The Shaddy project provides a **public MCP (Model Context Protocol) server** that allows AI agents and developers worldwide to explore and interact with the Shaddy component library.

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI assistants to connect to external data sources and tools. The Shaddy MCP server exposes the project's codebase, component registry, and documentation to any AI agent that supports MCP.

## Public Endpoint

**Production URL:** `https://shaddy-docs.vercel.app/api/mcp`

This endpoint is publicly accessible and provides read-only access to:
- The deployed Shaddy codebase
- Component and hook registry
- Project file structure
- Code search capabilities

## Available Tools

The MCP server provides 5 powerful tools:

### 1. **list_files**
List files in the deployed project with optional glob pattern filtering.

```json
{
  "directory": "apps/web/src/components",
  "pattern": "**/*.tsx"
}
```

### 2. **read_file**
Read the contents of any file in the deployed project.

```json
{
  "path": "apps/web/src/lib/mcp/server.ts"
}
```

### 3. **search_code**
Search for code patterns across the project with regex support.

```json
{
  "query": "useState",
  "filePattern": "**/*.tsx",
  "caseSensitive": false
}
```

### 4. **get_project_structure**
Get the directory tree structure of the project.

```json
{
  "depth": 3
}
```

### 5. **get_registry**
Get the Shaddy component/hook registry with metadata, dependencies, and file paths.

```json
{
  "category": "hooks"
}
```

Categories: `all`, `hooks`, `components`, `utilities`

## Usage Examples

### Testing with cURL

```bash
# Get server information
curl https://shaddy-docs.vercel.app/api/mcp

# List all available tools
curl -X POST https://shaddy-docs.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "id": 1
  }'

# Get all hooks from the registry
curl -X POST https://shaddy-docs.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "get_registry",
      "arguments": {
        "category": "hooks"
      }
    },
    "id": 2
  }'

# Search for a specific hook
curl -X POST https://shaddy-docs.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "search_code",
      "arguments": {
        "query": "useBoolean",
        "filePattern": "**/*.ts"
      }
    },
    "id": 3
  }'
```

### Using with AI Assistants

#### Claude Desktop

Add to your Claude Desktop configuration:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "shaddy": {
      "url": "https://shaddy-docs.vercel.app/api/mcp",
      "transport": "http"
    }
  }
}
```

#### Web-Based AI Tools

Any web-based AI tool that supports MCP can connect to:
```
https://shaddy-docs.vercel.app/api/mcp
```

Use POST requests with JSON-RPC 2.0 format.

### Integration Examples

#### JavaScript/TypeScript

```typescript
async function queryShaddyMCP(method: string, params?: any) {
  const response = await fetch('https://shaddy-docs.vercel.app/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id: Date.now(),
    }),
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        console.log(data);
      }
    }
  }
}

// Example: Get all components
await queryShaddyMCP('tools/call', {
  name: 'get_registry',
  arguments: { category: 'components' }
});
```

#### Python

```python
import requests
import json

def query_shaddy_mcp(method, params=None):
    url = "https://shaddy-docs.vercel.app/api/mcp"
    payload = {
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": 1
    }

    response = requests.post(url, json=payload, stream=True)

    for line in response.iter_lines():
        if line and line.startswith(b'data: '):
            data = json.loads(line[6:])
            print(data)

# Example: List TypeScript files
query_shaddy_mcp('tools/call', {
    'name': 'list_files',
    'arguments': {'pattern': '**/*.ts'}
})
```

## Use Cases

### For Developers

- **Explore Components:** Browse available hooks and UI components
- **Code Examples:** Search for implementation patterns and examples
- **Documentation:** Read source code and understand component APIs
- **Integration:** Learn how to use Shaddy components in your project

### For AI Agents

- **Context-Aware Assistance:** Provide accurate help based on actual Shaddy code
- **Code Generation:** Generate code that matches Shaddy patterns
- **Documentation:** Answer questions about Shaddy components
- **Discovery:** Help developers find the right components for their needs

## Technical Details

### Architecture

- **Protocol:** JSON-RPC 2.0 over HTTP
- **Transport:** Server-Sent Events (SSE)
- **Runtime:** Next.js API Routes on Vercel
- **Timeout:** 60 seconds per request

### Security

- **Read-Only Access:** The server provides only read access to the deployed codebase
- **Filtered Paths:** Sensitive directories (`node_modules`, `.git`, etc.) are excluded
- **Path Validation:** All file paths are validated to prevent directory traversal
- **Public Data:** Only deployed, public project files are accessible

### Limitations

- **Deployed Files Only:** Access is limited to files in the Vercel deployment
- **No Write Access:** The server is read-only
- **Rate Limits:** Subject to Vercel's serverless function limits
- **Timeout:** Long-running operations timeout after 60 seconds

## API Reference

### JSON-RPC Format

All requests follow JSON-RPC 2.0:

```json
{
  "jsonrpc": "2.0",
  "method": "tools/list" | "tools/call",
  "params": { ... },
  "id": number
}
```

### Response Format (SSE)

```
data: {"jsonrpc":"2.0","result":{...},"id":1}
```

### Error Response

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32600,
    "message": "Invalid Request"
  },
  "id": null
}
```

## Troubleshooting

### Connection Issues

**Problem:** Cannot connect to the endpoint
**Solution:** Verify the URL is correct: `https://shaddy-docs.vercel.app/api/mcp`

**Problem:** Request timeout
**Solution:** Queries that scan too many files may timeout. Use more specific patterns.

### Query Issues

**Problem:** No results from search
**Solution:** Check your regex pattern and file pattern. Try broader patterns first.

**Problem:** Cannot read file
**Solution:** Ensure the file path is relative to the project root and exists in the deployment.

## Support & Resources

- **MCP Documentation:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Shaddy Documentation:** [shaddy-docs.vercel.app](https://shaddy-docs.vercel.app)
- **GitHub Issues:** [github.com/yourusername/shaddy/issues](https://github.com/yourusername/shaddy/issues)
- **MCP SDK:** [github.com/modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)

## Contributing

To add new tools to the MCP server:

1. Define the tool schema in `apps/web/src/lib/mcp/server.ts`
2. Add the tool to the `tools` array with proper JSON Schema
3. Implement the handler in the `CallToolRequestSchema` switch case
4. Update this documentation
5. Deploy to Vercel

---

**Made with ❤️ by the Shaddy team**

Explore the power of AI-assisted component development!
