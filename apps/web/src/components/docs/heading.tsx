import Balancer from 'react-wrap-balancer'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'

import { DocNotAvailableInThisLanguage } from './not-available'

interface DocHeadingProps {
  title: string
  description: string
  notAvailable: boolean
  locale: LocaleOptions
}

export function DocHeading({
  title,
  description,
  notAvailable,
  locale,
}: DocHeadingProps) {
  return (
    <div className="space-y-2">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{title}</h1>

      {description && (
        <p className="text-muted-foreground text-lg">
          <Balancer>{description}</Balancer>
        </p>
      )}

      {notAvailable && <DocNotAvailableInThisLanguage locale={locale} />}
    </div>
  )
}
