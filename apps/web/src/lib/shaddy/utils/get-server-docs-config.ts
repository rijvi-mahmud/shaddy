import { defaultLocale } from '@/config/i18n'

import type { LocaleOptions } from '../types/i18n'
import { DocsConfig } from '../types/docs'

interface ServerDocsConfig {
  locale: LocaleOptions
  config: DocsConfig
}

export async function getServerDocsConfig({
  locale,
  config,
}: ServerDocsConfig) {
  return {
    docs: config,
    currentLocale: locale || defaultLocale,
  }
}
