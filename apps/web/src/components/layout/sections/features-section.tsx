'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { icons } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeatureProps {
  icon: keyof typeof icons
  title: string
  description: string
}

const features: FeatureProps[] = [
  {
    icon: 'Zap',
    title: 'Lightning Fast',
    description:
      'Built with performance in mind. Experience blazing-fast load times and smooth interactions.',
  },
  {
    icon: 'Shield',
    title: 'Type Safe',
    description:
      'Full TypeScript support ensures your code is robust and error-free from development to production.',
  },
  {
    icon: 'Palette',
    title: 'Beautiful UI',
    description:
      'Crafted with modern design principles using shadcn/ui components for a stunning user experience.',
  },
  {
    icon: 'Blocks',
    title: 'Modular Components',
    description:
      'Reusable, composable components that adapt to your needs. Build faster with less code.',
  },
  {
    icon: 'Moon',
    title: 'Dark Mode',
    description:
      'Built-in dark mode support with seamless theme switching for better user experience.',
  },
  {
    icon: 'Globe',
    title: 'i18n Ready',
    description:
      'Internationalization built-in with next-intl for seamless multi-language support.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary"
        >
          Features
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Powerful features designed to help you build better applications
          faster
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map(({ icon, title, description }, index) => (
          <motion.div key={title} variants={item}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Card className="border-border/50 hover:border-primary/30 transition-colors h-full bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <motion.div
                    className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <LucideIcon
                        name={icon}
                        size={24}
                        className="text-primary relative z-10"
                      />
                    </motion.div>
                  </motion.div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
