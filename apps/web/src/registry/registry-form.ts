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
    registryDependencies: ['form', 'text-field:local', 'submit-button:local'],
  },
  {
    name: 'submit-button',
    type: 'registry:component',
    files: [
      {
        path: 'registry/examples/hooks-example/UseSessionStorageExamples/BasicExample.tsx',
        type: 'registry:component',
      },
      {
        path: 'registry/shaddyForm/fields/submit-button.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['form'],
  },
  {
    name: 'text-field',
    type: 'registry:component',
    files: [
      {
        path: 'registry/examples/form-example/TextFieldExample.tsx',
        type: 'registry:component',
      },
      {
        path: 'registry/shaddyForm/fields/text-field.tsx',
        type: 'registry:component',
        target: 'components/shaddy-form/fields/text-field.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['form', 'shaddy-form:local', 'loading-spinner:ui'],
  },
  {
    name: 'unique-text-field',
    type: 'registry:component',
    files: [
      {
        path: 'registry/examples/form-example/UniqueTextFieldExample.tsx',
        type: 'registry:component',
      },
      {
        path: 'registry/shaddyForm/fields/unique-text-field.tsx',
        type: 'registry:component',
        target: 'components/shaddy-form/fields/unique-text-field.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['form', 'shaddy-form:local'],
  },
  {
    name: 'password-field',
    type: 'registry:component',
    files: [
      {
        path: 'registry/examples/form-example/PasswordFieldExample.tsx',
        type: 'registry:component',
      },
      {
        path: 'registry/shaddyForm/fields/password-field.tsx',
        type: 'registry:component',
        target: 'components/shaddy-form/fields/password-field.tsx',
      },
    ],
    dependencies: ['react-hook-form', 'zod', '@hookform/resolvers'],
    devDependencies: [],
    registryDependencies: ['form', 'shaddy-form:local'],
  },
]
