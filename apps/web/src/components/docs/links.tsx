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

  const linksArray: [string, string][] = Object.entries(links.links)
    .filter(([, value]) => typeof value === 'string' && value)
    .map(([key, value]) => [key, value as string])

  return (
    <div className="flex items-center space-x-2 pt-4">
      {linksArray.map(([key, value]) => (
        <Link
          key={key}
          href={value}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          {key}
          <ExternalLinkIcon className="size-3" />
        </Link>
      ))}
    </div>
  )
}
