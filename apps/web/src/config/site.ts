import { absoluteUrl } from '@/lib/utils'
import en from '@/i18n/locales/en.json'
import pt from '@/i18n/locales/pt.json'

export const siteConfig = {
  name: 'shaddy',

  description: {
    en: en.site.description,
    pt: pt.site.description,
  },

  url: process.env.NEXT_PUBLIC_APP_URL,

  og: {
    image: absoluteUrl('/og.jpg'),

    size: {
      width: 1200,
      height: 630,
    },
  },

  app: {
    latestVersion: '3.0.8',
  },

  author: {
    name: 'Rijvi Mahmud',
    site: 'https://rijvi-mahmud-portfolio.vercel.app/',
  },

  links: {
    twitter: {
      label: 'Twitter',
      username: '@rijvi-mahmud',
      url: 'https://twitter.com/rijvi-mahmud',
    },

    github: {
      label: 'GitHub',
      url: 'https://github.com/rijvi-mahmud/shaddy',
    },
  },
} as const

export type SiteConfig = typeof siteConfig
