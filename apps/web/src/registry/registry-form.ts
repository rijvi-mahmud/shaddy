import { Registry } from './schema'

export const form: Registry['items'] = [
  {
    name: 'form-context',
    type: 'registry:component',
    registryDependencies: ['form', 'shaddy-form:local'],
    files: [
      {
        path: 'form/form-context.ts',
        type: 'registry:component',
        target: 'components/form/form-context.ts',
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
        path: 'form/shaddy-form.tsx',
        type: 'registry:component',
        target: 'components/form/shaddy-form.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['form', 'text-field:local', 'submit-button:local'],
  },
  {
    name: 'submit-button',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/submit-button.tsx',
        type: 'registry:component',
        target: 'components/form/fields/submit-button.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local'],
  },
  {
    name: 'reset-button',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/reset-button.tsx',
        type: 'registry:component',
        target: 'components/form/fields/reset-button.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local', 'button'],
  },
  {
    name: 'text-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/text-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/text-field.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: [
      'form',
      'input',
      'button',
      'shaddy-form:local',
      'loading-spinner:local',
    ],
  },
  {
    name: 'text-area-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/text-area-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/text-area-field.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: [
      'form',
      'button',
      'autosize-textarea:local',
      'shaddy-form:local',
      'loading-spinner:local',
    ],
  },
  {
    name: 'unique-text-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/unique-text-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/unique-text-field.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: [
      'form',
      'input',
      'shaddy-form:local',
      'use-debounce:local',
    ],
  },
  {
    name: 'password-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/password-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/password-field.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['form', 'input', 'shaddy-form:local'],
  },
]
