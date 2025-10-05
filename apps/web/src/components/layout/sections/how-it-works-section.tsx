import { Badge } from '@/components/ui/badge'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { icons } from 'lucide-react'

interface StepProps {
  number: string
  icon: keyof typeof icons
  title: string
  description: string
}

const steps: StepProps[] = [
  {
    number: '01',
    icon: 'Download',
    title: 'Install',
    description:
      'Get started quickly with npm or yarn. All components are tree-shakeable for optimal bundle size.',
  },
  {
    number: '02',
    icon: 'Palette',
    title: 'Customize',
    description:
      'Tailor components to your brand with our powerful theming system. Full control over colors and styles.',
  },
  {
    number: '03',
    icon: 'Rocket',
    title: 'Deploy',
    description:
      'Ship your application with confidence. Optimized for production and ready to scale.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="container py-24 sm:py-32 bg-muted/30">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          How It Works
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get Started in 3 Simple Steps
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From installation to deployment, we've streamlined the entire process
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {steps.map(({ number, icon, title, description }, index) => (
          <div key={title} className="relative">
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-border/50" />
            )}
            <div className="text-center relative">
              <div className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {number}
                </span>
                <LucideIcon name={icon} size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
