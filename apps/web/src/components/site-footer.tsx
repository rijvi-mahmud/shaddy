import { getTranslations } from 'next-intl/server'

import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { BuyMeCoffee } from './ui/bmc'
import { Separator } from './ui/separator'
import { Logo } from './ui/logo'

export async function SiteFooter() {
  const t = await getTranslations('site.footer')

  return (
    <footer id="footer" className="container py-8 sm:py-12">
      <div className="p-10 bg-secondary/40 rounded-2xl backdrop-blur-sm border border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Logo />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm tracking-tight mb-1">
              Contact
            </h3>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Github
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm tracking-tight mb-1">
              Platforms
            </h3>
            <Link
              href="/vision"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('links.vision')}
            </Link>
            <Link
              href="/contributors"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('links.contributors')}
            </Link>
            <BuyMeCoffee />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm tracking-tight mb-1">Help</h3>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Feedback
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm tracking-tight mb-1">
              Socials
            </h3>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitch
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dribbble
            </Link>
          </div>
        </div>

        <Separator className="my-6" />
        <section>
          <p className="text-muted-foreground text-balance text-center text-sm leading-loose md:text-left">
            {t('created_by')}{' '}
            <Link
              href={siteConfig.author.site}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              {siteConfig.author.name}
            </Link>
          </p>
        </section>
      </div>
    </footer>
  )
}
