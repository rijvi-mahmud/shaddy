import { ChevronRightIcon } from 'lucide-react'
import { Fragment } from 'react'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'

import { getObjectValueByLocale } from '@/lib/shaddy/utils/locale'
import { getBreadcrumb } from '@/lib/shaddy/utils/doc'
import { defaultLocale } from '@/config/i18n'
import { Link } from '@/navigation'
import { DocsConfig } from '@/lib/shaddy/types/docs'

interface DocBreadcrumbProps {
  doc: {
    slugAsParams: string
    slug: string
  }

  messages: {
    docs: string
  }
  docsConfig: DocsConfig
  rootPath: string
}

export function DocBreadcrumb({
  doc,
  messages,
  docsConfig,
  rootPath,
}: DocBreadcrumbProps) {
  const [locale] = (doc.slugAsParams.split('/') || defaultLocale) as [
    LocaleOptions,
  ]

  const breadcrumbItems = getBreadcrumb(doc.slug, docsConfig, rootPath)
  return (
    <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
      <Link href="/docs" className="text-foreground hover:underline">
        {messages.docs}
      </Link>

      {breadcrumbItems?.map((item, index, items) => {
        const isLastItem = index === items.length - 1
        const docTitle = getObjectValueByLocale(item.title, locale)

        return (
          <Fragment key={index}>
            <ChevronRightIcon className="size-4" />

            {item.href && !isLastItem ? (
              <Link
                href={item.href}
                className="truncate text-foreground font-medium hover:underline"
              >
                {docTitle}
              </Link>
            ) : (
              <span className="truncate">{docTitle}</span>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
