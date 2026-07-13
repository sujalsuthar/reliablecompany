'use client'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { FormEvent, useState } from 'react'

import { useLocale } from '@/components/providers/LocaleProvider'
import PdplConsentField from '@/components/ui/PdplConsentField'
import type { Campaign } from '@/lib/cms/types'

interface DarkWebAssessmentFormProps {
  campaign: Campaign
}

interface FormState {
  fullName: string
  email: string
  companyName: string
  domain: string
  message: string
  consent: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  companyName?: string
  domain?: string
  consent?: string
}

const COPY = {
  en: {
    title: 'Request Your Free Assessment',
    description:
      'We use the details below to review your exposure surface and send a masked summary with next-step recommendations.',
    fullName: 'Your Name',
    email: 'Work Email',
    companyName: 'Company Name',
    domain: 'Company Domain (example.com)',
    message:
      'Optional context: leaked email concerns, executive impersonation, compliance need, etc.',
    submit: 'Get Free Dark Web Assessment',
    successTitle: 'Assessment request received',
    successBody:
      'Thank you. Our team will review your domain and contact you with a masked dark web assessment summary.',
    errors: {
      fullName: 'Full name is required.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Enter a valid email address.',
      companyName: 'Company name is required.',
      domain: 'Company domain is required.',
    },
    submitError: 'Something went wrong. Please try again.',
    consentRequired: 'You must agree to data processing to continue.',
  },
  ar: {
    title: 'اطلب تقييمك المجاني',
    description:
      'نستخدم التفاصيل أدناه لمراجعة سطح التعرض الخاص بك وإرسال ملخص مُقنّع مع توصيات الخطوات التالية.',
    fullName: 'اسمك',
    email: 'البريد الإلكتروني للعمل',
    companyName: 'اسم الشركة',
    domain: 'نطاق الشركة (example.com)',
    message:
      'سياق اختياري: مخاوف تسريب البريد، انتحال المسؤولين، متطلبات الامتثال، إلخ.',
    submit: 'احصل على تقييم مجاني للويب المظلم',
    successTitle: 'تم استلام طلب التقييم',
    successBody:
      'شكرًا لك. سيراجع فريقنا نطاقك ويتواصل معك بملخص مُقنّع لتقييم الويب المظلم.',
    errors: {
      fullName: 'الاسم الكامل مطلوب.',
      emailRequired: 'البريد الإلكتروني مطلوب.',
      emailInvalid: 'أدخل بريدًا إلكترونيًا صالحًا.',
      companyName: 'اسم الشركة مطلوب.',
      domain: 'نطاق الشركة مطلوب.',
    },
    submitError: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    consentRequired: 'يجب الموافقة على معالجة البيانات للمتابعة.',
  },
} as const

const inputClass =
  'min-h-[48px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/15'

export default function DarkWebAssessmentForm({ campaign }: DarkWebAssessmentFormProps) {
  const { locale } = useLocale()
  const t = COPY[locale === 'ar' ? 'ar' : 'en']

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    companyName: '',
    domain: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!form.fullName.trim()) next.fullName = t.errors.fullName
    if (!form.email.trim()) {
      next.email = t.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t.errors.emailInvalid
    }
    if (!form.companyName.trim()) next.companyName = t.errors.companyName
    if (!form.domain.trim()) next.domain = t.errors.domain
    if (!form.consent) next.consent = t.consentRequired
    return next
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')

    const honeypot = (
      event.currentTarget.elements.namedItem('website') as HTMLInputElement | null
    )?.value
    if (honeypot?.trim()) {
      setIsSuccess(true)
      return
    }

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/campaigns/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: campaign._id,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          companyName: form.companyName.trim(),
          domain: form.domain.trim(),
          message: form.message.trim() || undefined,
          consent: form.consent,
        }),
      })

      const data = (await res.json()) as {
        success?: boolean
        error?: string
        errors?: FormErrors
      }

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors)
        }
        setSubmitError(data.error ?? t.submitError)
        return
      }

      setIsSuccess(true)
    } catch {
      setSubmitError(t.submitError)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="card-base mx-auto max-w-xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{t.successTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.successBody}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-base mx-auto max-w-xl p-6 sm:p-8"
      noValidate
    >
      <h2 className="text-2xl font-semibold text-primary-900">{t.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.description}</p>

      <div className="mt-8 space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder={t.fullName}
            className={inputClass}
            autoComplete="name"
          />
          {errors.fullName ? (
            <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
          ) : null}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder={t.email}
            className={inputClass}
            autoComplete="email"
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
            placeholder={t.companyName}
            className={inputClass}
            autoComplete="organization"
          />
          {errors.companyName ? (
            <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>
          ) : null}
        </div>

        <div>
          <input
            type="text"
            name="domain"
            value={form.domain}
            onChange={(e) => setForm((prev) => ({ ...prev, domain: e.target.value }))}
            placeholder={t.domain}
            className={inputClass}
          />
          {errors.domain ? (
            <p className="mt-1 text-xs text-red-600">{errors.domain}</p>
          ) : null}
        </div>

        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            placeholder={t.message}
            rows={4}
            className={`${inputClass} min-h-[120px] resize-y`}
          />
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          aria-hidden
        />
      </div>

      {submitError ? (
        <p className="mt-4 text-sm text-red-600">{submitError}</p>
      ) : null}

      <div className="mt-4">
        <PdplConsentField
          checked={form.consent}
          onChange={(consent) => setForm((prev) => ({ ...prev, consent }))}
          error={errors.consent}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
        {t.submit}
      </button>
    </form>
  )
}
