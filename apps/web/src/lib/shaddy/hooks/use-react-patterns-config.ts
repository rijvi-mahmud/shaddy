import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import type { DocsConfig } from '@/lib/shaddy/types/docs'
import type { LocaleOptions } from '../types/i18n'

import { defaultLocale } from '@/config/i18n'

export function useReactPatternsConfig() {
  const locale = useLocale() as LocaleOptions
  const currentLocale = locale || defaultLocale

  const [docsConfig, setDocsConfig] = useState<{
    currentLocale: LocaleOptions
    reactPatterns: DocsConfig
  }>({
    currentLocale,

    reactPatterns: {
      mainNav: [],
      sidebarNav: [],
    },
  })

  useEffect(() => {
    import(`@/config/react-patterns`).then(({ reactPatternsConfig }) => {
      setDocsConfig({
        currentLocale,
        reactPatterns: reactPatternsConfig,
      })
    })
  }, [currentLocale])

  return docsConfig
}
