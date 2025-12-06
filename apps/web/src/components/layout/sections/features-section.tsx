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
    <section id="features" className="container py-20 sm:py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Powerful features designed to help you build better applications
          faster
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-6 rounded-lg border border-border/50 hover:border-border hover:bg-accent/50 transition-all group"
          >
            <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <LucideIcon name={icon} size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
