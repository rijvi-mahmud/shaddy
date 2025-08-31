'use client'

import { useState } from 'react'

import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet'

import { getObjectValueByLocale } from '@/lib/shaddy/utils/locale'
import { DocsSidebarNav } from './docs/sidebar-nav'
import { ScrollArea } from './ui/scroll-area'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { MobileLink } from './mobile-link'
import { usePathname } from '@/navigation'
import { Button } from './ui/button'
import { useTypedHooksConfig } from '@/lib/shaddy/hooks/use-typed-hooks-config'
import { useFormConfig } from '@/lib/shaddy/hooks/use-form-config'

interface MobileNavProps {
  menuLinks: JSX.Element

  messages: {
    menu: string
    toggleMenu: string
  }
}

function RenderNavLinks({
  nav,
  locale,
  setOpen,
}: {
  nav?: { href?: string; title: any }[]
  locale: 'en' | 'pt'
  setOpen: (open: boolean) => void
}) {
  if (!nav) return null
  return (
    <>
      {nav.map(
        (item) =>
          item.href && (
            <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
              {getObjectValueByLocale(item.title, locale)}
            </MobileLink>
          )
      )}
    </>
  )
}

export function MobileNav({ messages, menuLinks }: MobileNavProps) {
  const pathname = usePathname()
  const hooksConfig = useTypedHooksConfig()
  const formConfig = useFormConfig()
  // Add more configs as needed

  const [open, setOpen] = useState(false)

  // Define your sections in an array
  const sections = [
    {
      mainNav: hooksConfig.hooks.mainNav,
      sidebarNav: hooksConfig.hooks.sidebarNav,
      locale: hooksConfig.currentLocale,
      showSidebar: pathname.startsWith('/typed-hooks'),
    },
    {
      mainNav: formConfig.form.mainNav,
      sidebarNav: formConfig.form.sidebarNav,
      locale: formConfig.currentLocale,
      showSidebar: pathname.startsWith('/form'),
    },
    // Add more sections here if needed
  ]

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
          <span className="font-bold">{siteConfig.title}</span>
        </MobileLink>

        {menuLinks && (
          <div className="flex phone:hidden flex-col space-y-2 items-end pr-2">
            {menuLinks}
          </div>
        )}

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {sections.map((section, idx) => (
              <div key={idx}>
                <RenderNavLinks
                  nav={section.mainNav}
                  locale={section.locale}
                  setOpen={setOpen}
                />
                {section.showSidebar && (
                  <DocsSidebarNav
                    isMobile
                    locale={section.locale}
                    items={section.sidebarNav}
                    handleMobileSidebar={setOpen}
                  />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
