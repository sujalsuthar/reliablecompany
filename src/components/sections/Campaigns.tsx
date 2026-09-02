import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { getActiveCampaign } from '@/lib/cms/store'
import { getLocale } from '@/lib/i18n/locale'
import type { Locale } from '@/lib/i18n/config'

function pickLocalized(locale: Locale, en: string, ar?: string): string {
  if (locale === 'ar' && ar?.trim()) return ar
  return en
}

export default async function Campaigns() {
  const locale = await getLocale()
  const campaign = await getActiveCampaign()

  if (!campaign) return null

  const badge = pickLocalized(locale, campaign.badge, campaign.badgeAr)
  const title = pickLocalized(locale, campaign.title, campaign.titleAr)
  const subtitle = pickLocalized(locale, campaign.subtitle, campaign.subtitleAr)
  const body = pickLocalized(locale, campaign.body, campaign.bodyAr)
  const primaryCta = pickLocalized(locale, campaign.ctaText, campaign.ctaTextAr)
  const floatingText = pickLocalized(locale, campaign.floatingText, campaign.floatingTextAr)

  return (
    <section className="bg-[#eaf5fb] py-16 sm:py-20">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="self-center">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary-600">
              {badge}
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-primary-900 sm:text-5xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-4 text-base font-medium text-primary-700">{subtitle}</p>
            ) : null}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600">
              {body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={campaign.applyPagePath}
                className="inline-flex min-h-[50px] items-center justify-center rounded-md bg-primary-600 px-7 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                {primaryCta}
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[50px] items-center justify-center rounded-md border border-primary-300 bg-transparent px-7 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-400"
              >
                {locale === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <article className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
                {locale === 'ar' ? 'حملة نشطة' : 'Active Campaign'}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-primary-900">{campaign.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {floatingText || body}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                {locale === 'ar' ? 'قدّم الآن' : 'Apply now'}
                <ArrowRight className="icon-rtl-flip h-4 w-4" aria-hidden />
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
