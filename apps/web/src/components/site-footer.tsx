import { getTranslations } from 'next-intl/server'

import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'
import { BuyMeCoffee } from './ui/bmc'
import { Separator } from './ui/separator'
import { ChevronsDownIcon } from 'lucide-react'
import { Logo } from './ui/logo'

export async function SiteFooter() {
  const t = await getTranslations('site.footer')

  return (
    <footer id="footer" className="container py-8 sm:py-12">
      <div className="p-10 bg-secondary/40 rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Logo />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Github
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Instagram
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Platforms</h3>
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
            <BuyMeCoffee />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Help</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Feedback
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Socials</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitch
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Discord
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Dribbble
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
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
        </section>
      </div>
    </footer>
  )
}
