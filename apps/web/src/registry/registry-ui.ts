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
  {
    name: 'date-range-picker',
    type: 'registry:ui',
    registryDependencies: ['button', 'calendar', 'popover'],
    files: [
      {
        path: 'ui/date-range-picker.tsx',
        type: 'registry:ui',
        target: 'components/ui/date-range-picker.tsx',
      },
    ],
    dependencies: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'react-day-picker',
    ],
    devDependencies: [],
  },
  {
    name: 'phone-input',
    type: 'registry:ui',
    registryDependencies: ['popover', 'command', 'input', 'scroll-area'],
    files: [
      {
        path: 'ui/phone-input.tsx',
        type: 'registry:ui',
        target: 'components/ui/phone-input.tsx',
      },
    ],
    dependencies: [
      'country-data-list',
      'libphonenumber-js',
      'react-circle-flags',
    ],
    devDependencies: [],
  },
  {
    name: 'dropzone',
    type: 'registry:ui',
    registryDependencies: ['popover', 'command', 'input', 'scroll-area'],
    files: [
      {
        path: 'ui/dropzone.tsx',
        type: 'registry:ui',
        target: 'components/ui/dropzone.tsx',
      },
    ],
    dependencies: [
      'country-data-list',
      'libphonenumber-js',
      'react-circle-flags',
    ],
    devDependencies: [],
  },
  {
    name: 'stepper',
    type: 'registry:component',
    files: [
      {
        path: 'ui/stepper.tsx',
        type: 'registry:component',
        target: 'components/ui/stepper.tsx',
      },
    ],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
]
