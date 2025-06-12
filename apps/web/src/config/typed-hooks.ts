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

        // {
        //   href: '/typed-hooks/adding-new-hooks',

        //   title: {
        //     en: 'Adding new hooks',
        //     pt: 'Adicionando novos hooks',
        //   },

        //   items: [],
        // },

        // {
        //   href: '/typed-hooks/customizing',

        //   title: {
        //     en: 'Customizing',
        //     pt: 'Personalizando',
        //   },

        //   items: [],
        // },

        // {
        //   title: {
        //     en: 'MDX',
        //   },

        //   label: {
        //     en: 'New',
        //     pt: 'Novo',
        //   },

        //   items: [
        //     {
        //       href: '/typed-hooks/mdx/frontmatter',

        //       title: {
        //         en: 'Frontmatter',
        //         pt: 'Cabeçalho de metadados',
        //       },

        //       label: {
        //         en: 'New',
        //         pt: 'Novo',
        //       },

        //       items: [],
        //     },

        //     {
        //       href: '/typed-hooks/mdx/code',

        //       title: {
        //         en: 'Code',
        //         pt: 'Código',
        //       },

        //       label: {
        //         en: 'New',
        //         pt: 'Novo',
        //       },

        //       items: [],
        //     },

        //     {
        //       href: '/typed-hooks/mdx/components',

        //       title: {
        //         en: 'Components',
        //         pt: 'Componentes',
        //       },

        //       label: {
        //         en: 'New',
        //         pt: 'Novo',
        //       },

        //       items: [],
        //     },
        //   ],
        // },

        // {
        //   href: '/typed-hooks/changelog',

        //   title: {
        //     en: 'Changelog',
        //     pt: 'Histórico de alterações',
        //   },

        //   items: [],
        // },
      ],
    },
  ],
} as const
