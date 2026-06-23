import { NextResponse } from 'next/server'

type RateLimitEntry = { count: number; resetAt: number }

const buckets = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanupExpired(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now
  for (const key of Array.from(buckets.keys())) {
    const entry = buckets.get(key)
    if (entry && entry.resetAt <= now) buckets.delete(key)
  }
}

export interface RateLimitOptions {
  /** Unique scope, e.g. `login` or `contact` */
  scope: string
  /** Client identifier (usually IP) */
  key: string
  /** Max requests allowed in the window */
  limit: number
  /** Window size in seconds */
  windowSec: number
}

export interface RateLimitResult {
  ok: boolean
  remaining: number
  retryAfterSec: number
}

export function checkRateLimit(options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  cleanupExpired(now)

  const bucketKey = `${options.scope}:${options.key}`
  const windowMs = options.windowSec * 1000
  const existing = buckets.get(bucketKey)

  if (!existing || existing.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs })
    return {
      ok: true,
      remaining: options.limit - 1,
      retryAfterSec: options.windowSec,
    }
  }

  if (existing.count >= options.limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    }
  }

  existing.count += 1
  return {
    ok: true,
    remaining: options.limit - existing.count,
    retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  }
}

export function rateLimitResponse(retryAfterSec: number): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: { 'Retry-After': String(retryAfterSec) },
    },
  )
}
