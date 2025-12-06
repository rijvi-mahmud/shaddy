'use client'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { Marquee } from '@/components/ui/marquee'

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
]

const SponsorCard = ({ icon, name }: sponsorsProps) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-md bg-card hover:bg-accent transition-colors">
      <LucideIcon
        name={icon as keyof typeof icons}
        size={32}
        className="text-muted-foreground"
      />
      <span className="text-base font-medium">{name}</span>
    </div>
  )
}

export const OurSponsors = () => {
  return (
    <section id="sponsors" className="py-14 sm:py-18 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Sponsors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join these incredible organizations in supporting open source
            innovation
          </p>
        </div>

        <div className="relative">
          {/* Left gradient overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

          {/* Right gradient overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <Marquee pauseOnHover className="[--gap:1rem]">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.name} {...sponsor} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
