import { NextResponse } from 'next/server'

import { COOKIE_NAME } from '@/lib/auth'
import { adminSessionCookieOptions } from '@/lib/security/cookies'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, '', adminSessionCookieOptions(0))
  return response
}
