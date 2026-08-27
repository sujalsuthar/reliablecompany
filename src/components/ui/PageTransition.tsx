'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useRef, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const visitedPaths = useRef(new Set<string>())
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const isFirstVisit = !visitedPaths.current.has(pathname)
  visitedPaths.current.add(pathname)

  // First visit shows content immediately — no opacity:0 flash.
  // reduceMotion is client-only after mount to avoid hydration mismatch.
  const animateRouteChange = !isFirstVisit && !reduceMotion

  return (
    <motion.div
      key={pathname}
      initial={animateRouteChange ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
