'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ShieldAlert, X } from 'lucide-react'

import { useLocale } from '@/components/providers/LocaleProvider'
import type { Campaign } from '@/lib/cms/types'

type WidgetMode = 'hidden' | 'popup' | 'floating'

function storageKey(campaignId: string) {
  return `reliable-campaign-state-${campaignId}`
}

function pickLocalized(
  locale: string,
  en: string,
  ar: string | undefined,
): string {
  return locale === 'ar' && ar?.trim() ? ar : en
}

export default function CampaignWidget() {
  const { locale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [mode, setMode] = useState<WidgetMode>('hidden')

  useEffect(() => {
    let cancelled = false
    let popupTimer: ReturnType<typeof setTimeout> | undefined
    let idleHandle: number | undefined
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined

    async function load() {
      try {
        const res = await fetch('/api/campaigns/active', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as { campaign: Campaign | null }
        if (cancelled || !data.campaign) return

        setCampaign(data.campaign)
        const saved = localStorage.getItem(storageKey(data.campaign._id))
        if (saved === 'dismissed') {
          return
        }
        if (saved === 'minimized') {
          setMode('floating')
          return
        }

        const delay = data.campaign.showDelayMs ?? 2500
        popupTimer = setTimeout(() => {
          if (!cancelled) setMode('popup')
        }, delay)
      } catch {
        // ignore
      }
    }

    // Defer campaign fetch so first paint wins on shared hosting
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(() => {
        void load()
      }, { timeout: 2500 })
    } else {
      fallbackTimer = setTimeout(() => {
        void load()
      }, 1200)
    }

    return () => {
      cancelled = true
      if (popupTimer) clearTimeout(popupTimer)
      if (fallbackTimer) clearTimeout(fallbackTimer)
      if (idleHandle !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle)
      }
    }
  }, [])

  if (!campaign) return null

  const isApplyPage = pathname === campaign.applyPagePath
  if (isApplyPage && mode === 'popup') return null

  const badge = pickLocalized(locale, campaign.badge, campaign.badgeAr)
  const title = pickLocalized(locale, campaign.title, campaign.titleAr)
  const subtitle = pickLocalized(locale, campaign.subtitle, campaign.subtitleAr)
  const body = pickLocalized(locale, campaign.body, campaign.bodyAr)
  const ctaText = pickLocalized(locale, campaign.ctaText, campaign.ctaTextAr)
  const floatingLabel = pickLocalized(
    locale,
    campaign.floatingLabel,
    campaign.floatingLabelAr,
  )
  const floatingText = pickLocalized(
    locale,
    campaign.floatingText,
    campaign.floatingTextAr,
  )

  const minimize = () => {
    localStorage.setItem(storageKey(campaign._id), 'minimized')
    setMode('floating')
  }

  const dismiss = () => {
    localStorage.setItem(storageKey(campaign._id), 'dismissed')
    setMode('hidden')
  }

  const goToApply = () => {
    minimize()
    router.push(campaign.applyPagePath)
  }

  return (
    <>
      {mode === 'popup' && !isApplyPage ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="campaign-title"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={minimize}
            className="absolute inset-0 bg-primary-950/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-mega">
            <div className="relative bg-primary-900 px-8 pb-10 pt-9 text-center">
              <button
                type="button"
                onClick={minimize}
                aria-label="Close"
                className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>

              <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-primary-800/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-400">
                {badge}
              </span>

              <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-400/15 text-accent-400">
                <ShieldAlert className="h-8 w-8" aria-hidden />
              </div>

              <h2 id="campaign-title" className="mt-5 text-2xl font-semibold text-white">
                {title}
              </h2>
              <p className="mt-1 text-sm font-medium text-accent-400">{subtitle}</p>
            </div>

            <div className="px-8 pb-8 pt-6 text-center">
              <p className="text-sm leading-relaxed text-gray-600">{body}</p>

              <button
                type="button"
                onClick={goToApply}
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-primary-700"
              >
                {ctaText}
              </button>

              <button
                type="button"
                onClick={minimize}
                className="mt-3 text-sm text-gray-400 transition-colors hover:text-gray-600"
              >
                {locale === 'ar' ? 'ربما لاحقًا' : 'Maybe later'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {mode === 'floating' ? (
        <div className="fixed bottom-24 end-6 z-[65] max-w-[280px] sm:max-w-xs">
          <div className="relative overflow-hidden rounded-2xl bg-primary-900 shadow-[0_8px_32px_rgba(10,22,40,0.28)]">
            <button
              type="button"
              onClick={dismiss}
              aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
              className="absolute end-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <button
              type="button"
              onClick={goToApply}
              className="flex w-full items-center gap-3 px-4 py-3 pe-10 text-start text-white transition-transform hover:scale-[1.02]"
              aria-label={floatingText}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
                <ShieldAlert className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-400">
                  {floatingLabel}
                </span>
                <span className="mt-0.5 block text-sm font-medium leading-snug text-white">
                  {floatingText}
                </span>
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
