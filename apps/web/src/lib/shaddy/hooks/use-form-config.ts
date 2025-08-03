import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import type { DocsConfig } from '@/lib/shaddy/types/docs'
import type { LocaleOptions } from '../types/i18n'

import { defaultLocale } from '@/config/i18n'

export function useFormConfig() {
  const locale = useLocale() as LocaleOptions
  const currentLocale = locale || defaultLocale

  const [docsConfig, setDocsConfig] = useState<{
    currentLocale: LocaleOptions
    form: DocsConfig
  }>({
    currentLocale,

    form: {
      mainNav: [],
      sidebarNav: [],
    },
  })

  useEffect(() => {
    import(`@/config/form`).then(({ formConfig }) => {
      setDocsConfig({
        currentLocale,
        form: formConfig,
      })
    })
  }, [currentLocale])

  return docsConfig
}
