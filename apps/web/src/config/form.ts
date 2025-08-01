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
      ],
    },
    {
      title: {
        en: 'Components',
        pt: 'Componentes',
      },
      items: [
        {
          href: '/form/form-context',
          title: {
            en: 'Form Context',
            pt: 'Form Context',
          },
          items: [],
        },
        {
          href: '/form/shaddy-form',
          title: {
            en: 'Form',
            pt: 'Form',
          },
          items: [],
        },
      ],
    },
  ],
} as const
