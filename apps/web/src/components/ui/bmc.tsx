import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import React from 'react'

export const BuyMeCoffee = ({ className }: { className?: string }) => {
  return (
    <Link
      href="https://www.buymeacoffee.com/rijvi.mahmud"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'hover:text-yellow-500 transition-colors text-yellow-400',
        className
      )}
    >
      ☕ coffee
    </Link>
  )
}
