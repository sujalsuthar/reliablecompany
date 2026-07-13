import type { Metadata } from 'next'
import Image from 'next/image'

import CTABannerSection from '@/components/sections/CTABannerSection'
import CmsPageHero from '@/components/ui/CmsPageHero'
import PortableTextContent from '@/components/ui/PortableTextContent'
import {
  getCertifications,
  getCompanyValues,
  getPageBySlug,
  getWhyStats,
} from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { getLucideIcon } from '@/lib/icons'
import { PROFILE_IMAGES } from '@/lib/profile-content'
import { generateCmsPageMetadata } from '@/lib/seo'

export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('about')
}

export default async function AboutPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const [aboutPage, whyStats, companyValues, certifications] = await Promise.all([
    getPageBySlug('about'),
    getWhyStats(),
    getCompanyValues(),
    getCertifications(),
  ])

  const missionHeadline = aboutPage?.title ?? m.aboutPage.heroTitle
  const featuredStat = whyStats[0]

  return (
    <>
      <CmsPageHero
        pageKey="about"
        title={m.aboutPage.heroTitle}
        description={m.aboutPage.heroDescription}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: m.common.about },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="section-title text-primary-900">{missionHeadline}</h2>
              {aboutPage?.content && aboutPage.content.length > 0 ? (
                <div className="mt-6">
                  <PortableTextContent value={aboutPage.content} />
                </div>
              ) : (
                <p className="mt-6 text-base leading-relaxed text-gray-600">
                  {m.aboutPage.fallback}
                </p>
              )}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={PROFILE_IMAGES.hero}
                alt={m.aboutPage.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary-900/30" />
              {featuredStat && (
                <div className="absolute bottom-6 start-6 rounded-card bg-white p-5 shadow-card">
                  <p className="text-3xl font-medium text-primary-600">
                    {featuredStat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{featuredStat.label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <h2 className="section-title mb-10 text-center">{m.aboutPage.values}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value) => {
              const Icon = getLucideIcon(value.icon)
              return (
                <article key={value._id} className="card-base p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-gray-100 bg-primary-50">
        <div className="site-container text-center">
          <h2 className="section-title mb-8">{m.aboutPage.certifications}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert._id}
                className="rounded-tag border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700"
              >
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection />
    </>
  )
}
