'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { trackGaPageView } from '@/lib/analytics/ga'

/**
 * Sends GA4 page_view on App Router client-side navigations only.
 * Skips the first run so the initial load is not double-counted (handled by gtag config).
 */
export default function GoogleAnalyticsPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const skipNext = useRef(true)

  useEffect(() => {
    const query = searchParams.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname

    if (skipNext.current) {
      skipNext.current = false
      return
    }

    trackGaPageView(pagePath)
  }, [pathname, searchParams])

  return null
}
