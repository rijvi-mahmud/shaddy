import Balancer from 'react-wrap-balancer'

import type { LocaleOptions } from '@/lib/shaddy/types/i18n'

import { DocNotAvailableInThisLanguage } from './not-available'
import { AIActionsMenu } from './ai-actions-menu'

interface DocHeadingProps {
  title: string
  description: string
  notAvailable: boolean
  locale: LocaleOptions
  rawContent?: string
  pageUrl?: string
}

export function DocHeading({
  title,
  description,
  notAvailable,
  locale,
  rawContent,
  pageUrl,
}: DocHeadingProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {title}
        </h1>

        {rawContent && pageUrl && (
          <AIActionsMenu
            content={rawContent}
            pageUrl={pageUrl}
            className="shrink-0"
          />
        )}
      </div>

      {description && (
        <p className="text-muted-foreground text-lg">
          <Balancer>{description}</Balancer>
        </p>
      )}

      {notAvailable && <DocNotAvailableInThisLanguage locale={locale} />}
    </div>
  )
}
