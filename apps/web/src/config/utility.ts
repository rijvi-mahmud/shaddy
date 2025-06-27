/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 * - src/components/mobile-nav.tsx
 * - src/app/[locale]/docs/layout.tsx
 * - src/lib/opendocs/components/docs/pager.tsx
 */

import type { DocsConfig } from '@/lib/shaddy/types/docs'

export const utilsConfig: DocsConfig = {
  mainNav: [
    {
      href: '/utils',

      title: {
        en: 'Utils',
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
          href: '/utils',

          title: {
            en: 'Introduction',
            pt: 'Introdução',
          },

          items: [],
        },
      ],
    },
  ],
} as const
