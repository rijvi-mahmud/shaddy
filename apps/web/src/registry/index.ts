import { examples } from './registry-examples'
import { form } from './registry-form'
import { hook } from './registry-hook'
import { ui } from './registry-ui'
import { utils } from './registry-utils'
import { type Registry } from './schema'

export const registry = {
  name: 'shaddy',
  homepage: 'https://shaddy-docs.vercel.app/',
  items: [...hook, ...form, ...ui, ...utils, ...examples],
} satisfies Registry
