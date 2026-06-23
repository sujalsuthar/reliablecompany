import { NextRequest, NextResponse } from 'next/server'

import {
  COOKIE_NAME,
  SESSION_MAX_AGE_MS,
  createSessionToken,
  isAuthConfigured,
  validateAdminLogin,
} from '@/lib/auth'
import { adminSessionCookieOptions } from '@/lib/security/cookies'
import { checkRateLimit, rateLimitResponse } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'

const LOGIN_RATE_LIMIT = { limit: 10, windowSec: 15 * 60 }

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rate = checkRateLimit({
    scope: 'admin-login',
    key: ip,
    ...LOGIN_RATE_LIMIT,
  })

  if (!rate.ok) {
    return rateLimitResponse(rate.retryAfterSec)
  }

  let body: { username?: string; password?: string }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const username = body.username?.trim().slice(0, 128) ?? ''
  const password = body.password?.slice(0, 256) ?? ''

  if (!username || !password) {
    return NextResponse.json(
      { error: 'Username and password are required' },
      { status: 400 },
    )
  }

  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: 'Admin login is not configured on this server.' },
      { status: 503 },
    )
  }

  if (!validateAdminLogin(username, password)) {
    await delay(750)
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const token = await createSessionToken()
  const response = NextResponse.json({ success: true })

  response.cookies.set(
    COOKIE_NAME,
    token,
    adminSessionCookieOptions(SESSION_MAX_AGE_MS / 1000),
  )

  return response
}
