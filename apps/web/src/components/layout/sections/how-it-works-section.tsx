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
    <section id="how-it-works" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get Started in 3 Simple Steps
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From installation to deployment, we've streamlined the entire process
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {steps.map(({ number, icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <LucideIcon name={icon} size={28} className="text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {number}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
