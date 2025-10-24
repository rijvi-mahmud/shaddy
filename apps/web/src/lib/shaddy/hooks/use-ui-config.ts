import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import type { DocsConfig } from '@/lib/shaddy/types/docs'
import type { LocaleOptions } from '../types/i18n'

import { defaultLocale } from '@/config/i18n'

export function useUiConfig() {
  const locale = useLocale() as LocaleOptions
  const currentLocale = locale || defaultLocale

  const [docsConfig, setDocsConfig] = useState<{
    currentLocale: LocaleOptions
    ui: DocsConfig
  }>({
    currentLocale,

    ui: {
      mainNav: [],
      sidebarNav: [],
    },
  })

  useEffect(() => {
    import(`@/config/ui`).then(({ uiConfig }) => {
      setDocsConfig({
        currentLocale,
        ui: uiConfig,
      })
    })
  }, [currentLocale])

  return docsConfig
}
