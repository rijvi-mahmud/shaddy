import { UseBooleanExample } from './examples/hooks-example/UseBooleanExample'
import { ComponentType } from 'react'
import { UseDefaultExample } from './examples/hooks-example/UseDefaultExample'
import { UseClipboardCopyExample } from './examples/hooks-example/UseClipboardCopyExample'
import { UseDebounceExample } from './examples/hooks-example/UseDebounceExample'
import { UseIntervalExample } from './examples/hooks-example/UseIntervalExample'
import { UsePreviousExample } from './examples/hooks-example/UsePreviousExample'
import { UseWindowResizeExample } from './examples/hooks-example/UseWindowResizeExample'
import { UseDebouncedCallbackExample } from './examples/hooks-example/UseDebouncedCallbackExample'
import { UseEventListenerExample } from './examples/hooks-example/UseEventListenerExample'

type RegistryItem = {
  component: ComponentType
  description?: string
  path?: string
}

// Registry object mapping hook names to their example components
export const registryHooks: Record<string, RegistryItem> = {
  'use-boolean': {
    component: UseBooleanExample,
    description: 'A hook for managing boolean state with utility functions',
    path: 'registry/examples/hooks-example/UseBooleanExample.tsx',
  },
  'use-default': {
    component: UseDefaultExample,
    description: 'A hook for managing state with a default fallback value',
    path: 'registry/examples/hooks-example/UseDefaultExample.tsx',
  },
  'use-clipboard-copy': {
    component: UseClipboardCopyExample,
    description:
      'A hook for copying text to the clipboard with status feedback',
    path: 'registry/examples/hooks-example/UseClipboardCopyExample.tsx',
  },
  'use-debounce': {
    component: UseDebounceExample,
    description: 'A hook for debouncing input changes with a delay',
    path: 'registry/examples/hooks-example/UseDebounceExample.tsx',
  },
  'use-interval': {
    component: UseIntervalExample,
    description: 'A hook for running a callback at specified intervals',
    path: 'registry/examples/hooks-example/UseIntervalExample.tsx',
  },
  'use-previous': {
    component: UsePreviousExample,
    description: 'A hook to get the previous value of a state or prop',
    path: 'registry/examples/hooks-example/UsePreviousExample.tsx',
  },
  'use-window-resize': {
    component: UseWindowResizeExample,
    description: 'A hook for tracking window resize events with debouncing',
    path: 'registry/examples/hooks-example/UseWindowResizeExample.tsx',
  },
  'use-debounced-callback': {
    component: UseDebouncedCallbackExample,
    description: 'A hook for creating debounced functions that delay execution',
    path: 'registry/examples/hooks-example/UseDebouncedCallbackExample.tsx',
  },
  'use-event-listener': {
    component: UseEventListenerExample,
    description: 'A hook for adding event listeners with cleanup',
    path: 'registry/examples/hooks-example/UseEventListenerExample.tsx',
  },
}
