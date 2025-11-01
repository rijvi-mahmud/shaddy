'use client'

import { useState, useRef } from 'react'
import { Link, usePathname } from '@/navigation'
import { cn } from '@/lib/utils'
import { Logo } from './ui/logo'
import { ChevronDownIcon } from 'lucide-react'

interface MainNavProps {
  messages: {
    docs: string
    blog: string
    typed_hooks: string
    table: string
    form: string
    utils: string
    ui: string
    resources: string
    react_patterns: string
  }
}

interface NavItem {
  href: string
  label: string
  children?: NavItem[]
}

export function MainNav({ messages }: MainNavProps) {
  const pathname = usePathname()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const navItems: NavItem[] = [
    { href: '/ui', label: messages.ui },
    { href: '/typed-hooks', label: messages.typed_hooks },
    { href: '/form', label: messages.form },
    { href: '/utils', label: messages.utils },
    { href: '/table', label: messages.table },
    {
      label: messages.resources,
      href: '#',
      children: [{ href: '/react-patterns', label: messages.react_patterns }],
    },
  ]

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <nav className="mr-4 hidden md:flex items-center space-x-1">
      <Logo />
      <ul className="flex items-center">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== '#'
          const hasChildren = item.children && item.children.length > 0
          const isOpen = activeDropdown === item.label

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
              onMouseLeave={() => hasChildren && handleMouseLeave()}
            >
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={cn(
                      'inline-flex h-8 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:bg-accent focus:text-accent-foreground focus:outline-hidden',
                      'disabled:pointer-events-none disabled:opacity-50',
                      isOpen && 'bg-accent/50 text-accent-foreground'
                    )}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={cn(
                        'relative top-px ml-1 h-3 w-3 transition-transform duration-300',
                        isOpen && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      className={cn(
                        'absolute left-0 top-full mt-1.5 w-48 rounded-md border bg-popover text-popover-foreground shadow-sm z-50',
                        'animate-in fade-in zoom-in-90 duration-200'
                      )}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="p-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {item.children?.map((child) => {
                          const isChildActive = pathname.startsWith(child.href)
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'flex w-full items-center rounded-sm px-3 py-1.5 text-sm outline-none',
                                'transition-colors',
                                'focus:bg-accent focus:text-accent-foreground',
                                'hover:bg-accent hover:text-accent-foreground',
                                isChildActive
                                  ? 'bg-accent/50 text-accent-foreground font-medium'
                                  : 'text-popover-foreground'
                              )}
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex h-8 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:bg-accent focus:text-accent-foreground focus:outline-hidden',
                    'disabled:pointer-events-none disabled:opacity-50',
                    isActive && 'bg-accent/50 text-accent-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
