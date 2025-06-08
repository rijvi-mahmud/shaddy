'use client'

import { motion } from 'framer-motion'

import type { ComponentProps } from 'react'

import { useMounted } from '@/lib/shaddy/hooks/use-mounted'

export default function Template({ children }: ComponentProps<'div'>) {
  const isMounted = useMounted()

  if (!isMounted) {
    return <>{children}</>
  }

  return <motion.div>{children}</motion.div>
}
