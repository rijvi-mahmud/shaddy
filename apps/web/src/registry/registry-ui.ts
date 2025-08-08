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
  {
    name: 'autosize-textarea',
    type: 'registry:ui',
    registryDependencies: ['textarea'],
    files: [
      {
        path: 'ui/autosize-textarea.tsx',
        type: 'registry:ui',
        target: 'components/ui/autosize-textarea.tsx',
      },
    ],
    dependencies: ['lucide-react'],
    devDependencies: [],
  },
]
