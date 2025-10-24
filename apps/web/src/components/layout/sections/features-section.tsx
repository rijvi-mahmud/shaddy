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
]

export function FeaturesSection() {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border text-sm font-medium">
          Features
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Powerful features designed to help you build better applications
          faster
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon, title, description }) => (
          <Card
            key={title}
            className="h-full transition-colors hover:border-primary/50"
          >
            <CardHeader>
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <LucideIcon name={icon} size={24} className="text-primary" />
              </div>
              <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
