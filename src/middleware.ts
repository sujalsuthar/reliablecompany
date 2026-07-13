import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { COOKIE_NAME, verifySessionToken } from '@/lib/auth'
import {
  isLocale,
  LOCALE_COOKIE,
  LOCALE_MANUAL_COOKIE,
} from '@/lib/i18n/config'
import { detectLocaleFromRequest } from '@/lib/i18n/geo-locale'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function setLocaleCookies(response: NextResponse, locale: string, manual: boolean) {
  const isProduction = process.env.NODE_ENV === 'production'
  const forceInsecure = process.env.COOKIE_SECURE === '0'
  const base = {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax' as const,
    secure: isProduction && !forceInsecure,
  }

  response.cookies.set(LOCALE_COOKIE, locale, base)
  if (manual) {
    response.cookies.set(LOCALE_MANUAL_COOKIE, '1', base)
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_NAME)?.value

  // --- Protect admin API routes (defense in depth) ---
  const isAdminLoginApi =
    pathname === '/api/admin/login' && request.method === 'POST'
  const isProtectedApi =
    pathname.startsWith('/api/cms') ||
    (pathname.startsWith('/api/admin') && !isAdminLoginApi)

  if (isProtectedApi && !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // --- Admin auth ---
  if (pathname === '/admin/login') {
    if (await verifySessionToken(token)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    if (!(await verifySessionToken(token))) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // --- Skip API & static assets ---
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // --- Locale (public pages) ---
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const manualPreference = request.cookies.get(LOCALE_MANUAL_COOKIE)?.value === '1'

  // User explicitly chose a language — always respect it
  if (manualPreference && isLocale(savedLocale)) {
    return NextResponse.next()
  }

  // Auto-detect: Saudi Arabia → Arabic, otherwise English
  const detectedLocale = detectLocaleFromRequest(request)
  if (savedLocale === detectedLocale) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  setLocaleCookies(response, detectedLocale, false)
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
