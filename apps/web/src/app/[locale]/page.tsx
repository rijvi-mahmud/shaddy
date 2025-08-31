import { setRequestLocale } from 'next-intl/server'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'
import { HeroSection } from '@/components/layout/sections/hero-section'
import { OurSponsors } from '@/components/layout/sections/sponsors'

export const dynamicParams = true

export default async function IndexPage({
  params,
}: {
  params: { locale: LocaleOptions }
}) {
  setRequestLocale(params.locale)

  return (
    <div className="container">
      <HeroSection />
      <OurSponsors />
    </div>
  )
}
