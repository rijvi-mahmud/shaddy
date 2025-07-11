import { getTranslations } from 'next-intl/server'

import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

export async function SiteFooter() {
  const t = await getTranslations('site.footer')

  return (
    <footer className="py-6 md:px-4 md:py-0">
      <div className="container flex justify-between items-center gap-4 md:h-24 ">
        <p className="text-muted-foreground text-balance text-center text-sm leading-loose md:text-left">
          {t('created_by')}{' '}
          <Link
            href={siteConfig.author.site}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.author.name}
          </Link>
        </p>
        <div className="flex gap-4">
          <Link
            href="/vision"
            className={cn(
              'hover:text-foreground/80 transition-colors text-foreground/60'
            )}
          >
            {t('links.vision')}
          </Link>
          <Link
            href="/contributors"
            className={cn(
              'hover:text-foreground/80 transition-colors text-foreground/60'
            )}
          >
            {t('links.contributors')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
