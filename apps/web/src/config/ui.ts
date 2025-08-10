/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 * - src/components/mobile-nav.tsx
 * - src/app/[locale]/docs/layout.tsx
 * - src/lib/opendocs/components/docs/pager.tsx
 */

import type { DocsConfig } from '@/lib/shaddy/types/docs'

export const uiConfig: DocsConfig = {
  mainNav: [
    {
      href: '/ui',

      title: {
        en: 'Components',
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
          href: '/ui',
          title: {
            en: 'Introduction',
            pt: 'Introdução',
          },
          items: [],
        },
        {
          href: '/ui/date-range-picker',
          title: {
            en: 'Date Range Picker',
            pt: 'Seletor de Intervalo de Datas',
          },
          items: [],
        },
      ],
    },
  ],
} as const
