import { Registry } from './schema'

export const form: Registry['items'] = [
  {
    name: 'form-context',
    type: 'registry:component',
    registryDependencies: ['shaddy-form:local'],
    files: [
      {
        path: 'form/form-context.ts',
        type: 'registry:component',
        target: 'components/form/form-context.ts',
      },
    ],
    dependencies: [],
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
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'form',
      'input',
      'button',
      'text-field:local',
      'submit-button:local',
    ],
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
    dependencies: [],
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
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local'],
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
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local', 'loading-spinner:local'],
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
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
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
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local', 'use-debounce:local'],
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
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local'],
  },
  {
    name: 'select-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/select-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/select-field.tsx',
      },
    ],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local'],
  },
  {
    name: 'switch-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/switch-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/switch-field.tsx',
      },
    ],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local'],
  },
  {
    name: 'checkbox-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/checkbox-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/checkbox-field.tsx',
      },
    ],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local'],
  },
  {
    name: 'checkbox-group-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/checkbox-group-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/checkbox-group-field.tsx',
      },
    ],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local'],
  },
  {
    name: 'date-picker-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/date-picker-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/date-picker-field.tsx',
      },
    ],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local', 'calender'],
  },
  {
    name: 'date-range-picker-field',
    type: 'registry:component',
    files: [
      {
        path: 'form/fields/date-range-picker-field.tsx',
        type: 'registry:component',
        target: 'components/form/fields/date-range-picker-field.tsx',
      },
    ],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['shaddy-form:local', 'calender'],
  },
]
