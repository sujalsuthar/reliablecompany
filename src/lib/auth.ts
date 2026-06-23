const COOKIE_NAME = 'admin_session'
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000
const MIN_SESSION_SECRET_LENGTH = 32

export { COOKIE_NAME, SESSION_MAX_AGE_MS }

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (isProduction()) {
    if (!secret || secret.length < MIN_SESSION_SECRET_LENGTH) {
      console.error(
        `[auth] ADMIN_SESSION_SECRET must be set to at least ${MIN_SESSION_SECRET_LENGTH} characters in production.`,
      )
      return '__INVALID_PRODUCTION_SESSION_SECRET__'
    }
    return secret
  }

  return secret || process.env.ADMIN_PASSWORD || 'dev-session-secret-change-me'
}

export function isAuthConfigured(): boolean {
  if (!process.env.ADMIN_PASSWORD) return false
  if (isProduction()) {
    const secret = process.env.ADMIN_SESSION_SECRET
    return Boolean(secret && secret.length >= MIN_SESSION_SECRET_LENGTH)
  }
  return true
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || '',
  }
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export function validateAdminLogin(username: string, password: string): boolean {
  const creds = getAdminCredentials()

  if (!creds.password) {
    return false
  }

  return safeEqual(username, creds.username) && safeEqual(password, creds.password)
}

async function signPayload(payload: string): Promise<string> {
  const secret = getSessionSecret()
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_MAX_AGE_MS
  const payload = `admin:${expiresAt}`
  const signature = await signPayload(payload)
  return `${payload}.${signature}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false

  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false

  const payload = token.slice(0, lastDot)
  const signature = token.slice(lastDot + 1)

  const expected = await signPayload(payload)

  if (!safeEqual(signature, expected)) return false

  const expiresAt = Number(payload.split(':')[1])
  return Number.isFinite(expiresAt) && Date.now() < expiresAt
}
