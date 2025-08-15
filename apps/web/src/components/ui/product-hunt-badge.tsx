import { cn } from '@/lib/utils'
import React from 'react'

type ProductHuntBadgeProps = {
  className?: string
  mode?: 'light' | 'dark' | 'neutral'
}

export const ProductHuntBadge = ({
  className,
  mode = 'light',
}: ProductHuntBadgeProps) => {
  return (
    <a
      href="https://www.producthunt.com/products/shaddy?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-shaddy"
      target="_blank"
    >
      <img
        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1004538&theme=${mode}&t=1755074945165`}
        alt="shaddy - One&#0032;stop&#0032;frontend&#0032;resource | Product Hunt"
        style={{ width: '180px' }}
        className={cn('w-[180px] h-[54px]', className)}
      />
    </a>
  )
}
