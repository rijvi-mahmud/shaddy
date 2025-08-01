import { Registry } from './schema'

export const form: Registry['items'] = [
  {
    name: 'form-context',
    type: 'registry:component',
    registryDependencies: ['form', 'shaddy-form:local'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseSessionStorageExamples/BasicExample.tsx',
        type: 'registry:component',
      },
      {
        path: 'registry/shaddyForm/form-context.ts',
        type: 'registry:component',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
  },
  {
    name: 'shaddy-form',
    type: 'registry:component',
    files: [
      {
        path: 'registry/examples/hooks-example/UseSessionStorageExamples/BasicExample.tsx',
        type: 'registry:component',
      },
      {
        path: 'registry/shaddyForm/shaddy-form.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['form'],
  },
]
