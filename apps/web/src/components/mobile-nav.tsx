'use client'

import { useState } from 'react'

import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet'

import { getObjectValueByLocale } from '@/lib/shaddy/utils/locale'
import { useDocsConfig } from '@/lib/shaddy/hooks/use-docs-config'
import { DocsSidebarNav } from './docs/sidebar-nav'
import { ScrollArea } from './ui/scroll-area'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { MobileLink } from './mobile-link'
import { blogConfig } from '@/config/blog'
import { usePathname } from '@/navigation'
import { Button } from './ui/button'
import { useTypedHooksConfig } from '@/lib/shaddy/hooks/use-typed-hooks-config'

interface MobileNavProps {
  menuLinks: JSX.Element

  messages: {
    menu: string
    toggleMenu: string
  }
}

const displayContentSidebar = (pathname: string) => {
  const routes = ['/docs', '/typed-hooks']
  return routes.some((route) => pathname.startsWith(route))
}

export function MobileNav({ messages, menuLinks }: MobileNavProps) {
  const pathname = usePathname()
  const docsConfig = useDocsConfig()
  const hooksConfig = useTypedHooksConfig()
  const [open, setOpen] = useState(false)

  const config = [docsConfig, hooksConfig]

  const shouldDisplayDocsSidebarContent = displayContentSidebar(pathname)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="size-5" />
          <span className="sr-only">${messages.toggleMenu}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="pr-0">
        <SheetTitle className="sr-only">{messages.menu}</SheetTitle>

        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 size-4 -rotate-45" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>

        {menuLinks && (
          <div className="flex phone:hidden flex-col space-y-2 items-end pr-2">
            {menuLinks}
          </div>
        )}

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {/* {blogConfig.mainNav?.map((item) => (
              <MobileLink key={item.href} href="/blog" onOpenChange={setOpen}>
                {getObjectValueByLocale(item.title, docsConfig.currentLocale)}
              </MobileLink>
            ))} */}

            {/* Show docs mainNav */}
            {/* {docsConfig.docs.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {getObjectValueByLocale(
                      item.title,
                      docsConfig.currentLocale
                    )}
                  </MobileLink>
                )
            )} */}

            {/* Show docs sidebar only on /docs */}
            {/* {pathname.startsWith('/docs') && (
              <DocsSidebarNav
                isMobile
                locale={docsConfig.currentLocale}
                items={docsConfig.docs.sidebarNav}
                handleMobileSidebar={setOpen}
              />
            )} */}

            {/* Show hooks mainNav */}
            {hooksConfig.hooks.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {getObjectValueByLocale(
                      item.title,
                      hooksConfig.currentLocale
                    )}
                  </MobileLink>
                )
            )}

            {/* Show hooks sidebar only on /typed-hooks */}
            {pathname.startsWith('/typed-hooks') && (
              <DocsSidebarNav
                isMobile
                locale={hooksConfig.currentLocale}
                items={hooksConfig.hooks.sidebarNav}
                handleMobileSidebar={setOpen}
              />
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
