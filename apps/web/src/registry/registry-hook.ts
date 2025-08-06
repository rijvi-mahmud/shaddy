import { Registry } from './schema'

export const hook: Registry['items'] = [
  {
    name: 'use-boolean',
    type: 'registry:hook',
    registryDependencies: [],
    files: [
      {
        path: 'hooks/use-boolean.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
]
