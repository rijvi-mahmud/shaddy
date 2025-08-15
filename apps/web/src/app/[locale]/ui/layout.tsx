import { setRequestLocale } from 'next-intl/server'

import { DocsSidebarNav } from '@/components/docs/sidebar-nav'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'
import { getServerDocsConfig } from '@/lib/shaddy/utils/get-server-docs-config'
import { uiConfig as config } from '@/config/ui'

interface DocsLayoutProps {
  children: React.ReactNode
  params: {
    locale: LocaleOptions
  }
}

export const dynamicParams = true

export default async function DocsLayout({
  children,
  params,
}: DocsLayoutProps) {
  setRequestLocale(params.locale)

  const uiConfig = await getServerDocsConfig({
    locale: params.locale,
    config,
  })

  return (
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="h-max-[calc(100vh-3.5rem)] fixed top-14 z-30 -ml-2 hidden w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-max-[calc(100vh-3.5rem)] h-full min-h-fit py-6 pr-6 lg:py-8">
            <DocsSidebarNav
              items={uiConfig.docs.sidebarNav}
              locale={uiConfig.currentLocale}
            />
          </ScrollArea>
        </aside>

        {children}
      </div>
    </div>
  )
}
