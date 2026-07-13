'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useNavOverlay } from '@/components/providers/NavOverlayProvider'
import { useLocale } from '@/components/providers/LocaleProvider'

const STORAGE_KEY = 'reliable-cookie-consent'

export default function CookieBanner() {
  const { messages } = useLocale()
  const { overlayActive } = useNavOverlay()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY)
    if (!choice) {
      setVisible(true)
    }
  }, [])

  const dismiss = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  if (!visible || overlayActive) return null

  return (
    <div className="fixed bottom-4 start-4 z-40 w-[calc(100%-2rem)] max-w-md sm:bottom-6 sm:w-auto">
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-mega">
        <p className="text-sm leading-relaxed text-gray-600">
          {messages.cookie.text}{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            {messages.cookie.privacy}
          </Link>{' '}
          {messages.cookie.and}{' '}
          <Link href="/terms" className="text-primary-600 hover:underline">
            {messages.cookie.terms}
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => dismiss('accepted')}
            className="interactive inline-flex min-h-[44px] items-center justify-center rounded-md bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
          >
            {messages.cookie.accept}
          </button>
          <button
            type="button"
            onClick={() => dismiss('rejected')}
            className="interactive inline-flex min-h-[44px] items-center justify-center rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {messages.cookie.reject}
          </button>
        </div>
      </div>
    </div>
  )
}
