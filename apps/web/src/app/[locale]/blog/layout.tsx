import { setRequestLocale } from 'next-intl/server'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'

interface BlogLayoutProps {
  children: React.ReactNode
  params: {
    locale: LocaleOptions
  }
}

export const dynamicParams = true

export default async function BlogLayout({
  children,
  params,
}: BlogLayoutProps) {
  setRequestLocale(params.locale)

  return (
    <div className="container mx-auto max-w-container px-4 pt-6 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
