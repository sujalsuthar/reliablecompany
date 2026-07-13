import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  Fingerprint,
  Globe,
  KeyRound,
  RadioTower,
  ShieldCheck,
} from 'lucide-react'

import CTABannerSection from '@/components/sections/CTABannerSection'
import CmsPageHero from '@/components/ui/CmsPageHero'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 0

const CONTENT = {
  en: {
    heroTitle: 'Dark Web Monitoring',
    heroDescription:
      'Continuous surveillance of the dark web, criminal forums, and paste sites to detect leaked credentials, exposed data, and threats targeting your organization — before attackers use them.',
    home: 'Home',
    crumb: 'Dark Web Monitoring',
    introTitle: 'Know when your data surfaces on the dark web',
    introBody:
      'Stolen credentials, leaked databases, and insider chatter are traded across dark web marketplaces and closed forums every day. Reliable Company monitors these hidden channels around the clock and alerts you the moment your organization is mentioned — so you can respond before a breach escalates.',
    whatWeMonitor: 'What We Monitor',
    features: [
      {
        title: 'Leaked Credentials',
        body: 'Corporate emails and passwords exposed in breaches and combo lists sold on dark web markets.',
      },
      {
        title: 'Exposed Sensitive Data',
        body: 'Customer records, financial data, and intellectual property offered for sale or leaked publicly.',
      },
      {
        title: 'Brand & Domain Abuse',
        body: 'Phishing kits, spoofed domains, and impersonation targeting your brand and executives.',
      },
      {
        title: 'Threat Actor Chatter',
        body: 'Mentions of your organization in criminal forums, Telegram channels, and ransomware leak sites.',
      },
      {
        title: 'Ransomware Exposure',
        body: 'Early warning if your organization appears on ransomware data-leak and extortion sites.',
      },
      {
        title: 'Third-Party Risk',
        body: 'Exposure originating from vendors, partners, and supply-chain connections you rely on.',
      },
    ],
    howTitle: 'How It Works',
    steps: [
      {
        title: 'Define Your Assets',
        body: 'We map your domains, brands, executives, and sensitive keywords to build a monitoring profile.',
      },
      {
        title: 'Continuous Monitoring',
        body: 'Our platform and analysts scan dark web sources, forums, and leak sites 24/7.',
      },
      {
        title: 'Verified Alerts',
        body: 'Findings are validated by analysts to remove noise and prioritize real threats.',
      },
      {
        title: 'Respond & Remediate',
        body: 'You receive actionable guidance — from password resets to takedown and incident response.',
      },
    ],
    ctaTitle: 'Get a Free Dark Web Assessment',
    ctaBody:
      'Limited-time offer for organizations in Saudi Arabia. Find out what attackers already know about you.',
    ctaButton: 'Request Free Assessment',
  },
  ar: {
    heroTitle: 'مراقبة الويب المظلم',
    heroDescription:
      'مراقبة مستمرة للويب المظلم والمنتديات الإجرامية ومواقع تسريب البيانات لاكتشاف بيانات الاعتماد المسربة والبيانات المكشوفة والتهديدات التي تستهدف مؤسستك — قبل أن يستغلها المهاجمون.',
    home: 'الرئيسية',
    crumb: 'مراقبة الويب المظلم',
    introTitle: 'اعرف متى تظهر بياناتك على الويب المظلم',
    introBody:
      'يتم تداول بيانات الاعتماد المسروقة وقواعد البيانات المسربة يوميًا عبر أسواق الويب المظلم والمنتديات المغلقة. تراقب شركة ريلايبل هذه القنوات الخفية على مدار الساعة وتنبهك لحظة ذكر مؤسستك — لتتمكن من الاستجابة قبل تفاقم الاختراق.',
    whatWeMonitor: 'ما الذي نراقبه',
    features: [
      {
        title: 'بيانات الاعتماد المسربة',
        body: 'رسائل البريد وكلمات المرور المؤسسية المكشوفة في التسريبات والقوائم المباعة على أسواق الويب المظلم.',
      },
      {
        title: 'البيانات الحساسة المكشوفة',
        body: 'سجلات العملاء والبيانات المالية والملكية الفكرية المعروضة للبيع أو المسربة علنًا.',
      },
      {
        title: 'إساءة استخدام العلامة والنطاق',
        body: 'أدوات التصيد والنطاقات المزيفة وانتحال هوية علامتك التجارية والمسؤولين التنفيذيين.',
      },
      {
        title: 'حديث الجهات المهددة',
        body: 'ذكر مؤسستك في المنتديات الإجرامية وقنوات تيليجرام ومواقع تسريب الفدية.',
      },
      {
        title: 'التعرض لبرامج الفدية',
        body: 'إنذار مبكر إذا ظهرت مؤسستك على مواقع تسريب بيانات الفدية والابتزاز.',
      },
      {
        title: 'مخاطر الأطراف الثالثة',
        body: 'التعرض الناشئ عن الموردين والشركاء وسلاسل التوريد التي تعتمد عليها.',
      },
    ],
    howTitle: 'كيف تعمل',
    steps: [
      {
        title: 'تحديد أصولك',
        body: 'نحدد نطاقاتك وعلاماتك التجارية والمسؤولين التنفيذيين والكلمات الحساسة لبناء ملف مراقبة.',
      },
      {
        title: 'مراقبة مستمرة',
        body: 'تفحص منصتنا ومحللونا مصادر الويب المظلم والمنتديات ومواقع التسريب على مدار الساعة.',
      },
      {
        title: 'تنبيهات موثقة',
        body: 'يتم التحقق من النتائج بواسطة المحللين لإزالة الضوضاء وترتيب أولويات التهديدات الحقيقية.',
      },
      {
        title: 'الاستجابة والمعالجة',
        body: 'تتلقى إرشادات قابلة للتنفيذ — من إعادة تعيين كلمات المرور إلى الإزالة والاستجابة للحوادث.',
      },
    ],
    ctaTitle: 'احصل على تقييم مجاني للويب المظلم',
    ctaBody:
      'عرض لفترة محدودة للمؤسسات في المملكة العربية السعودية. اكتشف ما يعرفه المهاجمون عنك بالفعل.',
    ctaButton: 'اطلب التقييم المجاني',
  },
} as const

