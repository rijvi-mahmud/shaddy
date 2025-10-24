'use client'

import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Featured resources to showcase
const featuredComponents = [
  {
    name: 'typed-hooks',
    title: 'Typed Hooks',
    category: 'Hooks',
    description: 'Reusable React hooks for common patterns',
    href: '/typed-hooks',
  },
  {
    name: 'forms',
    title: 'Form',
    category: 'Framework',
    description: 'Built on RHF & shadcn/ui',
    href: '/form',
  },
  {
    name: 'components',
    title: 'Components',
    category: 'Component',
    description: 'Ready-to-use components',
    href: '/ui',
  },
  {
    name: 'utils',
    title: 'Utils',
    category: 'Utils',
    description: 'React/Next.js utility functions',
    href: '/utils',
  },
  {
    name: 'table',
    title: 'Table',
    category: 'Framework',
    description: 'Coming soon - Advanced data tables',
    href: '/table',
  },
]

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Development Resources
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frameworks, Components & Utilities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Production ready, type safe, easy to use resources for your next
            app.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {featuredComponents.map((component) => {
            return (
              <Link
                key={component.name}
                href={component.href}
                className="group w-full text-left p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {component.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                      {component.title}
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {component.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
