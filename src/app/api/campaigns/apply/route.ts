import { NextRequest, NextResponse } from 'next/server'

import { addCampaignApplication, getCollectionItem } from '@/lib/cms/store'
import { checkRateLimit, rateLimitResponse } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

interface CampaignApplyPayload {
  campaignId: string
  fullName: string
  email: string
  companyName: string
  domain: string
  message?: string
  consent?: boolean
  website?: string
}

const LIMITS = {
  fullName: 200,
  email: 254,
  companyName: 200,
  domain: 200,
  message: 5000,
} as const

const APPLY_RATE_LIMIT = { limit: 5, windowSec: 60 * 60 }

function trimField(value: string | undefined, max: number): string {
  return (value ?? '').trim().slice(0, max)
}

function validatePayload(data: Partial<CampaignApplyPayload>) {
  const errors: Record<string, string> = {}

  if (!data.campaignId?.trim()) {
    errors.campaignId = 'Campaign is required.'
  }

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

  if (!data.companyName?.trim()) {
    errors.companyName = 'Company name is required.'
  } else if (data.companyName.trim().length > LIMITS.companyName) {
    errors.companyName = 'Company name is too long.'
  }

  if (!data.domain?.trim()) {
    errors.domain = 'Company domain is required.'
  } else if (data.domain.trim().length > LIMITS.domain) {
    errors.domain = 'Domain is too long.'
  }

  if (data.message && data.message.trim().length > LIMITS.message) {
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
    scope: 'campaign-apply',
    key: ip,
    ...APPLY_RATE_LIMIT,
  })

  if (!rate.ok) {
    return rateLimitResponse(rate.retryAfterSec)
  }

  try {
    const body = (await request.json()) as Partial<CampaignApplyPayload>

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

    const campaign = await getCollectionItem('campaigns', body.campaignId!.trim())
    if (!campaign || campaign.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'This campaign is no longer active.' },
        { status: 400 },
      )
    }

    const fullName = trimField(body.fullName, LIMITS.fullName)
    const email = trimField(body.email, LIMITS.email)
    const companyName = trimField(body.companyName, LIMITS.companyName)
    const domain = trimField(body.domain, LIMITS.domain)
    const message = trimField(body.message, LIMITS.message) || undefined

    await addCampaignApplication({
      campaignId: campaign._id,
      campaignName: campaign.name,
      fullName,
      email,
      companyName,
      domain,
      message,
    })

    void sendWhatsAppNotification(
      [
        'New campaign application — Reliable Company',
        `Campaign: ${campaign.name}`,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Company: ${companyName}`,
        `Domain: ${domain}`,
        message ? `Context: ${message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 },
    )
  }
}
