import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import type { NavItem, NavItemWithChildren } from '@/lib/shaddy/types/nav'
import type { LocaleOptions } from '@/lib/shaddy/types/i18n'

import {
  getSlugWithoutLocale,
  getObjectValueByLocale,
} from '@/lib/shaddy/utils/locale'

import { getServerDocsConfig } from '@/lib/shaddy/utils/get-server-docs-config'
import { buttonVariants } from '../ui/button'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'
import { DocsConfig } from '@/lib/shaddy/types/docs'

interface DocsPagerProps {
  doc: {
    slugAsParams: string
    slug: string
  }
  locale: LocaleOptions
  config: DocsConfig
  slugFor: string
}

export async function DocsPager({
  doc,
  locale,
  config,
  slugFor,
}: DocsPagerProps) {
  const pager = await getPagerForCurrentDoc({
    doc,
    locale,
    config,
    slugFor,
  })

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ChevronLeftIcon className="mr-2 size-4" />

          {getObjectValueByLocale(pager.prev.title, pager.currentLocale)}
        </Link>
      )}

      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: 'outline' }), 'ml-auto')}
        >
          {getObjectValueByLocale(pager.next.title, pager.currentLocale)}

          <ChevronRightIcon className="ml-2 size-4" />
        </Link>
      )}
    </div>
  )
}

export async function getPagerForCurrentDoc({
  doc,
  locale,
  config,
  slugFor,
}: {
  doc: {
    slugAsParams: string
    slug: string
  }
  locale: LocaleOptions
  config: DocsConfig
  slugFor: string
}) {
  const docsConfig = await getServerDocsConfig({ locale, config })
  const flattenedLinks = [null, ...flatten(docsConfig.docs.sidebarNav), null]

  const slugWithoutLocaleFolder = getSlugWithoutLocale(doc.slug, slugFor)

  const activeIndex = flattenedLinks.findIndex(
    (link) => slugWithoutLocaleFolder === link?.href
  )

  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null

  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null

  return {
    prev,
    next,
    currentLocale: docsConfig.currentLocale,
  }
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return [
        ...flat,
        ...(link.href ? [link] : []),
        ...(link.items?.length > 0 ? flatten(link.items) : []),
      ]
    }, [])
    .filter((link) => !link?.disabled)
}
