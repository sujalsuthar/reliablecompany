'use client'

import { clsx } from 'clsx'
import { Languages, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface BilingualFieldProps {
  label: string
  enValue: string
  arValue: string
  onEnChange: (value: string) => void
  onArChange: (value: string) => void
  type?: 'text' | 'textarea'
  rows?: number
  required?: boolean
  placeholder?: string
  className?: string
}

export default function BilingualField({
  label,
  enValue,
  arValue,
  onEnChange,
  onArChange,
  type = 'text',
  rows = 4,
  required,
  placeholder,
  className,
}: BilingualFieldProps) {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [translating, setTranslating] = useState<'en-ar' | 'ar-en' | null>(null)

  const translate = async (direction: 'en-ar' | 'ar-en') => {
    const source = direction === 'en-ar' ? enValue : arValue
    if (!source.trim()) return

    setTranslating(direction)
    try {
      const res = await fetch('/api/cms/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: source, direction }),
      })
      const data = (await res.json()) as { translated?: string; error?: string }
      if (!res.ok || !data.translated) {
        throw new Error(data.error ?? 'Translation failed')
      }
      if (direction === 'en-ar') {
        onArChange(data.translated)
        setLang('ar')
      } else {
        onEnChange(data.translated)
        setLang('en')
      }
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Translation failed')
    } finally {
      setTranslating(null)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-gray-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20'

  return (
    <div className={clsx('space-y-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4', className)}>
      <p className="text-sm font-semibold text-gray-900">{label}</p>

      <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setLang('en')}
          className={clsx(
            'flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
            lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700',
          )}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLang('ar')}
          className={clsx(
            'flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
            lang === 'ar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700',
          )}
        >
          العربية
        </button>
      </div>

      {lang === 'en' ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              English {required && <span className="text-red-500">*</span>}
            </label>
            <button
              type="button"
              disabled={!arValue.trim() || translating !== null}
              onClick={() => void translate('ar-en')}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 disabled:opacity-50"
            >
              {translating === 'ar-en' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Languages className="h-3 w-3" />
              )}
              From Arabic
            </button>
          </div>
          {type === 'textarea' ? (
            <textarea
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              rows={rows}
              required={required}
              placeholder={placeholder ?? 'Enter English text…'}
              dir="ltr"
              className={inputClass}
            />
          ) : (
            <input
              type="text"
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              required={required}
              placeholder={placeholder ?? 'Enter English text…'}
              dir="ltr"
              className={inputClass}
            />
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              العربية
            </label>
            <button
              type="button"
              disabled={!enValue.trim() || translating !== null}
              onClick={() => void translate('en-ar')}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 disabled:opacity-50"
            >
              {translating === 'en-ar' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Languages className="h-3 w-3" />
              )}
              From English
            </button>
          </div>
          {type === 'textarea' ? (
            <textarea
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              rows={rows}
              placeholder="النص بالعربية"
              dir="rtl"
              className={clsx(inputClass, 'font-arabic text-end')}
            />
          ) : (
            <input
              type="text"
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              placeholder="النص بالعربية"
              dir="rtl"
              className={clsx(inputClass, 'font-arabic text-end')}
            />
          )}
        </div>
      )}
    </div>
  )
}
