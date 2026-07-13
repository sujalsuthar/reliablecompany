import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import DarkWebAssessmentForm from '@/components/campaigns/DarkWebAssessmentForm'
import { getActiveCampaign } from '@/lib/cms/store'
import { getLocale } from '@/lib/i18n/locale'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 0

const COPY = {
  en: {
    eyebrow: 'FREE DARK WEB ASSESSMENT',
    title: 'See what a masked dark web assessment result could look like for your domain',
    description:
      'Many organizations only discover leaked credentials after damage is done. This free assessment helps you start the conversation early — before attackers exploit exposed data.',
    ctaPrimary: 'Try Free Assessment',
    ctaSecondary: 'Explore Monitoring Service',
    cards: [
      {
        title: 'Leaked Accounts',
        badge: 'Masked Result',
        body: 'a***@yourdomain.com',
      },
      {
        title: 'Brand Mentions',
        badge: 'Masked Result',
        body: 'Suspicious references to yourdomain.com in dark web chatter',
      },
      {
        title: 'Why It Converts',
        body: 'A lower-friction entry point than a full VAPT request — ideal for organizations starting their security journey.',
      },
    ],
  },
  ar: {
    eyebrow: 'تقييم مجاني للويب المظلم',
    title: 'اطلع على شكل نتيجة تقييم مُقنّعة للويب المظلم لنطاقك',
    description:
      'تكتشف العديد من المؤسسات بيانات الاعتماد المسربة بعد وقوع الضرر. يساعدك هذا التقييم المجاني على بدء المحادثة مبكرًا — قبل أن يستغل المهاجمون البيانات المكشوفة.',
    ctaPrimary: 'جرّب التقييم المجاني',
    ctaSecondary: 'استكشف خدمة المراقبة',
    cards: [
      {
        title: 'الحسابات المسربة',
        badge: 'نتيجة مُقنّعة',
        body: 'a***@yourdomain.com',
      },
      {
        title: 'إشارات العلامة التجارية',
        badge: 'نتيجة مُقنّعة',
        body: 'إشارات مشبوهة إلى yourdomain.com في حديث الويب المظلم',
      },
      {
        title: 'لماذا يعمل',
        body: 'نقطة دخول أسهل من طلب VAPT كامل — مثالية للمؤسسات التي تبدأ رحلتها الأمنية.',
      },
    ],
  },
} as const

export const metadata: Metadata = {
  title: 'Free Dark Web Assessment | Reliable Company',
  description:
    'Request a free dark web assessment for your organization in Saudi Arabia. Discover leaked credentials and exposure risks before attackers exploit them.',
  alternates: { canonical: `${BASE_URL}/dark-web-assessment` },
}

export default async function DarkWebAssessmentPage() {
  const locale = await getLocale()
  const campaign = await getActiveCampaign()
  const t = COPY[locale === 'ar' ? 'ar' : 'en']

  return (
    <>
      <section className="section-pad bg-gradient-to-b from-primary-50 to-white">
        <div className="site-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex rounded-full bg-primary-100 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-600">
                {t.eyebrow}
              </span>
              <h1 className="mt-6 text-3xl font-bold leading-tight text-primary-900 sm:text-4xl lg:text-[42px]">
                {t.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600">
                {t.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#apply"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-primary-700"
                >
                  {t.ctaPrimary}
                </a>
                <Link
                  href="/dark-web-monitoring"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-[15px] font-medium text-primary-700 transition-colors hover:border-primary-300"
                >
                  {t.ctaSecondary}
                  <ArrowRight className="icon-rtl-flip h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {t.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="text-base font-semibold text-gray-900">{card.title}</h2>
                    {'badge' in card && card.badge ? (
                      <span className="rounded-full bg-primary-50 px-3 py-1 text-[11px] font-medium text-primary-600">
                        {card.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="section-pad bg-white">
        <div className="site-container">
          {campaign ? (
            <DarkWebAssessmentForm campaign={campaign} />
          ) : (
            <p className="text-center text-gray-500">
              {locale === 'ar'
                ? 'هذه الحملة غير متاحة حاليًا.'
                : 'This campaign is not currently available.'}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
