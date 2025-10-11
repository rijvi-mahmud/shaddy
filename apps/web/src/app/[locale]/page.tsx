import { setRequestLocale } from 'next-intl/server'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'
import { HeroSection } from '@/components/layout/sections/hero-section'
import { FeaturesSection } from '@/components/layout/sections/features-section'
import { TechStackSection } from '@/components/layout/sections/tech-stack-section'
import { HowItWorksSection } from '@/components/layout/sections/how-it-works-section'
import { TestimonialsSection } from '@/components/layout/sections/testimonials-section'
import { OurSponsors } from '@/components/layout/sections/sponsors'
import { CTASection } from '@/components/layout/sections/cta-section'
import { BenefitsSection } from '@/components/layout/sections/benefits-section'

export const dynamicParams = true

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: LocaleOptions }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <OurSponsors />
      <FeaturesSection />
      <TechStackSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
