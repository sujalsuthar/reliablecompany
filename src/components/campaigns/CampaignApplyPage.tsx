import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import CampaignApplyForm from '@/components/campaigns/CampaignApplyForm'
import { getActiveCampaign } from '@/lib/cms/store'
import type { Campaign } from '@/lib/cms/types'
import { getLocale } from '@/lib/i18n/locale'

function pickLocalized(locale: string, en: string, ar?: string): string {
  return locale === 'ar' && ar?.trim() ? ar : en
}

interface CampaignApplyPageProps {
  applyPagePath: string
  secondaryHref?: string
  secondaryLabelEn?: string
  secondaryLabelAr?: string
}

export default async function CampaignApplyPage({
  applyPagePath,
  secondaryHref,
  secondaryLabelEn = 'Explore Our Services',
  secondaryLabelAr = 'استكشف خدماتنا',
}: CampaignApplyPageProps) {
  const locale = await getLocale()
  const campaign = await getActiveCampaign(applyPagePath)

  if (!campaign) {
    return (
      <section className="section-pad bg-white">
        <div className="site-container max-w-xl text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            {locale === 'ar' ? 'الحملة غير متاحة' : 'Campaign unavailable'}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {locale === 'ar'
              ? 'لا توجد حملة نشطة مرتبطة بهذه الصفحة. فعّل الحملة من لوحة التحكم → Campaigns.'
              : 'No active campaign is linked to this page. Set Status to Active in Admin → Campaigns.'}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700"
          >
            {locale === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
          </Link>
        </div>
      </section>
    )
  }

  return <CampaignApplyLayout campaign={campaign} locale={locale} secondaryHref={secondaryHref} secondaryLabelEn={secondaryLabelEn} secondaryLabelAr={secondaryLabelAr} />
}

function CampaignApplyLayout({
  campaign,
  locale,
  secondaryHref = '/services',
  secondaryLabelEn,
  secondaryLabelAr,
}: {
  campaign: Campaign
  locale: string
  secondaryHref?: string
  secondaryLabelEn?: string
  secondaryLabelAr?: string
}) {
  const badge = pickLocalized(locale, campaign.badge, campaign.badgeAr)
  const title = pickLocalized(locale, campaign.title, campaign.titleAr)
  const subtitle = pickLocalized(locale, campaign.subtitle, campaign.subtitleAr)
  const body = pickLocalized(locale, campaign.body, campaign.bodyAr)
  const ctaText = pickLocalized(locale, campaign.ctaText, campaign.ctaTextAr)
  const secondaryLabel =
    locale === 'ar' && secondaryLabelAr ? secondaryLabelAr : secondaryLabelEn

  return (
    <>
      <section className="section-pad bg-gradient-to-b from-primary-50 to-white">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-primary-100 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-600">
              {badge}
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight text-primary-900 sm:text-4xl lg:text-[42px]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-3 text-base font-medium text-primary-700">{subtitle}</p>
            ) : null}
            {body ? (
              <p className="mt-5 text-base leading-relaxed text-gray-600">{body}</p>
            ) : null}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#apply"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-primary-700"
              >
                {ctaText}
              </a>
              {secondaryHref ? (
                <Link
                  href={secondaryHref}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-[15px] font-medium text-primary-700 transition-colors hover:border-primary-300"
                >
                  {secondaryLabel}
                  <ArrowRight className="icon-rtl-flip h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="section-pad bg-white">
        <div className="site-container">
          <CampaignApplyForm campaign={campaign} />
        </div>
      </section>
    </>
  )
}
