import { Registry } from './schema'

export const hook: Registry['items'] = [
  {
    name: 'use-boolean',
    type: 'registry:hook',
    registryDependencies: [],
    files: [
      {
        path: 'registry/examples/hooks-example/UseBooleanExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-boolean.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-default',
    type: 'registry:hook',
    files: [
      {
        path: 'registry/examples/hooks-example/UseDefaultExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-default.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-clipboard-copy',
    type: 'registry:hook',
    files: [
      {
        path: 'registry/examples/hooks-example/UseClipboardCopyExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-clipboard-copy.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-debounce',
    type: 'registry:hook',
    files: [
      {
        path: 'registry/examples/hooks-example/UseDebounceExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-debounce.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-interval',
    type: 'registry:hook',
    files: [
      {
        path: 'registry/examples/hooks-example/UseIntervalExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-interval.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-previous',
    type: 'registry:hook',
    files: [
      {
        path: 'registry/examples/hooks-example/UsePreviousExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-previous.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-window-resize',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener', 'use-debounced-callback'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseWindowResizeExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-window-resize.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-debounced-callback',
    type: 'registry:hook',
    files: [
      {
        path: 'registry/examples/hooks-example/UseDebouncedCallbackExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-debounced-callback.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-event-listener',
    type: 'registry:hook',
    files: [
      {
        path: 'registry/examples/hooks-example/UseEventListenerExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-event-listener.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-local-storage-1',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseLocalStorageExamples/BasicExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-local-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-local-storage-2',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseLocalStorageExamples/SettingsExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-local-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-local-storage-3',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseLocalStorageExamples/FormExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-local-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-local-storage-4',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseLocalStorageExamples/AdvancedExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-local-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-session-storage-1',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseSessionStorageExamples/BasicExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-session-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-session-storage-2',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseSessionStorageExamples/SettingsExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-session-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-session-storage-3',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseSessionStorageExamples/FormExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-session-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: 'use-session-storage-4',
    type: 'registry:hook',
    registryDependencies: ['use-event-listener'],
    files: [
      {
        path: 'registry/examples/hooks-example/UseSessionStorageExamples/AdvancedExample.tsx',
        type: 'registry:hook',
      },
      {
        path: 'registry/hooks/use-session-storage.ts',
        type: 'registry:hook',
      },
    ],
    dependencies: [],
    devDependencies: [],
  },
]
