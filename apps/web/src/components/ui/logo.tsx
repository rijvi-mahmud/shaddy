import React from 'react'
import { Icons } from '../icons'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'

export const Logo = () => {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <Icons.logo className="size-6" />

      <span className="hidden font-bold sm:inline-block">
        {siteConfig.title}
      </span>
    </Link>
  )
}
