const isProduction = process.env.NODE_ENV === 'production'

export function adminSessionCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
    path: '/',
    maxAge: maxAgeSec,
  }
}

export function publicCookieOptions(maxAgeSec: number) {
  // Allow COOKIE_SECURE=0 on UAT if SSL is misconfigured (browser "Not secure")
  // otherwise Secure cookies may be dropped and language switch appears broken.
  const forceInsecure = process.env.COOKIE_SECURE === '0'
  return {
    httpOnly: false,
    secure: isProduction && !forceInsecure,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSec,
  }
}
