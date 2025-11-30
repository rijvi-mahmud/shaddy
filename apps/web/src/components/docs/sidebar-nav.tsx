'use client'

import { Fragment } from 'react'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'
import type { SidebarNavItem } from '@/lib/shaddy/types/nav'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

import { getObjectValueByLocale } from '@/lib/shaddy/utils/locale'
import { usePathname, Link as DesktopLink } from '@/navigation'
import { MobileLink } from '../mobile-link'
import { cn } from '@/lib/utils'

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
  locale: LocaleOptions
  isMobile?: boolean
  handleMobileSidebar?: (state: boolean) => void
}

export function DocsSidebarNav({
  items,
  locale,
  isMobile,
  handleMobileSidebar,
}: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length > 0 ? (
    <div
      className={cn(
        !isMobile && 'w-full',
        isMobile && 'flex flex-col space-y-3 pt-2 pr-3'
      )}
    >
      {items.map((item, index) => (
        <div key={index} className={cn('pb-6')}>
          <h4
            className={cn(
              !isMobile &&
                'mb-2 rounded-md px-2 py-1 text-sm font-semibold tracking-tight',
              isMobile && 'font-medium'
            )}
          >
            {getObjectValueByLocale(item.title, locale)}
          </h4>
          {item?.items?.length > 0 && (
            <DocsSidebarNavItems
              items={item.items}
              locale={locale}
              pathname={pathname}
              isMobile={isMobile}
              handleMobileSidebar={handleMobileSidebar}
            />
          )}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  locale: LocaleOptions
  pathname: string | null
  isMobile?: boolean
  handleMobileSidebar?: (state: boolean) => void
}

const accordionsStates = new Map<string, boolean>()

export function DocsSidebarNavItems({
  items,
  pathname,
  locale,
  isMobile,
  handleMobileSidebar,
}: DocsSidebarNavItemsProps) {
  const Link = !isMobile ? DesktopLink : MobileLink

  function toggleAccordionState(id: string) {
    accordionsStates.set(id, !accordionsStates.get(id))
  }

  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm gap-0.5">
      {items.map((item) => {
        const ChildrenComponent = () => {
          const activeChild = item?.items?.find(
            (childItem) => childItem.href === pathname
          )

          return (
            item.items.length > 0 && (
              <Accordion
                type="single"
                className="py-2"
                collapsible
                onValueChange={() =>
                  toggleAccordionState(
                    getObjectValueByLocale(item.title, locale)
                  )
                }
                defaultValue={
                  activeChild?.title ||
                  accordionsStates.get(
                    getObjectValueByLocale(item.title, locale)
                  )
                    ? getObjectValueByLocale(item.title, locale)
                    : ''
                }
              >
                <AccordionItem
                  value={getObjectValueByLocale(item.title, locale)}
                >
                  <AccordionTrigger className="py-0 pb-3">
                    <h4 className="flex items-center gap-2 rounded-md pl-4 text-sm font-semibold">
                      {getObjectValueByLocale(item.title, locale)}

                      {item.label && (
                        <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-border transition-colors group-hover:bg-accent/80">
                          {getObjectValueByLocale(item.label, locale)}
                        </span>
                      )}
                    </h4>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="pl-4">
                      <DocsSidebarNavItems
                        items={item.items}
                        locale={locale}
                        pathname={pathname}
                        isMobile={isMobile}
                        handleMobileSidebar={handleMobileSidebar}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          )
        }

        const key =
          getObjectValueByLocale(item.title, locale) + item.href! + pathname

        const props =
          isMobile && item.href ? { onOpenChange: handleMobileSidebar } : {}

        return item.href && !item.disabled ? (
          <Fragment key={key}>
            <Link
              href={item.href}
              {...props}
              className={cn(
                'group my-1 ml-2 flex h-8 items-center gap-2 rounded-md px-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                item.disabled && 'cursor-not-allowed opacity-60',
                pathname?.endsWith(item.href)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              )}
              target={item.external ? '_blank' : ''}
              rel={item.external ? 'noreferrer' : ''}
            >
              {getObjectValueByLocale(item.title, locale)}

              {item.label && (
                <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-border transition-colors group-hover:bg-accent/80">
                  {getObjectValueByLocale(item.label, locale)}
                </span>
              )}
            </Link>
          </Fragment>
        ) : (
          <Fragment key={key}>
            <ChildrenComponent />
          </Fragment>
        )
      })}
    </div>
  ) : null
}
