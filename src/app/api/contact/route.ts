import { NextRequest, NextResponse } from 'next/server'

import { addEnquiry } from '@/lib/cms/store'
import { sendWhatsAppNotification } from '@/lib/whatsapp'
import { checkRateLimit, rateLimitResponse } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'

interface ContactFormPayload {
  fullName: string
  email: string
  phone: string
  companyName?: string
  city?: string
  service?: string
  division: string
  message: string
  consent?: boolean
  /** Honeypot — must stay empty */
  website?: string
}

const VALID_CITIES = ['Jeddah', 'Riyadh', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Other']
const VALID_SERVICES = ['offensive', 'grc', 'incident', 'assessments', 'other']

const LIMITS = {
  fullName: 200,
  email: 254,
  phone: 40,
  companyName: 200,
  division: 200,
  message: 5000,
} as const

const CONTACT_RATE_LIMIT = { limit: 5, windowSec: 60 * 60 }

function trimField(value: string | undefined, max: number): string {
  return (value ?? '').trim().slice(0, max)
}

function validatePayload(data: Partial<ContactFormPayload>) {
  const errors: Record<string, string> = {}

  if (!data.fullName?.trim()) {
    errors.fullName = 'Full name is required.'
  } else if (data.fullName.trim().length > LIMITS.fullName) {
    errors.fullName = 'Full name is too long.'
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address.'
  } else if (data.email.trim().length > LIMITS.email) {
    errors.email = 'Email is too long.'
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required.'
  } else if (data.phone.trim().length > LIMITS.phone) {
    errors.phone = 'Phone number is too long.'
  }

  if (!data.city?.trim()) {
    errors.city = 'City is required.'
  } else if (!VALID_CITIES.includes(data.city)) {
    errors.city = 'Invalid city selected.'
  }

  if (!data.service?.trim()) {
    errors.service = 'Service is required.'
  } else if (!VALID_SERVICES.includes(data.service)) {
    errors.service = 'Invalid service selected.'
  }

  if (!data.division?.trim()) {
    errors.division = 'Service is required.'
  } else if (data.division.trim().length > LIMITS.division) {
    errors.division = 'Division value is too long.'
  }

  if (!data.message?.trim()) {
    errors.message = 'Message is required.'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  } else if (data.message.trim().length > LIMITS.message) {
    errors.message = 'Message is too long.'
  }

  if (!data.consent) {
    errors.consent = 'You must agree to data processing.'
  }

  return errors
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rate = checkRateLimit({
    scope: 'contact',
    key: ip,
    ...CONTACT_RATE_LIMIT,
  })

  if (!rate.ok) {
    return rateLimitResponse(rate.retryAfterSec)
  }

  try {
    const body = (await request.json()) as Partial<ContactFormPayload>

    // Honeypot triggered — pretend success to avoid tipping off bots
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

    await addEnquiry({
      fullName: trimField(body.fullName, LIMITS.fullName),
      email: trimField(body.email, LIMITS.email),
      phone: trimField(body.phone, LIMITS.phone),
      companyName: trimField(body.companyName, LIMITS.companyName) || undefined,
      city: body.city!.trim(),
      service: body.service!.trim(),
      division: trimField(body.division, LIMITS.division),
      message: trimField(body.message, LIMITS.message),
    })

    void sendWhatsAppNotification(
      [
        'New contact enquiry — Reliable Company',
        `Name: ${trimField(body.fullName, LIMITS.fullName)}`,
        `Email: ${trimField(body.email, LIMITS.email)}`,
        `Phone: ${trimField(body.phone, LIMITS.phone)}`,
        `City: ${body.city!.trim()}`,
        `Service: ${body.service!.trim()}`,
        `Message: ${trimField(body.message, LIMITS.message)}`,
      ].join('\n'),
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 },
    )
  }
}
