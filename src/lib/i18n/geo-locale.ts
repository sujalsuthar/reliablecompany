import type { NextRequest } from 'next/server'

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config'

const SAUDI_COUNTRY_CODES = new Set(['SA'])

/** Read ISO country code from common CDN / hosting geo headers. */
export function getCountryFromRequest(request: NextRequest): string | null {
  const candidates = [
    request.headers.get('cf-ipcountry'),
    request.headers.get('x-vercel-ip-country'),
    request.headers.get('x-country-code'),
    request.headers.get('x-geo-country'),
    request.headers.get('cloudfront-viewer-country'),
  ]

  for (const value of candidates) {
    const code = value?.trim().toUpperCase()
    if (code && code.length === 2 && code !== 'XX' && code !== 'T1') {
      return code
    }
  }

  return null
}

/** Saudi visitors default to Arabic; everyone else defaults to English. */
export function detectLocaleFromRequest(request: NextRequest): Locale {
  const country = getCountryFromRequest(request)
  if (country && SAUDI_COUNTRY_CODES.has(country)) {
    return 'ar'
  }
  return DEFAULT_LOCALE
}
