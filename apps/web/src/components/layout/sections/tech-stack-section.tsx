import { Icons } from '@/components/icons'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { icons } from 'lucide-react'

interface TechStackProps {
  name: string
  description: string
  icon?: keyof typeof Icons
  lucideIcon?: keyof typeof icons
}

const techStack: TechStackProps[] = [
  {
    icon: 'react',
    name: 'React 19',
    description: 'Latest React with concurrent features',
  },
  {
    name: 'Next.js 15',
    description: 'App Router with Server Components',
    lucideIcon: 'Box',
  },
  {
    icon: 'tailwind',
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe development',
    lucideIcon: 'Code',
  },
  {
    name: 'shadcn/ui',
    description: 'Beautifully designed components',
    lucideIcon: 'Component',
  },
  {
    name: 'Zod',
    description: 'TypeScript-first schema validation',
    lucideIcon: 'ShieldCheck',
  },
]

export const TechStackSection = () => {
  return (
    <section id="tech-stack" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Built on Modern Technologies
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Powered by the latest and most reliable tools in the ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {techStack.map(({ icon, lucideIcon, name, description }) => {
          const Icon = icon ? Icons[icon] : null
          return (
            <div
              key={name}
              className="flex flex-col items-center text-center p-6 rounded-lg border border-border/50 hover:border-border hover:bg-accent/50 transition-all group"
            >
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {Icon && <Icon className="size-6 text-primary" />}
                {lucideIcon && (
                  <LucideIcon
                    name={lucideIcon}
                    size={24}
                    className="text-primary"
                  />
                )}
              </div>
              <h3 className="font-semibold mb-2">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
