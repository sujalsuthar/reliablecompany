import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { getStore } from '@/lib/cms/store'
import { getLocale } from '@/lib/i18n/locale'
import type { Locale } from '@/lib/i18n/config'

function pickLocalized(locale: Locale, en: string, ar?: string): string {
  if (locale === 'ar' && ar?.trim()) return ar
  return en
}

const SAMPLE_COPY = {
  en: {
    eyebrow: 'FREE DARK WEB ASSESSMENT',
    headline: 'See what a masked dark web assessment result could look like for your domain',
    cardTag: 'Masked Result',
    leakedTitle: 'Leaked Accounts',
    leakedBody:
      'Potential exposure tied to a***@yourdomain.com and i***@yourdomain.com in historic breach data.',
    brandTitle: 'Brand Mentions',
    brandBody:
      'Suspicious references to yourdomain.com seen in dark web chatter or access-sale listings.',
    whyTag: 'Why It Converts',
    whyTitle: 'A lower-friction entry point than a full VAPT request',
    whyBody:
      'This offer helps visitors engage first, then move naturally to monitoring, security assessment, or a full VAPT conversation.',
    primaryCta: 'Try Free Assessment',
    secondaryCta: 'Explore Monitoring Service',
  },
  ar: {
    eyebrow: 'تقييم مجاني للويب المظلم',
    headline: 'اطلع على شكل نتيجة تقييم مُقنّعة للويب المظلم لنطاقك',
    cardTag: 'نتيجة مُقنّعة',
    leakedTitle: 'حسابات مُسرّبة',
    leakedBody:
      'تعرض محتمل مرتبط بـ a***@yourdomain.com و i***@yourdomain.com في بيانات اختراق تاريخية.',
    brandTitle: 'إشارات للعلامة التجارية',
    brandBody:
      'إشارات مشبوهة إلى yourdomain.com في محادثات الويب المظلم أو قوائم بيع الوصول.',
    whyTag: 'لماذا ينجح',
    whyTitle: 'نقطة دخول أسهل من طلب VAPT كامل',
    whyBody:
      'يساعد هذا العرض الزائر على البدء بسرعة، ثم الانتقال إلى المراقبة أو التقييم الأمني أو مشروع VAPT كامل.',
    primaryCta: 'ابدأ التقييم المجاني',
    secondaryCta: 'استكشف خدمة المراقبة',
  },
} as const

export default async function Campaigns() {
  const locale = await getLocale()
  const store = await getStore()

  const campaign = [...(store.campaigns ?? [])]
    .filter((item) => item.status === 'active')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0]

  if (!campaign) return null

  const content = SAMPLE_COPY[locale]
  const subtitle = pickLocalized(locale, campaign.subtitle, campaign.subtitleAr)
  const body = pickLocalized(locale, campaign.body, campaign.bodyAr)
  const primaryCta = pickLocalized(locale, campaign.ctaText, campaign.ctaTextAr) || content.primaryCta

  return (
    <section className="bg-[#eaf5fb] py-16 sm:py-20">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="self-center">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-primary-900 sm:text-5xl">
              {content.headline}
            </h2>
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
                href="/dark-web-monitoring"
                className="inline-flex min-h-[50px] items-center justify-center rounded-md border border-primary-300 bg-transparent px-7 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-400"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <article className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
                  {content.cardTag}
                </span>
                <h3 className="mt-4 text-3xl font-bold text-primary-900">{content.leakedTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{content.leakedBody}</p>
              </article>
              <article className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
                  {content.cardTag}
                </span>
                <h3 className="mt-4 text-3xl font-bold text-primary-900">{content.brandTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{content.brandBody}</p>
              </article>
            </div>

            <article className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
                {content.whyTag}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-primary-900">{content.whyTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{content.whyBody}</p>
              {subtitle ? (
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                  {subtitle}
                  <ArrowRight className="icon-rtl-flip h-4 w-4" aria-hidden />
                </p>
              ) : null}
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
