'use client'

import { MoonIcon, SunIcon, MonitorIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ThemeModeToggleProps {
  messages: {
    dark: string
    light: string
    system: string
  }
}

export function ThemeModeToggle({ messages }: ThemeModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const getIcon = () => {
    if (theme === 'light') return <SunIcon className="h-4 w-4" />
    if (theme === 'dark') return <MoonIcon className="h-4 w-4" />
    return <MonitorIcon className="h-4 w-4" />
  }

  if (!mounted) {
    return (
      <>
        <div className="md:hidden h-9 w-8 rounded-md bg-muted" />
        <div className="hidden md:inline-flex h-7 items-center justify-center rounded-md bg-muted p-0.5 w-[90px]" />
      </>
    )
  }

  return (
    <>
      {/* Mobile: Single icon toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={cycleTheme}
        className="md:hidden h-8 w-8 rounded-md"
        aria-label="Toggle theme"
      >
        {getIcon()}
      </Button>

      {/* Desktop: Segmented control */}
      <div className="hidden md:inline-flex h-7 items-center justify-center rounded-md bg-muted p-0.5 text-muted-foreground gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme('light')}
          className={cn(
            'h-6 w-6 rounded-sm transition-all',
            theme === 'light'
              ? 'bg-background text-foreground shadow-xs'
              : 'hover:bg-transparent hover:text-foreground'
          )}
          aria-label={messages.light}
        >
          <SunIcon className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme('dark')}
          className={cn(
            'h-6 w-6 rounded-sm transition-all',
            theme === 'dark'
              ? 'bg-background text-foreground shadow-xs'
              : 'hover:bg-transparent hover:text-foreground'
          )}
          aria-label={messages.dark}
        >
          <MoonIcon className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme('system')}
          className={cn(
            'h-6 w-6 rounded-sm transition-all',
            theme === 'system'
              ? 'bg-background text-foreground shadow-xs'
              : 'hover:bg-transparent hover:text-foreground'
          )}
          aria-label={messages.system}
        >
          <MonitorIcon className="h-3.5 w-3.5" />
        </Button>
      </div>
    </>
  )
}
