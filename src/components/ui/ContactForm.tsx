'use client'

import { clsx } from 'clsx'
import { Loader2, Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

import { useLocale } from '@/components/providers/LocaleProvider'
import PdplConsentField from '@/components/ui/PdplConsentField'

type MessagesContactForm = ReturnType<
  typeof import('@/lib/i18n/messages').getMessages
>['contact']['form']

type CityOption = keyof MessagesContactForm['cities']
type ServiceOption = keyof MessagesContactForm['services']

interface FormData {
  fullName: string
  email: string
  phone: string
  companyName: string
  city: CityOption | ''
  service: ServiceOption | ''
  message: string
  consent: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  city?: string
  service?: string
  message?: string
  consent?: string
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  city: '',
  service: '',
  message: '',
  consent: false,
}

const inputClasses =
  'min-h-[48px] w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:bg-white focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-60'

const errorInputClasses = 'ring-2 ring-red-400'

function RequiredMark() {
  return <span className="text-red-500"> *</span>
}

export default function ContactForm() {
  const { messages } = useLocale()
  const t = messages.contact.form

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateForm = (data: FormData): FormErrors => {
    const next: FormErrors = {}

    if (!data.fullName.trim()) next.fullName = t.errors.fullName
    if (!data.email.trim()) {
      next.email = t.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = t.errors.emailInvalid
    }
    if (!data.phone.trim()) next.phone = t.errors.phone
    if (!data.city) next.city = t.errors.city
    if (!data.service) next.service = t.errors.service
    if (!data.message.trim()) {
      next.message = t.errors.messageRequired
    } else if (data.message.trim().length < 10) {
      next.message = t.errors.messageShort
    }
    if (!data.consent) {
      next.consent = t.errors.consent ?? messages.legal.consentRequired
    }

    return next
  }

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (isSuccess) setIsSuccess(false)
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const honeypot = (
      event.currentTarget.elements.namedItem('website') as HTMLInputElement | null
    )?.value
    if (honeypot?.trim()) {
      setIsSuccess(true)
      setFormData(initialFormData)
      return
    }

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          city: formData.city,
          service: formData.service,
          division: t.services[formData.service as ServiceOption],
          message: formData.message,
          consent: formData.consent,
        }),
      })

      const result = (await response.json()) as { success?: boolean; error?: string }

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? t.error)
      }

      setIsSuccess(true)
      setFormData(initialFormData)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div
        role="status"
        className="rounded-xl border border-primary-100 bg-primary-50 p-8 text-center"
      >
        <p className="text-lg font-medium text-primary-900">{t.success}</p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="interactive mt-6 inline-flex min-h-[44px] items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          {t.submit}
        </button>
      </div>
    )
  }

  const cityKeys = Object.keys(t.cities) as CityOption[]
  const serviceKeys = Object.keys(t.services) as ServiceOption[]

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-900">
          {t.fullName}
          <RequiredMark />
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          disabled={isSubmitting}
          placeholder={t.placeholders.fullName}
          className={clsx(inputClasses, errors.fullName && errorInputClasses)}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
          {t.email}
          <RequiredMark />
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          disabled={isSubmitting}
          placeholder={t.placeholders.email}
          className={clsx(inputClasses, errors.email && errorInputClasses)}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-900">
          {t.phone}
          <RequiredMark />
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          disabled={isSubmitting}
          placeholder={t.placeholders.phone}
          className={clsx(inputClasses, errors.phone && errorInputClasses)}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="companyName" className="mb-2 block text-sm font-semibold text-gray-900">
          {t.companyName}
        </label>
        <input
          id="companyName"
          type="text"
          value={formData.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
          disabled={isSubmitting}
          placeholder={t.placeholders.companyName}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="city" className="mb-2 block text-sm font-semibold text-gray-900">
          {t.city}
          <RequiredMark />
        </label>
        <select
          id="city"
          value={formData.city}
          onChange={(e) => updateField('city', e.target.value as CityOption | '')}
          disabled={isSubmitting}
          className={clsx(inputClasses, errors.city && errorInputClasses)}
        >
          <option value="">{t.selectCity}</option>
          {cityKeys.map((key) => (
            <option key={key} value={key}>
              {t.cities[key]}
            </option>
          ))}
        </select>
        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-semibold text-gray-900">
          {t.service}
          <RequiredMark />
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => updateField('service', e.target.value as ServiceOption | '')}
          disabled={isSubmitting}
          className={clsx(inputClasses, errors.service && errorInputClasses)}
        >
          <option value="">{t.selectService}</option>
          {serviceKeys.map((key) => (
            <option key={key} value={key}>
              {t.services[key]}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-900">
          {t.message}
          <RequiredMark />
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          disabled={isSubmitting}
          placeholder={t.placeholders.message}
          className={clsx(inputClasses, 'resize-y', errors.message && errorInputClasses)}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {submitError && (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <PdplConsentField
        checked={formData.consent}
        onChange={(consent) => updateField('consent', consent)}
        error={errors.consent}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="interactive inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-primary-900 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Send className="icon-rtl-flip h-4 w-4" aria-hidden />
        )}
        {isSubmitting ? t.sending : t.submit}
      </button>
    </form>
  )
}
