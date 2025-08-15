import { getTranslations, setRequestLocale } from 'next-intl/server'

import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { Announcement } from '@/components/announcement'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

import {
  PageHeader,
  PageActions,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'
import Image from 'next/image'
import { ProductHuntBadge } from '@/components/ui/product-hunt-badge'

export const dynamicParams = true

export default async function IndexPage({
  params,
}: {
  params: { locale: LocaleOptions }
}) {
  setRequestLocale(params.locale)

  const t = await getTranslations()

  return (
    <div className="container">
      <PageHeader className="h-lvh relative isolate flex items-center justify-center">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <ProductHuntBadge />
        {/* <Announcement title={t('site.announcement')} href="/" /> */}

        <PageHeaderHeading>
          <TextGenerateEffect words={t('site.title')} />
          <TextGenerateEffect words={t('site.heading')} />
        </PageHeaderHeading>

        <PageHeaderDescription>{t('site.description')}</PageHeaderDescription>

        <PageActions className="flex-wrap gap-3 sm:gap-0">
          <Link href="/typed-hooks" className={cn(buttonVariants())}>
            {t('site.buttons.get_started')}
          </Link>

          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github.url}
            title={siteConfig.links.github.label}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.gitHub className="mr-2 size-4" />
            {siteConfig.links.github.label}
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  )
}
