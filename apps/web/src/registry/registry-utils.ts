import { Registry } from './schema'

export const utils: Registry['items'] = [
  {
    name: 'compose-providers',
    type: 'registry:lib',
    registryDependencies: [],
    files: [
      {
        path: 'utils/compose-providers.ts',
        type: 'registry:lib',
        target: 'utils/compose-providers.ts',
      },
    ],
    dependencies: ['lucide-react'],
    devDependencies: [],
  },
]
