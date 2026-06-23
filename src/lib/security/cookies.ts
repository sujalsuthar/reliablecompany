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
  return {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSec,
  }
}
