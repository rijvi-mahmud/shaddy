'use client'

import { Link, usePathname } from '@/navigation'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Logo } from './ui/logo'

interface MainNavProps {
  messages: {
    docs: string
    blog: string
    typed_hooks: string
    table: string
    form: string
    utils: string
    ui: string
  }
}

export function MainNav({ messages }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Logo />

      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {/* <Link
          href="/docs"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.includes('/docs')
              ? 'dark:text-primary-active'
              : 'text-foreground/60'
          )}
        >
          {messages.docs}
        </Link> */}
        <Link
          href="/ui"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.includes('/ui')
              ? 'dark:text-primary-active'
              : 'text-foreground/60'
          )}
        >
          {messages.ui}
        </Link>

        <Link
          href="/typed-hooks"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.includes('/typed-hooks')
              ? 'dark:text-primary-active'
              : 'text-foreground/60'
          )}
        >
          {messages.typed_hooks}
        </Link>

        <Link
          href="/form"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.includes('/form')
              ? 'dark:text-primary-active'
              : 'text-foreground/60'
          )}
        >
          {messages.form}
        </Link>

        <Link
          href="/utils"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.includes('/utils')
              ? 'dark:text-primary-active'
              : 'text-foreground/60'
          )}
        >
          {messages.utils}
        </Link>

        <Link
          href="/table"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.includes('/table')
              ? 'dark:text-primary-active'
              : 'text-foreground/60'
          )}
        >
          {messages.table}
        </Link>
      </nav>
    </div>
  )
}
