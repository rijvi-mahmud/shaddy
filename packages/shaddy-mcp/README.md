# shaddy-mcp

Universal MCP client for the Shaddy component library. Connect any AI agent to explore Shaddy's components, hooks, and utilities.

## Quick Start

Use with any MCP-compatible AI client:

### Claude Code

Add to `.mcp.json`:

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

### Codex

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.shaddy]
command = "npx"
args = ["@shaddy/mcp"]
```

## What Can You Do?

Once configured, ask your AI assistant:

- "Show me all available hooks in the Shaddy registry"
- "Find a form component in Shaddy"
- "What components are available for building a login page?"
- "Search for useLocalStorage hook"
- "Show me the project structure"

## Available Tools

The Shaddy MCP server provides:

- **list_files** - Browse project files
- **read_file** - Read source code
- **search_code** - Search patterns across the codebase
- **get_project_structure** - View directory tree
- **get_registry** - Access component/hook registry

## Configuration

By default, connects to `https://shaddy-docs.vercel.app/api/mcp`.

To use a custom endpoint:

```bash
export SHADDY_MCP_ENDPOINT=https://your-custom-endpoint.com/api/mcp
```

Or in your MCP configuration:

```json
{
  "mcpServers": {
    "shaddy": {
      "command": "npx",
      "args": ["shaddy-mcp"],
      "env": {
        "SHADDY_MCP_ENDPOINT": "https://your-custom-endpoint.com/api/mcp"
      }
    }
  }
}
```

## How It Works

This package acts as a bridge:

1. **MCP Client** (Claude Code, Cursor, etc.) sends requests via stdio
2. **@shaddy/mcp** forwards them to the production HTTP endpoint
3. **Shaddy MCP Server** processes the request
4. Response streams back through the bridge to your AI assistant

## Requirements

- Node.js >= 20
- MCP-compatible AI client

## Documentation

For detailed documentation, visit [shaddy-docs.vercel.app](https://shaddy-docs.vercel.app)

## Support

- [GitHub Issues](https://github.com/yourusername/shaddy/issues)
- [Documentation](https://shaddy-docs.vercel.app)
- [MCP Specification](https://modelcontextprotocol.io)

## License

MIT
