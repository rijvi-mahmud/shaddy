import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'
import { glob } from 'glob'

// ============================================================================
// Constants
// ============================================================================

const PROJECT_ROOT = path.resolve(process.cwd(), '../..')

const IGNORED_DIRECTORIES = [
  '**/node_modules/**',
  '**/.next/**',
  '**/.git/**',
  '**/dist/**',
  '**/.turbo/**',
]

const IGNORED_DIRECTORY_NAMES = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  '.turbo',
]

// ============================================================================
// Zod Schemas for Tool Input Validation
// ============================================================================
const ListFilesSchema = z.object({
  directory: z
    .string()
    .optional()
    .describe('Directory to list files from (relative to project root)'),
  pattern: z
    .string()
    .optional()
    .describe('Glob pattern to filter files (e.g., "**/*.ts")'),
})

const ReadFileSchema = z.object({
  path: z.string().describe('File path relative to project root'),
})

const SearchCodeSchema = z.object({
  query: z.string().describe('Text or regex pattern to search for'),
  filePattern: z
    .string()
    .optional()
    .describe('Glob pattern to limit search scope (e.g., "**/*.tsx")'),
  caseSensitive: z.boolean().optional().describe('Case sensitive search'),
})

const GetProjectStructureSchema = z.object({
  depth: z
    .number()
    .optional()
    .default(2)
    .describe('Maximum depth of directory tree to return'),
})

const GetRegistrySchema = z.object({
  category: z
    .enum(['all', 'hooks', 'components', 'utilities'])
    .optional()
    .default('all')
    .describe('Filter registry by category'),
})

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Creates a standardized text response for MCP tool results
 */
function createTextResponse(data: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
      },
    ],
  }
}

/**
 * Creates a standardized error response for MCP tool results
 */
function createErrorResponse(error: unknown) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  return {
    content: [
      {
        type: 'text' as const,
        text: `Error: ${errorMessage}`,
      },
    ],
    isError: true,
  }
}

/**
 * Lists files in the project directory with optional filtering
 */
async function listFiles(
  directory?: string,
  pattern?: string
): Promise<string[]> {
  const baseDir = directory ? path.join(PROJECT_ROOT, directory) : PROJECT_ROOT
  const searchPattern = pattern || '**/*'
  const fullPattern = path.join(baseDir, searchPattern)

  const files = await glob(fullPattern, {
    ignore: IGNORED_DIRECTORIES,
    nodir: true,
  })

  return files.map((file) => path.relative(PROJECT_ROOT, file))
}

/**
 * Reads a file from the project with security checks
 */
async function readFile(filePath: string): Promise<string> {
  const fullPath = path.join(PROJECT_ROOT, filePath)

  // Security check: ensure path is within project root
  const resolvedPath = path.resolve(fullPath)
  if (!resolvedPath.startsWith(path.resolve(PROJECT_ROOT))) {
    throw new Error('Access denied: Path outside project root')
  }

  const content = await fs.readFile(fullPath, 'utf-8')
  return content
}

/**
 * Searches for code patterns across the project files
 */
async function searchCode(
  query: string,
  filePattern?: string,
  caseSensitive?: boolean
): Promise<Array<{ file: string; line: number; content: string }>> {
  const files = await listFiles(
    undefined,
    filePattern || '**/*.{ts,tsx,js,jsx,json,md}'
  )
  const results: Array<{ file: string; line: number; content: string }> = []
  const regex = new RegExp(query, caseSensitive ? 'g' : 'gi')

  for (const file of files) {
    try {
      const content = await readFile(file)
      const lines = content.split('\n')

      lines.forEach((line, index) => {
        if (regex.test(line)) {
          results.push({
            file,
            line: index + 1,
            content: line.trim(),
          })
        }
      })
    } catch (error) {
      // Skip files that can't be read
      continue
    }
  }

  return results.slice(0, 100) // Limit results
}

/**
 * Builds a directory tree structure of the project
 */
async function getProjectStructure(
  depth: number = 2
): Promise<Record<string, any>> {
  async function buildTree(
    dir: string,
    currentDepth: number
  ): Promise<Record<string, any>> {
    if (currentDepth > depth) return {}

    const entries = await fs.readdir(dir, { withFileTypes: true })
    const tree: Record<string, any> = {}

    for (const entry of entries) {
      // Skip common ignored directories
      if (IGNORED_DIRECTORY_NAMES.includes(entry.name)) {
        continue
      }

      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        tree[entry.name] = await buildTree(fullPath, currentDepth + 1)
      } else {
        tree[entry.name] = 'file'
      }
    }

    return tree
  }

  return buildTree(PROJECT_ROOT, 0)
}

