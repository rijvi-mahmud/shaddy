'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { CodeBlockWrapper } from '@/components/mdx-components/code-block-wrapper'

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  shouldExpanded?: boolean
}

export function ComponentSource({
  children,
  className,
  shouldExpanded = false,
  ...props
}: ComponentSourceProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn('my-6 overflow-hidden rounded-md', className)}
      shouldExpanded={shouldExpanded}
    >
      {children}
    </CodeBlockWrapper>
  )
}
