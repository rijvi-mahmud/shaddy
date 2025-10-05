import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LucideIcon } from '@/components/ui/lucide-icon'

interface TestimonialProps {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

const testimonials: TestimonialProps[] = [
  {
    quote:
      'This has completely transformed how we build our products. The component library is exactly what we needed.',
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow',
    avatar: 'SC',
  },
  {
    quote:
      "The best developer experience I've had. Documentation is clear, components are beautiful, and it just works.",
    author: 'Alex Rodriguez',
    role: 'Lead Developer',
    company: 'StartupHub',
    avatar: 'AR',
  },
  {
    quote:
      'We shipped our MVP 3x faster than expected. The type safety and modern patterns saved us countless hours.',
    author: 'Maya Patel',
    role: 'Product Manager',
    company: 'InnovateCo',
    avatar: 'MP',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Loved by Developers
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join thousands of developers who are building amazing products with
          our tools
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map(({ quote, author, role, company, avatar }) => (
          <Card key={author} className="border-border/50">
            <CardContent className="pt-6">
              <div className="mb-4">
                <LucideIcon
                  name="Quote"
                  size={24}
                  className="text-primary/60"
                />
              </div>
              <p className="text-muted-foreground mb-6">{quote}</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{author}</p>
                  <p className="text-sm text-muted-foreground">
                    {role} at {company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
