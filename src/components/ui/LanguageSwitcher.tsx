'use client'

import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useLocale } from '@/components/providers/LocaleProvider'
import { LOCALE_LABELS, type Locale } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  className?: string
  size?: 'xs' | 'sm' | 'md'
}

const LOCALES: Locale[] = ['ar', 'en']

export default function LanguageSwitcher({ className, size = 'md' }: LanguageSwitcherProps) {
  const { locale, isPending, setLocale } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      role="group"
      aria-label="Language switcher"
      suppressHydrationWarning
      className={clsx(
        'inline-flex items-center rounded-full border border-gray-200 bg-gray-50',
        size === 'xs' ? 'p-px text-[11px]' : size === 'sm' ? 'p-0.5 text-xs' : 'p-0.5 text-sm',
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = locale === code
        return (
          <button
            key={code}
            type="button"
            disabled={isPending}
            onClick={() => void setLocale(code)}
            suppressHydrationWarning
            className={clsx(
              'interactive relative rounded-full font-medium transition-all',
              size === 'xs'
                ? 'h-7 min-w-[58px] max-w-[68px] px-1.5'
                : size === 'sm'
                  ? 'h-8 min-w-[64px] px-2.5'
                  : 'h-9 min-w-[80px] px-3.5',
              active
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
              isPending && !active && 'opacity-60',
            )}
            aria-pressed={active}
            aria-label={`Switch to ${LOCALE_LABELS[code]}`}
          >
            {mounted && isPending && active ? (
              <Loader2 className="mx-auto h-3.5 w-3.5 animate-spin" />
            ) : (
              LOCALE_LABELS[code]
            )}
          </button>
        )
      })}
    </div>
  )
}
