'use client'

import { useState, useRef, forwardRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Zap,
  Users,
  Trophy,
  Mail,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import { TextField } from '@/registry/default/form/fields/text-field'
import { TextAreaField } from '@/registry/default/form/fields/text-area-field'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { SelectField } from '@/registry/default/form/fields/select-field'
import { z } from 'zod'
import type { ShaddyFormRef } from '@/registry/default/form/shaddy-form'
import { sponsorshipTiers, quickLinks, tierOptions } from '@/config/sponsorship'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const contactFormSchema = z.object({
  tier: z.string().default('general'),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

const initialContactValues: ContactFormData = {
  tier: 'general',
  name: '',
  email: '',
  company: '',
  message: '',
}

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
}

function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-12', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}

interface TierCardProps {
  tier: {
    name: string
    price: string
    icon: LucideIcon
    color: string
    bgColor: string
    popular?: boolean
    benefits: string[]
  }
  onSelect: (tierName: string) => void
}

function TierCard({ tier, onSelect }: TierCardProps) {
  const Icon = tier.icon

  return (
    <Card
      className={cn(
        'relative group transition-all duration-500 ease-out border-border/50',
        tier.popular && 'border-primary shadow-lg ring-2 ring-primary/20'
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}

      <CardContent className="p-6 grid grid-rows-subgrid row-span-3 gap-0">
        <div className="space-y-4 pb-6">
          <div
            className={cn(
              'inline-flex p-3 rounded-xl transition-transform duration-300 ease-out group-hover:scale-110',
              tier.bgColor
            )}
          >
            <Icon
              className={cn('h-6 w-6 transition-all duration-300', tier.color)}
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">
              {tier.name}
            </h3>
            <p className="text-3xl font-extrabold text-foreground transition-colors duration-300">
              {tier.price}
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </p>
          </div>
        </div>

        <ul className="space-y-3 pb-6">
          {tier.benefits.map((benefit, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground"
              style={{
                transitionDelay: `${idx * 30}ms`,
              }}
            >
              <CheckCircle2
                className="h-4 w-4 text-primary shrink-0 mt-0.5"
                style={{
                  transitionDelay: `${idx * 30}ms`,
                }}
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            className="w-full transition-all duration-300 ease-out group-hover:shadow-lg"
            variant={tier.popular ? 'default' : 'outline'}
            onClick={() => onSelect(tier.name)}
          >
            Choose {tier.name}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface SponsorshipTiersProps {
  onTierSelect: (tierName: string) => void
}

function SponsorshipTiers({ onTierSelect }: SponsorshipTiersProps) {
  return (
    <div className="mb-20">
      <SectionHeader
        title="Sponsorship Tiers"
        description="Choose a tier that works for you. All contributions make a difference."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 [&>*]:grid [&>*]:grid-rows-subgrid [&>*]:row-span-3">
        {sponsorshipTiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} onSelect={onTierSelect} />
        ))}
      </div>
    </div>
  )
}

interface QuickLinkCardProps {
  link: {
    title: string
    description: string
    icon: LucideIcon
    color: string
    href: string
  }
}

function QuickLinkCard({ link }: QuickLinkCardProps) {
  const Icon = link.icon

  return (
    <Card className="group transition-all duration-500 ease-out border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={cn(
              'p-4 rounded-full transition-all duration-300',
              link.color.replace('text-', 'bg-') + '/10'
            )}
          >
            <Icon
              className={cn('h-6 w-6 transition-all duration-300', link.color)}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-lg transition-colors duration-300 group-hover:text-primary">
              {link.title}
            </h3>
            <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {link.description}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full transition-all duration-300 ease-out"
            asChild
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Visit Platform
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function QuickLinksSection() {
  return (
    <div className="mb-20">
      <SectionHeader
        title="Quick Sponsorship Links"
        description="Choose your preferred platform to support us"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {quickLinks.map((link) => (
          <QuickLinkCard key={link.title} link={link} />
        ))}
      </div>
    </div>
  )
}

interface ContactFormProps {
  formRef: React.RefObject<ShaddyFormRef<ContactFormData>>
  isSubmitting: boolean
  isSubmitted: boolean
  onSubmit: (data: ContactFormData) => Promise<void>
}

const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(
  ({ formRef, isSubmitting, isSubmitted, onSubmit }, ref) => {
    return (
      <div ref={ref} className="max-w-3xl mx-auto mt-20">
        <SectionHeader
          title="Have Questions?"
          description="Not sure which tier is right for you? Reach out and we'll help you choose."
          className="mb-8"
        />

        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-8">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-green-500/10 mb-2">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  We've received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-4 rounded-full bg-primary/10">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Contact Us Directly
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a tier above to auto-fill, or fill out the form
                    below.
                  </p>
                </div>

                <ShaddyForm
                  ref={formRef}
                  schema={contactFormSchema}
                  initialValues={initialContactValues}
                  onSubmit={onSubmit}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField<ContactFormData>
                        name="tier"
                        label="Sponsorship Tier"
                        placeholder="Select a tier or general inquiry"
                        options={tierOptions}
                      />
                      <TextField<ContactFormData>
                        name="company"
                        label="Company Name"
                        placeholder="Your Company Inc. (Optional)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField<ContactFormData>
                        name="name"
                        label="Full Name"
                        placeholder="John Doe"
                        required
                      />
                      <TextField<ContactFormData>
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    <TextAreaField<ContactFormData>
                      name="message"
                      label="Message"
                      placeholder="Tell us about your sponsorship goals and any specific requirements..."
                      required
                      minHeight={120}
                      resizable={false}
                    />

                    <SubmitButton
                      label="Send Message"
                      loadingLabel="Sending..."
                      isLoading={isSubmitting}
                      icon={<Mail className="h-4 w-4" />}
                    />
                  </div>
                </ShaddyForm>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }
)

ContactForm.displayName = 'ContactForm'

interface WhySponsorCardProps {
  icon: LucideIcon
  iconColor: string
  bgColor: string
  title: string
  description: string
}

function WhySponsorCard({
  icon: Icon,
  iconColor,
  bgColor,
  title,
  description,
}: WhySponsorCardProps) {
  return (
    <div className="text-center space-y-4">
      <div className={cn('inline-flex p-4 rounded-full', bgColor)}>
        <Icon className={cn('h-8 w-8', iconColor)} />
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function WhySponsorSection() {
  const reasons = [
    {
      icon: Zap,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      title: 'Accelerate Development',
      description:
        'Your support enables us to dedicate more time to building features and fixing bugs faster.',
    },
    {
      icon: Users,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
      title: 'Grow the Community',
      description:
        'Help us create better documentation, tutorials, and support resources for everyone.',
    },
    {
      icon: Trophy,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      title: 'Recognition & Visibility',
      description:
        'Get your brand in front of thousands of developers using our project daily.',
    },
  ]

  return (
    <div className="mt-20">
      <SectionHeader title="Why Sponsor Us?" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason) => (
          <WhySponsorCard key={reason.title} {...reason} />
        ))}
      </div>
    </div>
  )
}

export function SponsorPageClient() {
  const { toast } = useToast()
  const formRef = useRef<ShaddyFormRef<ContactFormData>>(null)
  const contactFormRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleTierSelect = (tierName: string) => {
    contactFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    formRef.current?.form.setValue('tier', tierName)
  }

  const handleContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          formRef.current?.form.reset()
        }, 5000)
      } else {
        console.error('Form submission failed:', result.message)
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description:
            'Failed to submit form. Please try again or contact us directly.',
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SponsorshipTiers onTierSelect={handleTierSelect} />
      <QuickLinksSection />
      <ContactForm
        ref={contactFormRef}
        formRef={formRef}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        onSubmit={handleContactSubmit}
      />
      <WhySponsorSection />
    </>
  )
}
