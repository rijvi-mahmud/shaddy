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
          href: '/form/what-are-fields',
          title: {
            en: 'What are Fields?',
            pt: 'O que são Campos?',
          },
          items: [],
        },
        {
          href: '/form/field-array',
          title: {
            en: 'Field Array',
            pt: 'Campo de Array',
          },
          items: [],
        },
        {
          href: '/form/step-form',
          title: {
            en: 'Step Form',
            pt: 'Formulário em Etapas',
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
        {
          href: '/form/submit-button',
          title: {
            en: 'Submit Button',
            pt: 'Botão de Enviar',
          },
          items: [],
        },
        {
          href: '/form/reset-button',
          title: {
            en: 'Reset Button',
            pt: 'Botão de Reset',
          },
          items: [],
        },
        {
          href: '/form/text-field',
          title: {
            en: 'Text Field',
            pt: 'Campo de Texto',
          },
          items: [],
        },
        {
          href: '/form/unique-text-field',
          title: {
            en: 'Unique Text Field',
            pt: 'Campo de Texto Único',
          },
          items: [],
        },
        {
          href: '/form/text-area-field',
          title: {
            en: 'Text Area Field',
            pt: 'Campo de Texto',
          },
          items: [],
        },
        {
          href: '/form/password-field',
          title: {
            en: 'Password Field',
            pt: 'Campo de Senha',
          },
          items: [],
        },
        {
          href: '/form/phone-input-field',
          title: {
            en: 'Phone Input Field',
            pt: 'Campo de Telefone',
          },
          items: [],
        },
        {
          href: '/form/select-field',
          title: {
            en: 'Select Field',
            pt: 'Campo de Seleção',
          },
          items: [],
        },
        {
          href: '/form/switch-field',
          title: {
            en: 'Switch Field',
            pt: 'Campo de Alternância',
          },
          items: [],
        },
        {
          href: '/form/checkbox-field',
          title: {
            en: 'Checkbox Field',
            pt: 'Campo de Seleção',
          },
          items: [],
        },
        {
          href: '/form/checkbox-group-field',
          title: {
            en: 'Checkbox Group Field',
            pt: 'Campo de Seleção em Grupo',
          },
          items: [],
        },
        {
          href: '/form/date-picker-field',
          title: {
            en: 'Date Picker Field',
            pt: 'Campo de Seleção de Data',
          },
          items: [],
        },
        {
          href: '/form/date-range-picker-field',
          title: {
            en: 'Date Range Picker Field',
            pt: 'Campo de Seleção de Intervalo de Data',
          },
          items: [],
        },
      ],
    },
  ],
} as const
