import { visit } from 'unist-util-visit'
import type { Node } from 'unist-builder/lib'
import type { UnistNode } from '../types/unist'

/**
 * Rehype plugin to replace {baseUrl} placeholders with environment variable
 * This runs after markdown is converted to HTML
 */
export function rehypeReplaceUrls() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string

  return (tree: Node) => {
    visit(tree, (node: UnistNode) => {
      // Replace {baseUrl} in text nodes
      if (node.type === 'text' && typeof node.value === 'string') {
        node.value = node.value.replace(/{baseUrl}/g, baseUrl)
      }

      // Replace {baseUrl} in element properties (like href, src, etc.)
      if (node.type === 'element' && node.properties) {
        Object.keys(node.properties).forEach((key) => {
          const value = node.properties?.[key]
          if (typeof value === 'string' && node.properties) {
            node.properties[key] = value.replace(/{baseUrl}/g, baseUrl)
          }
        })
      }

      // Replace {baseUrl} in raw strings (for code blocks)
      if (node.properties?.['__rawString__']) {
        node.properties['__rawString__'] = node.properties[
          '__rawString__'
        ].replace(/{baseUrl}/g, baseUrl)
      }
    })
  }
}