const FEATURE_ICONS = [KeyRound, Eye, Globe, RadioTower, AlertTriangle, Fingerprint]

export const metadata: Metadata = {
  title: 'Dark Web Monitoring | Reliable Company',
  description:
    'Continuous dark web monitoring for Saudi organizations — detect leaked credentials, exposed data, and threats before attackers exploit them.',
  alternates: { canonical: `${BASE_URL}/dark-web-monitoring` },
}

export default async function DarkWebMonitoringPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const t = CONTENT[locale === 'ar' ? 'ar' : 'en']

  return (
    <>
      <CmsPageHero
        pageKey="services"
        title={t.heroTitle}
        description={t.heroDescription}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: t.crumb },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <ShieldCheck className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="section-title text-primary-900">{t.introTitle}</h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600">{t.introBody}</p>
        </div>
      </section>

      <section className="section-pad bg-primary-50">
        <div className="site-container">
          <h2 className="section-title mb-10 text-center">{t.whatWeMonitor}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length]
              return (
                <article key={feature.title} className="card-base p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <h2 className="section-title mb-10 text-center">{t.howTitle}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step, index) => (
              <div key={step.title} className="relative rounded-2xl border border-gray-100 p-6">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-primary-900">
        <div className="site-container max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.ctaTitle}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">{t.ctaBody}</p>
          <Link
            href="/dark-web-assessment"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            {t.ctaButton}
            <ArrowRight className="icon-rtl-flip h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <CTABannerSection />
    </>
  )
}
