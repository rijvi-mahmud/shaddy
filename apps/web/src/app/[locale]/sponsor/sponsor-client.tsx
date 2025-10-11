'use client'

import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Zap,
  Users,
  Trophy,
  Github,
  Mail,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { ShaddyForm } from '@/registry/default/form/shaddy-form'
import { TextField } from '@/registry/default/form/fields/text-field'
import { TextAreaField } from '@/registry/default/form/fields/text-area-field'
import { SubmitButton } from '@/registry/default/form/fields/submit-button'
import { SelectField } from '@/registry/default/form/fields/select-field'
import { z } from 'zod'
import type { ShaddyFormRef } from '@/registry/default/form/shaddy-form'

const sponsorshipTiers = [
  {
    name: 'Bronze',
    price: '$50',
    icon: Heart,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    benefits: [
      'Your name in our README',
      'Sponsor badge on profile',
      'Early access to new features',
      'Community discord access',
    ],
  },
  {
    name: 'Silver',
    price: '$100',
    icon: Zap,
    color: 'text-slate-600 dark:text-slate-300',
    bgColor: 'bg-slate-50 dark:bg-slate-950/20',
    popular: true,
    benefits: [
      'Everything in Bronze',
      'Logo in project documentation',
      'Priority issue responses',
      'Monthly sponsor newsletter',
      'Request features',
    ],
  },
  {
    name: 'Gold',
    price: '$250',
    icon: Trophy,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    benefits: [
      'Everything in Silver',
      'Logo on project homepage',
      'Dedicated support channel',
      'Quarterly video calls',
      'Custom integration assistance',
      'Company listing',
    ],
  },
  {
    name: 'Platinum',
    price: '$500+',
    icon: Sparkles,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    benefits: [
      'Everything in Gold',
      'Premium logo placement',
      'Custom development hours',
      'Private consulting sessions',
      'Influence project roadmap',
      'Exclusive partnership status',
    ],
  },
]

const quickLinks = [
  {
    title: 'Buy Me a Coffee',
    description: 'One-time contributions welcome',
    icon: Heart,
    href: 'https://www.buymeacoffee.com/rijvi.mahmud',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    title: 'GitHub Repository',
    description: 'Star us on GitHub',
    icon: Github,
    href: 'https://github.com/rijvi-mahmud/shaddy',
    color: 'text-gray-900 dark:text-white',
  },
]

// Tier options for select field
const tierOptions = [
  { value: 'general', text: 'General Inquiry' },
  { value: 'Bronze', text: 'Bronze - $50/month' },
  { value: 'Silver', text: 'Silver - $100/month' },
  { value: 'Gold', text: 'Gold - $250/month' },
  { value: 'Platinum', text: 'Platinum - $500+/month' },
]

// Contact form schema
const contactFormSchema = z.object({
  tier: z.string().default('general'),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
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

export function SponsorPageClient() {
  const formRef = useRef<ShaddyFormRef<ContactFormData>>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleTierSelect = (tierName: string) => {
    // Scroll to the form
    const formElement = document.getElementById('contact-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    formRef.current?.form.setValue('tier', tierName)
  }

  const handleContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Submit to API route
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

        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          formRef.current?.form.reset()
        }, 5000)
      } else {
        // Handle error
        console.error('Form submission failed:', result.message)
        alert('Failed to submit form. Please try again or contact us directly.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Sponsorship Tiers */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sponsorship Tiers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a tier that works for you. All contributions make a
            difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsorshipTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <Card
                key={tier.name}
                className={`relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  tier.popular
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'border-border/50 hover:border-border'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div
                        className={`inline-flex p-3 rounded-xl ${tier.bgColor}`}
                      >
                        <Icon className={`h-6 w-6 ${tier.color}`} />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">
                          {tier.name}
                        </h3>
                        <p className="text-3xl font-extrabold text-foreground">
                          {tier.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /month
                          </span>
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {tier.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full group-hover:scale-105 transition-transform"
                      variant={tier.popular ? 'default' : 'outline-solid'}
                      onClick={() => handleTierSelect(tier.name)}
                    >
                      Choose {tier.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick Sponsorship Links
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose your preferred platform to support us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Card
                key={link.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-border"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                      <Icon className={`h-6 w-6 ${link.color}`} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-lg">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
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
          })}
        </div>
      </div>

      {/* General Contact Section */}
      <div id="contact-form" className="max-w-3xl mx-auto mt-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground">
            Not sure which tier is right for you? Reach out and we'll help you
            choose.
          </p>
        </div>

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
                  onSubmit={handleContactSubmit}
                >
                  <div className="space-y-4">
                    <SelectField<ContactFormData>
                      name="tier"
                      label="Sponsorship Tier"
                      placeholder="Select a tier or general inquiry"
                      options={tierOptions}
                    />

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

                    <TextField<ContactFormData>
                      name="company"
                      label="Company Name"
                      placeholder="Your Company Inc. (Optional)"
                    />

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

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting this form, you agree to our privacy policy
                      and terms of service.
                    </p>
                  </div>
                </ShaddyForm>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Why Sponsor Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Sponsor Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-blue-500/10">
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Accelerate Development
            </h3>
            <p className="text-muted-foreground">
              Your support enables us to dedicate more time to building features
              and fixing bugs faster.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-green-500/10">
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Grow the Community
            </h3>
            <p className="text-muted-foreground">
              Help us create better documentation, tutorials, and support
              resources for everyone.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-purple-500/10">
              <Trophy className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Recognition & Visibility
            </h3>
            <p className="text-muted-foreground">
              Get your brand in front of thousands of developers using our
              project daily.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
