# Shaddy MCP Server - Quick Start Guide

Connect any AI agent to explore the Shaddy component library using Model Context Protocol (MCP).

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open standard that allows AI assistants to connect to external data sources. The Shaddy MCP server lets AI agents explore components, hooks, and code from the Shaddy library.

## Quick Start

Choose your AI client and add the configuration below. All clients use the **same command**:

```bash
npx shaddy-mcp
```

### Claude Code

Add to `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "shaddy": {
      "command": "npx",
      "args": ["shaddy-mcp"]
    }
  }
}
```

Restart Claude Code and run `/mcp` to verify the connection.

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "shaddy": {
      "command": "npx",
      "args": ["shaddy-mcp"]
    }
  }
}
```

Enable the shaddy server in Cursor Settings.

### VS Code (with GitHub Copilot)

Add to `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "shaddy": {
      "command": "npx",
      "args": ["shaddy-mcp"]
    }
  }
}
```

Open `.vscode/mcp.json` and click **Start** next to the shaddy server.

### Codex

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.shaddy]
command = "npx"
args = ["@shaddy/mcp"]
```

Restart Codex to load the server.

---

## Available Tools

Once connected, your AI assistant can use these tools:

### 1. **get_registry**
Browse all Shaddy components, hooks, and utilities.

**Example prompts:**
- "Show me all available hooks in Shaddy"
- "What components are in the Shaddy registry?"
- "List all form components"

### 2. **search_code**
Search for patterns across the codebase.

**Example prompts:**
- "Find the useLocalStorage implementation"
- "Search for form validation examples"
- "Show me how to use the Button component"

### 3. **read_file**
Read source code from the project.

**Example prompts:**
- "Show me the useBoolean hook source code"
- "Read the form component implementation"

### 4. **list_files**
List files with optional filtering.

**Example prompts:**
- "List all TypeScript files"
- "Show me files in the hooks directory"

### 5. **get_project_structure**
View the directory structure.

**Example prompts:**
- "Show me the project structure"
- "What's in the components directory?"

---

## Example Prompts

Try these with your AI assistant:

### Discovery
- "What hooks are available in Shaddy?"
- "Show me all form field components"
- "List all UI components in the registry"

### Implementation Help
- "How do I use the useDebounce hook?"
- "Show me an example of the DatePicker component"
- "What props does the Button component accept?"

### Code Search
- "Find examples of form validation"
- "Search for useState usage in hooks"
- "Show me how to handle form submission"

### Architecture
- "Show me the project structure"
- "What's in the form components directory?"
- "List all hook files"

---

## How It Works

```
┌─────────────────┐       stdin/stdout       ┌────────────────┐
│  Your AI Client │ ◄────────────────────► │  @shaddy/mcp   │
│ (Claude, Cursor)│                         │   (npm pkg)    │
└─────────────────┘                         └────────────────┘
                                                     │
                                                     │ HTTP/SSE
                                                     ▼
                                            ┌─────────────────┐
                                            │   Vercel Edge   │
                                            │  MCP Endpoint   │
                                            └─────────────────┘
                                                     │
                                                     │
                                                     ▼
                                            ┌─────────────────┐
                                            │ Shaddy Registry │
                                            │   Components    │
                                            │      Hooks      │
                                            │    Utilities    │
                                            └─────────────────┘
```

1. **AI Client** sends requests via stdio (standard input/output)
2. **@shaddy/mcp** bridges stdio to HTTP
3. **Production Endpoint** processes requests from Vercel
4. **Registry Data** is returned to your AI assistant

---

## Advanced Configuration

### Custom Endpoint

To use a different endpoint (self-hosted, staging, etc.):

```json
{
  "mcpServers": {
    "shaddy": {
      "command": "npx",
      "args": ["shaddy-mcp"],
      "env": {
        "SHADDY_MCP_ENDPOINT": "https://your-endpoint.com/api/mcp"
      }
    }
  }
}
```

### Local Development

To test with a local server:

```json
{
  "mcpServers": {
    "shaddy-local": {
      "command": "npx",
      "args": ["shaddy-mcp"],
      "env": {
        "SHADDY_MCP_ENDPOINT": "http://localhost:3000/api/mcp"
      }
    }
  }
}
```

---

## Troubleshooting

### "Command not found" or "Module not found"

The first time `npx shaddy-mcp` runs, it downloads the package. If this fails:

1. Check your internet connection
2. Try: `npx clear-npx-cache`
3. Manually install: `npm install -g shaddy-mcp`

### MCP Server Not Responding

1. **Restart your AI client** after adding configuration
2. **Check logs** (in Cursor: View → Output → MCP: project-*)
3. **Verify the config file exists** in the correct location
4. **Test the endpoint** manually:
   ```bash
   curl https://shaddy-docs.vercel.app/api/mcp
   ```

### Connection Timeout

The production endpoint has a 60-second timeout. If queries timeout:

1. Use more specific search patterns
2. Narrow file patterns (e.g., `**/*.tsx` instead of `**/*`)
3. Break large queries into smaller ones

### No Tools Available

If you see "No tools or prompts":

1. Clear npx cache: `npx clear-npx-cache`
2. Re-enable the server in your client settings
3. Check that `@shaddy/mcp` package is published and accessible

---

## Direct API Access

You can also query the endpoint directly without MCP:

```bash
# Get server info
curl https://shaddy-docs.vercel.app/api/mcp

# List tools
curl -X POST https://shaddy-docs.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "id": 1
  }'

# Get all hooks
curl -X POST https://shaddy-docs.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "get_registry",
      "arguments": { "category": "hooks" }
    },
    "id": 2
  }'
```

---

## Integration Examples

### JavaScript/TypeScript

```typescript
import { spawn } from 'child_process'

const mcp = spawn('npx', ['@shaddy/mcp'])

// Send request
mcp.stdin.write(JSON.stringify({
  jsonrpc: '2.0',
  method: 'tools/call',
  params: {
    name: 'get_registry',
    arguments: { category: 'all' }
  },
  id: 1
}) + '\n')

// Read response
mcp.stdout.on('data', (data) => {
  const response = JSON.parse(data.toString())
  console.log(response)
})
```

### Python

```python
import subprocess
import json

mcp = subprocess.Popen(
    ['npx', '@shaddy/mcp'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    text=True
)

# Send request
request = {
    'jsonrpc': '2.0',
    'method': 'tools/call',
    'params': {
        'name': 'get_registry',
        'arguments': {'category': 'all'}
    },
    'id': 1
}

mcp.stdin.write(json.dumps(request) + '\n')
mcp.stdin.flush()

# Read response
response = json.loads(mcp.stdout.readline())
print(response)
```

---

## Resources

- **Production Endpoint:** `https://shaddy-docs.vercel.app/api/mcp`
- **Package:** [shaddy-mcp on npm](https://www.npmjs.com/package/shaddy-mcp)
- **Documentation:** [shaddy-docs.vercel.app](https://shaddy-docs.vercel.app)
- **MCP Specification:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **GitHub:** [github.com/yourusername/shaddy](https://github.com/yourusername/shaddy)

---

## Support

Having issues? We're here to help:

- **GitHub Issues:** [Report a bug or request a feature](https://github.com/yourusername/shaddy/issues)
- **Documentation:** [Complete guides and tutorials](https://shaddy-docs.vercel.app)
- **MCP Docs:** [Learn more about MCP](https://modelcontextprotocol.io)

---

**Made with ❤️ by the Shaddy team**

Explore components with AI assistance!