/**
 * Retrieves the Shaddy component/hook registry with optional category filtering
 */
async function getRegistry(
  category: string = 'all'
): Promise<Array<Record<string, any>>> {
  const registryPath = path.join(PROJECT_ROOT, 'apps/web/public/r/index.json')

  try {
    const content = await fs.readFile(registryPath, 'utf-8')
    const registry = JSON.parse(content)

    if (category === 'all') {
      return registry
    }

    // Filter by category
    const categoryMap: Record<string, string> = {
      hooks: 'registry:hook',
      components: 'registry:ui',
      utilities: 'registry:lib',
    }

    const typeFilter = categoryMap[category]
    if (!typeFilter) {
      return registry
    }

    return registry.filter((item: any) => item.type === typeFilter)
  } catch (error) {
    throw new Error(
      `Failed to read registry: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

// ============================================================================
// MCP Server Configuration
// ============================================================================

/**
 * Creates and configures the MCP server with all available tools
 */
export function createMCPServer() {
  const server = new Server(
    {
      name: 'shaddy-project-context',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  )

  // --------------------------------------------------------------------------
  // Tool Definitions
  // --------------------------------------------------------------------------

  const tools: Tool[] = [
    {
      name: 'list_files',
      description:
        'List files in the project. Can filter by directory and glob pattern.',
      inputSchema: {
        type: 'object',
        properties: {
          directory: {
            type: 'string',
            description:
              'Directory to list files from (relative to project root)',
          },
          pattern: {
            type: 'string',
            description: 'Glob pattern to filter files (e.g., "**/*.ts")',
          },
        },
      },
    },
    {
      name: 'read_file',
      description: 'Read the contents of a file in the project.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'File path relative to project root',
          },
        },
        required: ['path'],
      },
    },
    {
      name: 'search_code',
      description:
        'Search for code patterns across the project. Returns matching lines with file and line number.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Text or regex pattern to search for',
          },
          filePattern: {
            type: 'string',
            description:
              'Glob pattern to limit search scope (e.g., "**/*.tsx")',
          },
          caseSensitive: {
            type: 'boolean',
            description: 'Case sensitive search',
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'get_project_structure',
      description:
        'Get the directory structure of the project up to a specified depth.',
      inputSchema: {
        type: 'object',
        properties: {
          depth: {
            type: 'number',
            description: 'Maximum depth of directory tree to return',
            default: 2,
          },
        },
      },
    },
    {
      name: 'get_registry',
      description:
        'Get the Shaddy component/hook registry. Lists all available components, hooks, and utilities with their metadata, dependencies, and file paths.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['all', 'hooks', 'components', 'utilities'],
            description: 'Filter registry by category',
            default: 'all',
          },
        },
      },
    },
  ]

  // --------------------------------------------------------------------------
  // Request Handlers
  // --------------------------------------------------------------------------

  // Handle tool listing
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools }
  })

  // Handle tool execution
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params

    try {
      switch (name) {
        case 'list_files': {
          const { directory, pattern } = ListFilesSchema.parse(args)
          const files = await listFiles(directory, pattern)
          return createTextResponse(files)
        }

        case 'read_file': {
          const { path: filePath } = ReadFileSchema.parse(args)
          const content = await readFile(filePath)
          return createTextResponse(content)
        }

        case 'search_code': {
          const { query, filePattern, caseSensitive } =
            SearchCodeSchema.parse(args)
          const results = await searchCode(query, filePattern, caseSensitive)
          return createTextResponse(results)
        }

        case 'get_project_structure': {
          const { depth } = GetProjectStructureSchema.parse(args)
          const structure = await getProjectStructure(depth)
          return createTextResponse(structure)
        }

        case 'get_registry': {
          const { category } = GetRegistrySchema.parse(args)
          const registry = await getRegistry(category)
          return createTextResponse(registry)
        }

        default:
          throw new Error(`Unknown tool: ${name}`)
      }
    } catch (error) {
      return createErrorResponse(error)
    }
  })

  return server
}

// ============================================================================
// CLI Entry Point
// ============================================================================

/**
 * Runs the MCP server using stdio transport for command-line usage
 */
export async function runStdioServer() {
  const server = createMCPServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}
