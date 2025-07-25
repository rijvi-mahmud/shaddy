/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 * - src/components/mobile-nav.tsx
 * - src/app/[locale]/docs/layout.tsx
 * - src/lib/opendocs/components/docs/pager.tsx
 */

import type { DocsConfig } from '@/lib/shaddy/types/docs'

export const typedHooksConfig: DocsConfig = {
  mainNav: [
    {
      href: '/typed-hooks',

      title: {
        en: 'Typed Hooks',
        pt: 'Documentação',
      },
    },
  ],

  sidebarNav: [
    {
      title: {
        en: 'Getting Started',
        pt: 'Começando',
      },

      items: [
        {
          href: '/typed-hooks',

          title: {
            en: 'Introduction',
            pt: 'Introdução',
          },

          items: [],
        },
        {
          href: '/typed-hooks/use-boolean',
          title: {
            en: 'useBoolean',
            pt: 'useBoolean',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-default',
          title: {
            en: 'useDefault',
            pt: 'useDefault',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-clipboard-copy',
          title: {
            en: 'useClipboardCopy',
            pt: 'useClipboardCopy',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-debounce',
          title: {
            en: 'useDebounce',
            pt: 'useDebounce',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-debounced-callback',
          title: {
            en: 'useDebouncedCallback',
            pt: 'useDebouncedCallback',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-interval',
          title: {
            en: 'useInterval',
            pt: 'useInterval',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-previous',
          title: {
            en: 'usePrevious',
            pt: 'usePrevious',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-window-resize',
          title: {
            en: 'useWindowResize',
            pt: 'useWindowResize',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-event-listener',
          title: {
            en: 'useEventListener',
            pt: 'useEventListener',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-local-storage',
          title: {
            en: 'useLocalStorage',
            pt: 'useLocalStorage',
          },

          label: {
            en: 'New',
            pt: 'Novo',
          },
          items: [],
        },
        {
          href: '/typed-hooks/use-session-storage',
          title: {
            en: 'useSessionStorage',
            pt: 'useSessionStorage',
          },

          label: {
            en: 'New',
            pt: 'Novo',
          },
          items: [],
        },
      ],
    },
  ],
} as const
