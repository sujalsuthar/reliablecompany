'use client'

import { clsx } from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right'

interface AnimateOnScrollProps {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
}

function getInitialOffset(direction: Direction) {
  switch (direction) {
    case 'left':
      return { x: -16, y: 0 }
    case 'right':
      return { x: 16, y: 0 }
    case 'up':
    default:
      return { x: 0, y: 16 }
  }
}

/**
 * Subtle scroll reveal. Content stays visible even if the animation never fires
 * (opacity is never 0), so CMS sections cannot disappear as blank white space.
 */
export default function AnimateOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
}: AnimateOnScrollProps) {
  const offset = getInitialOffset(direction)
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={clsx(className)}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 1, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  )
}
