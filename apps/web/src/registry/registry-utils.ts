import { Registry } from './schema'

export const utils: Registry['items'] = [
  {
    name: 'compose-providers',
    type: 'registry:utils',
    registryDependencies: [],
    files: [
      {
        path: 'utils/compose-providers.ts',
        type: 'registry:utils',
        target: 'utils/compose-providers.ts',
      },
    ],
    dependencies: ['lucide-react'],
    devDependencies: [],
  },
]
