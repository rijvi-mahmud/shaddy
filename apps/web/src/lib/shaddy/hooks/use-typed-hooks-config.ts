import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import type { DocsConfig } from '@/lib/shaddy/types/docs'
import type { LocaleOptions } from '../types/i18n'

import { defaultLocale } from '@/config/i18n'

export function useTypedHooksConfig() {
  const locale = useLocale() as LocaleOptions
  const currentLocale = locale || defaultLocale

  const [docsConfig, setDocsConfig] = useState<{
    currentLocale: LocaleOptions
    hooks: DocsConfig
  }>({
    currentLocale,

    hooks: {
      mainNav: [],
      sidebarNav: [],
    },
  })

  useEffect(() => {
    import(`@/config/typed-hooks`).then(({ typedHooksConfig }) => {
      setDocsConfig({
        currentLocale,
        hooks: typedHooksConfig,
      })
    })
  }, [currentLocale])

  return docsConfig
}
