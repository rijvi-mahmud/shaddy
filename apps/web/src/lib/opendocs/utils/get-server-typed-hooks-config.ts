import { defaultLocale } from '@/config/i18n'

import type { LocaleOptions } from '../types/i18n'

interface ServerDocsConfig {
  locale: LocaleOptions
}

export async function getServerTypedHooksConfig({ locale }: ServerDocsConfig) {
  const { typedHooksConfig } = await import(`@/config/typed-hooks`)

  return {
    hooks: typedHooksConfig,
    currentLocale: locale || defaultLocale,
  }
}
