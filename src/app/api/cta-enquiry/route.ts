import { NextRequest, NextResponse } from 'next/server'

import { addEnquiry } from '@/lib/cms/store'
import { checkRateLimit, rateLimitResponse } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

interface CtaEnquiryPayload {
  email: string
  source?: string
  /** Honeypot — must stay empty */
  website?: string
}

const LIMITS = {
  email: 254,
  source: 80,
} as const

const CTA_RATE_LIMIT = { limit: 5, windowSec: 60 * 60 }

const SOURCE_LABELS: Record<string, string> = {
  homepage: 'Homepage CTA Banner',
  website: 'Website CTA Banner',
  'dark-web-monitoring': 'Dark Web Monitoring CTA',
}

function trimField(value: string | undefined, max: number): string {
  return (value ?? '').trim().slice(0, max)
}

function validatePayload(data: Partial<CtaEnquiryPayload>) {
  const errors: Record<string, string> = {}

  if (!data.email?.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address.'
  } else if (data.email.trim().length > LIMITS.email) {
    errors.email = 'Email is too long.'
  }

  return errors
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rate = checkRateLimit({
    scope: 'cta-enquiry',
    key: ip,
    ...CTA_RATE_LIMIT,
  })

  if (!rate.ok) {
    return rateLimitResponse(rate.retryAfterSec)
  }

  try {
    const body = (await request.json()) as Partial<CtaEnquiryPayload>

    if (body.website?.trim()) {
      return NextResponse.json({ success: true })
    }

    const errors = validatePayload(body)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: 'Validation failed.', errors },
        { status: 400 },
      )
    }

    const email = trimField(body.email, LIMITS.email)
    const sourceKey = trimField(body.source, LIMITS.source) || 'website'
    const sourceLabel = SOURCE_LABELS[sourceKey] ?? 'Website CTA'

    await addEnquiry({
      fullName: 'Website visitor',
      email,
      phone: 'Not provided',
      city: 'Other',
      service: 'other',
      division: sourceLabel,
      message: `Consultation requested via ${sourceLabel.toLowerCase()}.`,
    })

    void sendWhatsAppNotification(
      [
        'New CTA enquiry — Reliable Company',
        `Source: ${sourceLabel}`,
        `Email: ${email}`,
      ].join('\n'),
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Could not submit request. Please try again.' },
      { status: 500 },
    )
  }
}
