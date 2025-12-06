import { getTranslations } from 'next-intl/server'
import { ArrowRight, Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

export const HeroSection = async () => {
  const t = await getTranslations()

  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-24 lg:py-32">
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={0.6}
        className={cn(
          '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
          'fill-muted-foreground/30'
        )}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            {t('site.title')} <br />
            <span className="text-primary">{t('site.heading')}</span>
          </h1>

          <p className="max-w-[600px] text-muted-foreground text-lg sm:text-xl leading-relaxed">
            {t('site.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/typed-hooks" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                {t('site.buttons.get_started')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href={siteConfig.links.github.url}
              target="_blank"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
