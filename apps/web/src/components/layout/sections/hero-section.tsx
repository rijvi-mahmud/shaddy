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

import { ProductHuntBadge } from '@/components/ui/product-hunt-badge'

export const HeroSection = async () => {
  const t = await getTranslations()
  return (
    <PageHeader className="h-lvh relative isolate flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Dot grid pattern - premium feel */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage:
              'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          }}
        />

        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/5 to-background/80" />

        {/* Center spotlight effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Product Hunt Badge */}
      <ProductHuntBadge mode="dark" />
      {/* <Announcement title={t('site.announcement')} href="/" /> */}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-5 max-w-5xl mx-auto px-6">
        {/* Heading with premium styling */}
        <div className="relative">
          {/* Glow effect behind heading */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/20 to-transparent blur-3xl animate-pulse-glow" />

          <PageHeaderHeading className="relative text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <div className="bg-clip-text text-transparent bg-linear-to-b from-foreground via-foreground/90 to-foreground/70 dark:from-white dark:via-white/90 dark:to-white/70">
              <TextGenerateEffect words={t('site.title')} />
              <div className="mt-1.5">
                <TextGenerateEffect words={t('site.heading')} />
              </div>
            </div>
          </PageHeaderHeading>
        </div>

        {/* Description with better spacing */}
        <PageHeaderDescription className="text-base md:text-lg max-w-2xl leading-relaxed text-muted-foreground/90">
          {t('site.description')}
        </PageHeaderDescription>

        {/* CTA buttons with premium interactions */}
        <PageActions className="flex-wrap gap-3 mt-2">
          <Link
            href="/typed-hooks"
            className={cn(
              buttonVariants({ size: 'default' }),
              'group relative h-10 px-6 text-sm font-semibold overflow-hidden rounded-lg',
              'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40',
              'transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]'
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('site.buttons.get_started')}
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          </Link>

          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github.url}
            title={siteConfig.links.github.label}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'default' }),
              'group h-10 px-6 text-sm font-semibold rounded-lg',
              'backdrop-blur-xs bg-background/30 hover:bg-background/60',
              'border border-border/60 hover:border-border',
              'shadow-md hover:shadow-lg',
              'transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]'
            )}
          >
            <Icons.gitHub className="mr-2 size-4 transition-transform duration-300 group-hover:rotate-12" />
            {siteConfig.links.github.label}
          </Link>
        </PageActions>

        {/* Optional: Trust indicators or stats */}
        <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground/70">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Open Source</span>
          </div>
          <div className="h-4 w-px bg-border/50" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Type-Safe</span>
          </div>
          <div className="h-4 w-px bg-border/50" />
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Lightning Fast</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </PageHeader>
  )
}
