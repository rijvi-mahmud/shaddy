import { setRequestLocale } from 'next-intl/server'

import { DocsSidebarNav } from '@/components/docs/sidebar-nav'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'
import { getServerTypedHooksConfig } from '@/lib/shaddy/utils/get-server-typed-hooks-config'

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

  const typedHooksConfig = await getServerTypedHooksConfig({
    locale: params.locale,
  })

  return (
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="h-max-[calc(100vh-3.5rem)] fixed top-14 z-30 -ml-2 hidden w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-max-[calc(100vh-3.5rem)] h-full min-h-fit py-6 pr-6 lg:py-8">
            <DocsSidebarNav
              items={typedHooksConfig.hooks.sidebarNav}
              locale={typedHooksConfig.currentLocale}
            />
          </ScrollArea>
        </aside>

        {children}
      </div>
    </div>
  )
}
