/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 * - src/components/mobile-nav.tsx
 * - src/app/[locale]/docs/layout.tsx
 * - src/lib/opendocs/components/docs/pager.tsx
 */

import type { DocsConfig } from '@/lib/shaddy/types/docs'

export const formConfig: DocsConfig = {
  mainNav: [
    {
      href: '/form',

      title: {
        en: 'Form',
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
          href: '/form',

          title: {
            en: 'Introduction',
            pt: 'Introdução',
          },

          items: [],
        },
        {
          href: '/form/use-boolean',
          title: {
            en: 'useBoolean',
            pt: 'useBoolean',
          },
          items: [],
        },
        {
          href: '/form/use-default',
          title: {
            en: 'useDefault',
            pt: 'useDefault',
          },
          items: [],
        },
        {
          href: '/form/use-clipboard-copy',
          title: {
            en: 'useClipboardCopy',
            pt: 'useClipboardCopy',
          },
          items: [],
        },
        {
          href: '/form/use-debounce',
          title: {
            en: 'useDebounce',
            pt: 'useDebounce',
          },
          items: [],
        },
        {
          href: '/form/use-debounced-callback',
          title: {
            en: 'useDebouncedCallback',
            pt: 'useDebouncedCallback',
          },
          items: [],
        },
        {
          href: '/form/use-interval',
          title: {
            en: 'useInterval',
            pt: 'useInterval',
          },
          items: [],
        },
        {
          href: '/form/use-previous',
          title: {
            en: 'usePrevious',
            pt: 'usePrevious',
          },
          items: [],
        },
        {
          href: '/form/use-window-resize',
          title: {
            en: 'useWindowResize',
            pt: 'useWindowResize',
          },
          items: [],
        },
        {
          href: '/form/use-event-listener',
          title: {
            en: 'useEventListener',
            pt: 'useEventListener',
          },
          items: [],
        },
        {
          href: '/form/use-local-storage',
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
          href: '/form/use-session-storage',
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
