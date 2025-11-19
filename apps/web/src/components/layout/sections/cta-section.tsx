import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { LucideIcon } from '@/components/ui/lucide-icon'

export function CTASection() {
  return (
    <section id="cta" className="container py-24 sm:py-32">
      <div className="p-12 md:p-16 lg:p-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Join our community and start building production-ready
              applications today. Everything you need is just a command away.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/typed-hooks">
              <Button size="lg" className="text-base px-8">
                <LucideIcon name="Rocket" size={16} className="mr-2" />
                Get Started
              </Button>
            </Link>

            <Link
              href={siteConfig.links.github.url}
              target="_blank"
              rel="noreferrer"
            >
              <Button size="lg" variant="outline" className="text-base px-8">
                <Icons.gitHub className="mr-2 size-4" />
                View on GitHub
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="pt-8 flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <LucideIcon name="Check" size={12} className="text-primary" />
              </div>
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <LucideIcon name="Check" size={12} className="text-primary" />
              </div>
              <span>MIT Licensed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <LucideIcon name="Check" size={12} className="text-primary" />
              </div>
              <span>Free Forever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
