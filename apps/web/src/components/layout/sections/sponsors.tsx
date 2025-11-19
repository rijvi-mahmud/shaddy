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
    <div className="flex items-center gap-3 px-4 py-3 rounded-md border bg-card hover:bg-accent transition-colors">
      <LucideIcon
        name={icon as keyof typeof icons}
        size={24}
        className="text-muted-foreground"
      />
      <span className="text-sm font-medium">{name}</span>
    </div>
  )
}

export const OurSponsors = () => {
  return (
    <section id="sponsors" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Sponsors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join these incredible organizations in supporting open source
            innovation
          </p>
        </div>

        <Marquee pauseOnHover className="[--gap:1rem]">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} {...sponsor} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
