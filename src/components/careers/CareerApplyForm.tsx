'use client'

import { clsx } from 'clsx'
import { ArrowRight, CheckCircle2, Loader2, Upload } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'

import { useLocale } from '@/components/providers/LocaleProvider'
import type { Career } from '@/lib/cms/types'
import { COMPANY_EMAIL } from '@/lib/brand'

interface CareerApplyFormProps {
  job: Career
}

interface FormState {
  fullName: string
  email: string
  phone: string
  city: string
  coverLetter: string
  consent: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  coverLetter?: string
  resume?: string
  consent?: string
}

const inputClass =
  'min-h-[48px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/15'

export default function CareerApplyForm({ job }: CareerApplyFormProps) {
  const { messages } = useLocale()
  const t = messages.careerApply

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    coverLetter: '',
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
    if (!form.phone.trim()) next.phone = t.errors.phone
    if (!form.coverLetter.trim() || form.coverLetter.trim().length < 10) {
      next.coverLetter = t.errors.coverLetter
    }
    if (!resumeFile) next.resume = t.errors.resume
    if (!form.consent) next.consent = t.errors.consent
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
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const body = new FormData()
      body.append('careerId', job._id)
      body.append('position', job.title)
      body.append('fullName', form.fullName.trim())
      body.append('email', form.email.trim())
      body.append('phone', form.phone.trim())
      body.append('city', form.city.trim())
      body.append('coverLetter', form.coverLetter.trim())
      body.append('consent', String(form.consent))
      body.append('resume', resumeFile!)

      const res = await fetch('/api/careers/apply', { method: 'POST', body })
      const data = (await res.json()) as {
        success?: boolean
        error?: string
        errors?: FormErrors
      }

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors)
          setSubmitError(t.errors.fixFields)
          return
        }
        throw new Error(data.error ?? t.errors.submitFailed)
      }

      setIsSuccess(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t.errors.submitFailed)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-12">
        <CheckCircle2 className="mb-4 h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="text-2xl font-semibold text-gray-900">{t.successTitle}</h2>
        <p className="mt-3 max-w-md text-sm text-gray-600">{t.successMessage}</p>
        <Link href="/careers" className="btn-primary mt-8 inline-flex">
          {t.backToCareers}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-2">
      {/* Job summary panel */}
      <div className="relative overflow-hidden bg-[#0b1220] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 60%, rgba(14,165,233,0.2) 0%, transparent 40%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-xl">
          <Link
            href="/careers"
            className="text-sm text-white/60 transition hover:text-white"
          >
            ← {t.backToCareers}
          </Link>
          <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
            {t.submitFor} {job.title}
          </h1>
          {job.description && (
            <p className="mt-5 text-base leading-relaxed text-white/75">{job.description}</p>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                {t.responsibilities}
              </p>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t.timeline}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
            </div>
            <p className="mt-4 text-sm text-white/70">{t.timelineHint}</p>
            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="text-white/50">{t.emailLabel}: </span>
                <a href={`mailto:${COMPANY_EMAIL}`} className="text-sky-300 hover:underline">
                  {COMPANY_EMAIL}
                </a>
              </p>
              {job.location && (
                <p>
                  <span className="text-white/50">{t.locationLabel}: </span>
                  {job.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application form */}
      <div className="flex items-center bg-gray-100 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
            {t.formLabel}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">{t.formTitle}</h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div>
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">
                {t.fullName} <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                placeholder={t.fullNamePlaceholder}
                className={clsx(inputClass, errors.fullName && 'border-red-400 ring-2 ring-red-100')}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                {t.email} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={t.emailPlaceholder}
                className={clsx(inputClass, errors.email && 'border-red-400 ring-2 ring-red-100')}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                {t.phone} <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder={t.phonePlaceholder}
                className={clsx(inputClass, errors.phone && 'border-red-400 ring-2 ring-red-100')}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-gray-700">
                {t.city}
              </label>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder={t.cityPlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="coverLetter" className="mb-1.5 block text-sm font-medium text-gray-700">
                {t.coverLetter} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="coverLetter"
                rows={5}
                value={form.coverLetter}
                onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
                placeholder={t.coverLetterPlaceholder}
                className={clsx(
                  inputClass,
                  'min-h-[120px] resize-y',
                  errors.coverLetter && 'border-red-400 ring-2 ring-red-100',
                )}
              />
              {errors.coverLetter && (
                <p className="mt-1 text-xs text-red-600">{errors.coverLetter}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                {t.resume} <span className="text-red-500">*</span>
              </label>
              <div
                className={clsx(
                  'flex items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3',
                  errors.resume && 'border-red-400 bg-red-50/50',
                )}
              >
                <Upload className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-gray-700">
                    {resumeFile ? resumeFile.name : t.resumeHint}
                  </p>
                  <p className="text-xs text-gray-500">{t.resumeTypes}</p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t.browse}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    setResumeFile(file)
                    if (errors.resume) setErrors((prev) => ({ ...prev, resume: undefined }))
                  }}
                />
              </div>
              {errors.resume && <p className="mt-1 text-xs text-red-600">{errors.resume}</p>}
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                className="mt-1 rounded border-gray-300"
              />
              <span>
                {t.consent} <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}

            {submitError && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-sky-500 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              ) : (
                <>
                  {t.submit}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
