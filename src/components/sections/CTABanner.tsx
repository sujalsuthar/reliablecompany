'use client'

import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

import type { CtaBannerContent } from '@/lib/cms/editor/types'

interface CTABannerProps {
  cta?: CtaBannerContent
  phone?: string
  formMessages?: {
    emailInvalid: string
    success: string
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function CTABanner({ cta, formMessages }: CTABannerProps) {
  const content = cta ?? {
    title: 'Protect your business today',
    description:
      'Request a consultation and our cybersecurity team will respond within one business day.',
    emailPlaceholder: 'Enter your email address',
    buttonText: 'Request Consultation',
    secondaryButtonText: 'Chat on WhatsApp',
    secondaryButtonLink: 'https://wa.me/966563913902',
  }

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidEmail(email)) {
      setError(formMessages?.emailInvalid ?? 'Please enter a valid email address.')
      setIsSuccess(false)
      return
    }

    setError('')
    setIsSubmitting(true)
    setIsSuccess(false)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
    setEmail('')
  }

  return (
    <section className="section-pad bg-primary-900 text-white">
      <div className="site-container text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">{content.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/65">{content.description}</p>

        <form
          onSubmit={handleSubmit}
          className="relative mx-auto mt-10 max-w-xl"
          noValidate
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                if (error) setError('')
                if (isSuccess) setIsSuccess(false)
              }}
              placeholder={content.emailPlaceholder}
              disabled={isSubmitting}
              className={clsx(
                'min-h-[48px] flex-1 rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45',
                'disabled:cursor-not-allowed disabled:opacity-60',
              )}
              aria-label="Email address"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'cta-email-error' : undefined}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                'inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors sm:w-auto',
                'hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70',
              )}
            >
              {isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              )}
              {content.buttonText}
            </button>
          </div>

          {error && (
            <p id="cta-email-error" className="mt-2 text-left text-sm text-red-300">
              {error}
            </p>
          )}
        </form>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {content.secondaryButtonLink.startsWith('http') ? (
            <a
              href={content.secondaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              {content.secondaryButtonText}
            </a>
          ) : (
            <Link
              href={content.secondaryButtonLink}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              {content.secondaryButtonText}
            </Link>
          )}
        </div>

        {isSuccess && (
          <div
            role="status"
            className="mx-auto mt-6 max-w-xl rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white"
          >
            {formMessages?.success ?? "Thank you! We'll be in touch soon."}
          </div>
        )}
      </div>
    </section>
  )
}
