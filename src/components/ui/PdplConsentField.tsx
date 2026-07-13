'use client'

import Link from 'next/link'

import { useLocale } from '@/components/providers/LocaleProvider'

interface PdplConsentFieldProps {
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
}

export default function PdplConsentField({ checked, onChange, error }: PdplConsentFieldProps) {
  const { messages } = useLocale()
  const t = messages.legal

  return (
    <div>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 rounded border-gray-300"
        />
        <span>
          {t.pdplConsent}{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            {t.privacyLink}
          </Link>{' '}
          {t.pdplSuffix} <span className="text-red-500">*</span>
        </span>
      </label>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
