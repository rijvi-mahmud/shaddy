/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 * - src/components/mobile-nav.tsx
 * - src/app/[locale]/docs/layout.tsx
 * - src/lib/opendocs/components/docs/pager.tsx
 */

import type { DocsConfig } from '@/lib/shaddy/types/docs'

export const reactPatternsConfig: DocsConfig = {
  mainNav: [
    {
      href: '/react-patterns',

      title: {
        en: 'React Patterns',
        pt: 'Padrões React',
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
          href: '/react-patterns',
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
        en: 'Design Patterns',
        pt: 'Padrões de Design',
      },
      items: [
        {
          href: '/react-patterns/container-presentation-pattern',
          title: {
            en: 'Container-Presentation',
            pt: 'Container-Apresentação',
          },
          items: [],
        },
        {
          href: '/react-patterns/hooks-pattern',
          title: {
            en: 'Hooks Pattern',
            pt: 'Padrão de Hooks',
          },
          items: [],
        },
        {
          href: '/react-patterns/compound-component-pattern',
          title: {
            en: 'Compound Component',
            pt: 'Componente Composto',
          },
          items: [],
        },
      ],
    },
  ],
} as const
