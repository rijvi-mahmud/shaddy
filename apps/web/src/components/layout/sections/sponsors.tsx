'use client'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { Marquee } from '@/components/ui/marquee'
import { Link } from '@/navigation'

import { icons } from 'lucide-react'

interface sponsorsProps {
  icon: string
  name: string
}

const sponsors: sponsorsProps[] = [
  {
    icon: 'Crown',
    name: 'Acmebrand',
  },
  {
    icon: 'Vegan',
    name: 'Acmelogo',
  },
  {
    icon: 'Ghost',
    name: 'Acmesponsor',
  },
  {
    icon: 'Puzzle',
    name: 'Acmeipsum',
  },
  {
    icon: 'Squirrel',
    name: 'Acme',
  },
  {
    icon: 'Cookie',
    name: 'Accmee',
  },
  {
    icon: 'Drama',
    name: 'Acmetech',
  },
]

const SponsorCard = ({ icon, name }: sponsorsProps) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-lg border border-border/50 bg-card/30 hover:border-primary/40 hover:bg-card/60 transition-colors duration-200 min-w-[220px]">
      <LucideIcon
        name={icon as keyof typeof icons}
        size={32}
        className="text-primary/80"
      />
      <span className="text-base font-medium text-foreground">{name}</span>
    </div>
  )
}

const SponsorButton = () => {
  return (
    <Link href="/sponsor">
      <button className="px-6 py-2.5 font-medium text-sm rounded-lg border border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary hover:border-primary transition-all duration-200">
        Become a Sponsor
      </button>
    </Link>
  )
}

export const OurSponsors = () => {
  return (
    <section id="sponsors" className="relative py-12 sm:py-16 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary">
            Our Sponsors
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Powered by Amazing Supporters
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Join these incredible organizations in supporting open source
            innovation
          </p>
        </div>

        {/* Sponsors Marquee */}
        <div className="mb-8">
          <Marquee className="gap-4" pauseOnHover={true}>
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.name} {...sponsor} />
            ))}
          </Marquee>
        </div>

        {/* Compact CTA Section */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-1">
                Want to see your logo here?
              </h3>
              <p className="text-muted-foreground text-sm">
                Support our mission and get visibility to thousands of
                developers
              </p>
            </div>
            <SponsorButton />
          </div>
        </div>
      </div>
    </section>
  )
}
