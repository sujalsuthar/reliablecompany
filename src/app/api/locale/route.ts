import { NextResponse } from 'next/server'

import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_MANUAL_COOKIE,
  type Locale,
} from '@/lib/i18n/config'
import { publicCookieOptions } from '@/lib/security/cookies'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export async function POST(request: Request) {
  let locale: Locale = DEFAULT_LOCALE
  let manual = true

  try {
    const body = (await request.json()) as { locale?: string; manual?: boolean }
    if (isLocale(body.locale)) {
      locale = body.locale
    }
    if (body.manual === false) manual = false
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const response = NextResponse.json({ ok: true, locale, manual })
  response.cookies.set(LOCALE_COOKIE, locale, publicCookieOptions(COOKIE_MAX_AGE))

  if (manual) {
    response.cookies.set(LOCALE_MANUAL_COOKIE, '1', publicCookieOptions(COOKIE_MAX_AGE))
  } else {
    response.cookies.delete(LOCALE_MANUAL_COOKIE)
  }

  return response
}
