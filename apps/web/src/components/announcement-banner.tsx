'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSessionStorage } from '@/registry/default/hooks/use-session-storage'

interface AnnouncementBannerProps {
  message: string
  href?: string
  ctaText?: string
  ctas?: Array<{ text: string; href: string }>
  dismissible?: boolean
  variant?: 'default' | 'gradient' | 'minimal'
  className?: string
  storageKey?: string
}

export function AnnouncementBanner({
  message,
  href,
  ctaText,
  ctas,
  dismissible = true,
  variant = 'default',
  className,
  storageKey = 'announcement-banner-dismissed',
}: AnnouncementBannerProps) {
  const [isDismissed, setIsDismissed] = useSessionStorage<boolean>(
    storageKey,
    false
  )

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  if (isDismissed) return null

  const variants = {
    default: 'bg-muted/50 border-b border-border',
    gradient:
      'bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-border',
    minimal: 'bg-muted/30 border-b border-border/40',
  }

  const Content = () => {
    const hasCtas = ctas && ctas.length > 0
    const hasSingleCta = href && ctaText

    return (
      <div className="relative flex items-center justify-center h-10 px-2">
        <div className="flex items-center justify-center gap-1.5 text-xs whitespace-nowrap overflow-hidden">
          <span className="font-medium text-foreground truncate">
            {message}
          </span>

          {hasCtas && (
            <>
              <span className="hidden sm:inline text-muted-foreground/60 mx-0.5">
                •
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {ctas.map((cta, index) => (
                  <React.Fragment key={index}>
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors text-xs"
                    >
                      {cta.text}
                      <svg
                        className="size-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                    {index < ctas.length - 1 && (
                      <span className="text-muted-foreground/60 text-xs">
                        |
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
          {!hasCtas && hasSingleCta && (
            <>
              <span className="hidden sm:inline text-muted-foreground/60 mx-0.5">
                •
              </span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors text-xs shrink-0"
              >
                {ctaText}
                <svg
                  className="size-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </>
          )}
        </div>

        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 absolute right-1 hover:bg-background/80 shrink-0"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full text-center max-h-10',
        variants[variant],
        className
      )}
      role="banner"
      aria-live="polite"
    >
      <div className="container max-w-(--breakpoint-2xl) mx-auto relative z-10">
        <Content />
      </div>
    </div>
  )
}
