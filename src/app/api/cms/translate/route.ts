import { NextRequest, NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { translateText, type TranslateDirection } from '@/lib/i18n/translate-service'
import { checkRateLimit, rateLimitResponse } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'

const MAX_TEXT_LENGTH = 8000
const TRANSLATE_RATE_LIMIT = { limit: 40, windowSec: 60 * 60 }

export async function POST(request: NextRequest) {
  const authError = await requireAdminSession()
  if (authError) return authError

  const ip = getClientIp(request)
  const rate = checkRateLimit({
    scope: 'cms-translate',
    key: ip,
    ...TRANSLATE_RATE_LIMIT,
  })

  if (!rate.ok) {
    return rateLimitResponse(rate.retryAfterSec)
  }

  try {
    const body = (await request.json()) as {
      text?: string
      direction?: TranslateDirection
    }

    const text = body.text?.trim().slice(0, MAX_TEXT_LENGTH)
    const direction = body.direction

    if (!text || (direction !== 'en-ar' && direction !== 'ar-en')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const translated = await translateText(text, direction)
    return NextResponse.json({ translated })
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
