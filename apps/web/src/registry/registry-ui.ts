import { Registry } from './schema'

export const ui: Registry['items'] = [
  {
    name: 'loading-spinner',
    type: 'registry:ui',
    registryDependencies: [],
    files: [
      {
        path: 'ui/loading-spinner.tsx',
        type: 'registry:ui',
        target: 'components/ui/loading-spinner.tsx',
      },
    ],
    dependencies: ['lucide-react'],
    devDependencies: [],
  },
]
