import { NextRequest, NextResponse } from 'next/server'

import { addCareerApplication, getStore } from '@/lib/cms/store'
import { saveResumeFile } from '@/lib/cms/resume-storage'
import { isMongoEnabled } from '@/lib/cms/storage'
import { COMPANY_EMAIL } from '@/lib/brand'
import { checkRateLimit, rateLimitResponse } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'
import { validateResumeUpload } from '@/lib/security/upload'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const APPLY_RATE_LIMIT = { limit: 5, windowSec: 60 * 60 }

const LIMITS = {
  fullName: 200,
  email: 254,
  phone: 40,
  city: 120,
  coverLetter: 8000,
  position: 200,
} as const

function trim(value: string | null | undefined, max: number): string {
  return (value ?? '').trim().slice(0, max)
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rate = checkRateLimit({
    scope: 'career-apply',
    key: ip,
    ...APPLY_RATE_LIMIT,
  })

  if (!rate.ok) {
    return rateLimitResponse(rate.retryAfterSec)
  }

  try {
    const formData = await request.formData()

    if (trim(formData.get('website') as string | null, 200)) {
      return NextResponse.json({ success: true })
    }

    const careerId = trim(formData.get('careerId') as string | null, 80)
    const fullName = trim(formData.get('fullName') as string | null, LIMITS.fullName)
    const email = trim(formData.get('email') as string | null, LIMITS.email)
    const phone = trim(formData.get('phone') as string | null, LIMITS.phone)
    const city = trim(formData.get('city') as string | null, LIMITS.city)
    const coverLetter = trim(formData.get('coverLetter') as string | null, LIMITS.coverLetter)
    const position = trim(formData.get('position') as string | null, LIMITS.position)
    const consent = formData.get('consent') === 'true' || formData.get('consent') === 'on'
    const resume = formData.get('resume')

    const errors: Record<string, string> = {}

    if (!careerId) errors.careerId = 'Invalid job.'
    if (!fullName) errors.fullName = 'Full name is required.'
    if (!email) {
      errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address.'
    }
    if (!phone) errors.phone = 'Phone is required.'
    if (!coverLetter || coverLetter.length < 10) {
      errors.coverLetter = 'Cover letter must be at least 10 characters.'
    }
    if (!consent) errors.consent = 'You must agree to data processing.'
    if (!resume || !(resume instanceof File)) {
      errors.resume = 'Resume is required.'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const store = await getStore()
    const job = store.careers.find((c) => c._id === careerId && c.status === 'active')
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'This position is no longer available.' },
        { status: 404 },
      )
    }

    const resumeFile = resume as File
    const bytes = await resumeFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const validation = validateResumeUpload(resumeFile, buffer)

    if (!validation.ok) {
      return NextResponse.json(
        { success: false, errors: { resume: validation.error } },
        { status: 400 },
      )
    }

    if (process.env.VERCEL && !isMongoEnabled()) {
      return NextResponse.json(
        {
          success: false,
          error: `Application storage is not configured. Please email your CV to ${COMPANY_EMAIL}.`,
        },
        { status: 503 },
      )
    }

    let resumeUrl: string

    try {
      const saved = await saveResumeFile(buffer, validation.mime, resumeFile.name)
      resumeUrl = saved.url
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Resume upload failed'
      if (message === 'STORAGE_NOT_CONFIGURED') {
        return NextResponse.json(
          {
            success: false,
            error: `Resume uploads are not configured. Please email your CV to ${COMPANY_EMAIL}.`,
          },
          { status: 503 },
        )
      }
      if (message === 'RESUME_TOO_LARGE') {
        return NextResponse.json(
          {
            success: false,
            errors: { resume: 'Resume is too large. Maximum file size is 10 MB.' },
          },
          { status: 400 },
        )
      }
      console.error('[careers] resume save failed:', error)
      return NextResponse.json(
        {
          success: false,
          error: `Could not upload resume. Set MONGODB_URI in your environment, or email ${COMPANY_EMAIL}.`,
        },
        { status: 500 },
      )
    }

    await addCareerApplication({
      careerId,
      fullName,
      email,
      phone,
      city: city || undefined,
      position: position || job.title,
      resumeUrl,
      resumeFileName: resumeFile.name,
      message: coverLetter,
    })

    void sendWhatsAppNotification(
      [
        'New career application — Reliable Company',
        `Position: ${position || job.title}`,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
      ].join('\n'),
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[careers] apply failed:', error)
    return NextResponse.json(
      { success: false, error: 'Could not submit application. Please try again.' },
      { status: 500 },
    )
  }
}
