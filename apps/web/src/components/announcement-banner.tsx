'use client'

import * as React from 'react'
import { X, Sparkles } from 'lucide-react'
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
  const [isAnimated, setIsAnimated] = React.useState(false)

  React.useEffect(() => {
    // Trigger animation after mount if not dismissed
    if (!isDismissed) {
      setTimeout(() => setIsAnimated(true), 100)
    }
  }, [isDismissed])

  const handleDismiss = () => {
    setIsAnimated(false)
    setTimeout(() => {
      setIsDismissed(true)
    }, 300)
  }

  if (isDismissed) return null

  const variants = {
    default:
      'bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-b border-primary/30',
    gradient:
      'bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border-b border-primary/20 dark:from-emerald-500/15 dark:via-blue-500/15 dark:to-purple-500/15',
    minimal: 'bg-muted/50 border-b border-border/40',
  }

  const Content = () => {
    const hasCtas = ctas && ctas.length > 0
    const hasSingleCta = href && ctaText

    return (
      <div className="relative flex items-center justify-center py-3 px-4">
        <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
          {/* Eye-catching icon */}
          <Sparkles className="size-4 text-primary animate-pulse hidden sm:inline" />

          <span className="font-semibold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {message}
          </span>

          {hasCtas && (
            <>
              <span className="hidden sm:inline text-muted-foreground/60">
                •
              </span>
              <div className="flex items-center gap-2">
                {ctas.map((cta, index) => (
                  <React.Fragment key={index}>
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 font-semibold text-primary hover:text-primary/80 transition-all duration-200 hover:scale-105 border border-primary/20"
                    >
                      {cta.text}
                      <svg
                        className="size-3.5"
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
                      <span className="text-muted-foreground/60">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
          {!hasCtas && hasSingleCta && (
            <>
              <span className="hidden sm:inline text-muted-foreground/60">
                •
              </span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 font-semibold text-primary hover:text-primary/80 transition-all duration-200 hover:scale-105 border border-primary/20"
              >
                {ctaText}
                <svg
                  className="size-3.5"
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
            className="h-7 w-7 absolute right-2 hover:bg-background/80 transition-all duration-200 hover:scale-110"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full text-center backdrop-blur-md transition-all duration-300 overflow-hidden',
        variants[variant],
        isAnimated
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0',
        className
      )}
      role="banner"
      aria-live="polite"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      <div className="container max-w-(--breakpoint-2xl) mx-auto relative z-10">
        <Content />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            background-position: -200% 0;
          }
          50% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}
