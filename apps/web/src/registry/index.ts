import { form } from './registry-form'
import { hook } from './registry-hook'
import { type Registry } from './schema'

export const registry = {
  name: 'shaddy',
  homepage: 'https://shaddy-docs.vercel.app/',
  items: [...hook, ...form],
} satisfies Registry
