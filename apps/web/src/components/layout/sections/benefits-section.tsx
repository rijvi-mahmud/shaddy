import { Badge } from '@/components/ui/badge'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { icons } from 'lucide-react'

interface BenefitProps {
  icon: keyof typeof icons
  title: string
  description: string
}

const benefits: BenefitProps[] = [
  {
    icon: 'Code',
    title: 'Developer First',
    description:
      'Built by developers, for developers. Intuitive APIs and excellent documentation make integration a breeze.',
  },
  {
    icon: 'Rocket',
    title: 'Ship Faster',
    description:
      'Pre-built components and utilities help you go from idea to production in record time.',
  },
  {
    icon: 'Sparkles',
    title: 'Modern Stack',
    description:
      'Leveraging the latest technologies: Next.js 15, React 19, TypeScript, and Tailwind CSS.',
  },
]

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <Badge variant="outline" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Build Production-Ready Apps in Minutes
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Stop reinventing the wheel. Our carefully crafted components and
            utilities are battle-tested and ready to use in your next project.
            Focus on what makes your app unique.
          </p>

          <div className="space-y-6">
            {benefits.map(({ icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LucideIcon name={icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 flex items-center justify-center">
            <div className="relative w-full h-full rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-6 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <LucideIcon name="Box" size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold">50+ Components</h3>
                <p className="text-muted-foreground">
                  Ready to use in your projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
