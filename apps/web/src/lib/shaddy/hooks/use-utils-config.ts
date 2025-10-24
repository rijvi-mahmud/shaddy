import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import type { DocsConfig } from '@/lib/shaddy/types/docs'
import type { LocaleOptions } from '../types/i18n'

import { defaultLocale } from '@/config/i18n'

export function useUtilsConfig() {
  const locale = useLocale() as LocaleOptions
  const currentLocale = locale || defaultLocale

  const [docsConfig, setDocsConfig] = useState<{
    currentLocale: LocaleOptions
    utils: DocsConfig
  }>({
    currentLocale,

    utils: {
      mainNav: [],
      sidebarNav: [],
    },
  })

  useEffect(() => {
    import(`@/config/utils`).then(({ utilsConfig }) => {
      setDocsConfig({
        currentLocale,
        utils: utilsConfig,
      })
    })
  }, [currentLocale])

  return docsConfig
}
