import { LucideIcon } from '@/components/ui/lucide-icon'
import { Link } from '@/navigation'
import { icons } from 'lucide-react'

interface BenefitProps {
  name: string
  title: string
  icon: keyof typeof icons
  description: string
  href: string
}

const benefits: BenefitProps[] = [
  {
    name: 'typed-hooks',
    title: 'Typed Hooks',
    icon: 'Webhook',
    description: 'Reusable React hooks for common patterns',
    href: '/typed-hooks',
  },
  {
    name: 'forms',
    title: 'Form',
    icon: 'FileText',
    description: 'Built on RHF & shadcn/ui',
    href: '/form',
  },
  {
    name: 'components',
    title: 'Components',
    icon: 'Blocks',
    description: 'Ready-to-use components',
    href: '/ui',
  },
  {
    name: 'utils',
    title: 'Utils',
    icon: 'Wrench',
    description: 'React/Next.js utility functions',
    href: '/utils',
  },
  {
    name: 'table',
    title: 'Table',
    icon: 'Table',
    description: 'Advanced data tables',
    href: '/table',
  },
]

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frameworks, Components & Utilities
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Production ready, type safe, easy to use resources for your next app.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map(({ name, title, icon, description, href }) => (
          <Link key={name} href={href}>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border/50 hover:border-border hover:bg-accent/50 transition-all group h-full">
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <LucideIcon name={icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
