import { getTranslations } from 'next-intl/server'
import { ExternalLinkIcon } from 'lucide-react'

import { badgeVariants } from '../ui/badge'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'
import { LinksProperties } from 'contentlayer/generated'

export async function DocLinks({
  links,
}: {
  links: LinksProperties | undefined
}) {
  if (!links) {
    return null
  }

  const t = await getTranslations()

  return (
    <div className="flex items-center space-x-2 pt-4">
      {links.source && (
        <Link
          href={links.source}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          {t('docs.source')}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}

      {links.doc && (
        <Link
          href={links.doc}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          {t('docs.docs')}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}

      {links.api && (
        <Link
          href={links.api}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          {t('docs.api_reference')}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}

      {links.blog && (
        <Link
          href={links.blog}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          {t('site.words.blog')}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}
    </div>
  )
}
