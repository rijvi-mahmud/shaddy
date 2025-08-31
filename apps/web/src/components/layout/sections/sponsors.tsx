'use client'
import { Icons } from '@/components/icons'
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
  {
    icon: 'Drama',
    name: 'Acmetech',
  },
]

export const OurSponsors = () => {
  return (
    <section id="sponsors" className="max-w-6xl mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Our Platinum Sponsors
      </h2>

      <div className="mx-auto">
        <Marquee className="gap-[3rem]" fade={true}>
          {sponsors.map(({ icon, name }) => {
            return (
              <div
                key={name}
                className="flex items-center text-xl md:text-2xl font-medium"
              >
                <LucideIcon
                  name={icon as keyof typeof icons}
                  size={32}
                  color="white"
                  className="mr-2"
                />
                {name}
              </div>
            )
          })}
        </Marquee>
      </div>
    </section>
  )
}
