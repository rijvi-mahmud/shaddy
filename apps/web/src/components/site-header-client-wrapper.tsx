'use client'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

export const SiteHeaderClientWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const positionClass = pathname === '/' ? 'fixed' : 'sticky'
  return (
    <header className={cn(positionClass, 'top-0 z-50 w-full backdrop-blur-sm')}>
      {children}
    </header>
  )
}
