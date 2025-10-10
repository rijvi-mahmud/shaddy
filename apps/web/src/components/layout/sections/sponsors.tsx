'use client'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { Marquee } from '@/components/ui/marquee'
import { Link } from '@/navigation'

import { icons } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

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

const SponsorCard = ({
  icon,
  name,
  index,
}: sponsorsProps & { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex items-center gap-3 px-6 py-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 min-w-[200px]"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <LucideIcon
          name={icon as keyof typeof icons}
          size={32}
          className="text-primary"
        />
      </motion.div>
      <span className="text-lg font-semibold text-foreground">{name}</span>
    </motion.div>
  )
}

const SponsorButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    mouseX.set(offsetX * 0.15)
    mouseY.set(offsetY * 0.15)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <Link href="/sponsor">
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x, y }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="group relative px-8 py-4 font-semibold text-base overflow-hidden rounded-lg border border-border/50 bg-background hover:border-primary/50 transition-colors duration-500"
      >
        {/* Subtle glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 animate-gradient-rotate"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Button text */}
        <span className="relative z-10 text-foreground group-hover:text-primary transition-colors duration-300">
          Become a Sponsor
        </span>
      </motion.button>
    </Link>
  )
}

export const OurSponsors = () => {
  return (
    <section id="sponsors" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary"
          >
            Our Sponsors
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
            Powered by Amazing Supporters
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join these incredible organizations in supporting open source
            innovation
          </p>
        </motion.div>

        {/* Sponsors Marquee */}
        <div className="mb-16">
          <Marquee className="gap-6" fade={false} pauseOnHover={true}>
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={sponsor.name} {...sponsor} index={index} />
            ))}
          </Marquee>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-3">
                Want to see your logo here?
              </h3>
              <p className="text-muted-foreground mb-6">
                Support our mission and get your brand in front of thousands of
                developers worldwide
              </p>
            </div>
            <SponsorButton />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
