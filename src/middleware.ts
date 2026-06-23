import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { COOKIE_NAME, verifySessionToken } from '@/lib/auth'
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_MANUAL_COOKIE,
} from '@/lib/i18n/config'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function setLocaleCookies(response: NextResponse, locale: string, manual: boolean) {
  const isProduction = process.env.NODE_ENV === 'production'
  const base = {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax' as const,
    secure: isProduction,
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

  // --- Locale (public pages): English by default worldwide ---
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const manualPreference = request.cookies.get(LOCALE_MANUAL_COOKIE)?.value === '1'

  // Only honor Arabic (or other locale) when the user explicitly chose it
  if (manualPreference && isLocale(savedLocale)) {
    return NextResponse.next()
  }

  // Everyone else gets English — first visit, geo, or browser language ignored
  if (savedLocale === DEFAULT_LOCALE) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  setLocaleCookies(response, DEFAULT_LOCALE, false)
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
