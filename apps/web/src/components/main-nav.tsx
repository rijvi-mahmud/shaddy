'use client'

import { Link, usePathname } from '@/navigation'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

interface MainNavProps {
  messages: {
    docs: string
    blog: string
    typed_hooks: string
    table: string
    form: string
  }
}

export function MainNav({ messages }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="size-6" />

        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

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
