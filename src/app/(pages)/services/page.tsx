import type { Metadata } from 'next'

import CTABannerSection from '@/components/sections/CTABannerSection'
import CmsPageHero from '@/components/ui/CmsPageHero'
import ServicesListingGrid from '@/components/sections/ServicesListingGrid'
import JsonLd from '@/components/seo/JsonLd'
import { getServices } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { generateCmsPageMetadata } from '@/lib/seo'
import { breadcrumbSchema, itemListSchema } from '@/lib/structured-data'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('services')
}

export default async function ServicesPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const services = await getServices()

  const breadcrumbs = [
    { label: m.common.home, href: '/' },
    { label: m.common.services },
  ]

  const serviceList = services
    .filter((s) => s.slug?.current)
    .map((s) => ({
      name: s.title,
      url: `/services/${s.slug!.current}`,
    }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            breadcrumbs.map((item) => ({
              name: item.label,
              href: item.href,
            })),
          ),
          itemListSchema({
            name: m.servicePage.heroTitle,
            items: serviceList,
          }),
        ]}
      />
      <CmsPageHero
        pageKey="services"
        title={m.servicePage.heroTitle}
        description={m.servicePage.heroDescription}
        breadcrumbs={breadcrumbs}
      />

      <section className="section-pad bg-white">
        <div className="site-container">
          {services.length > 0 ? (
            <ServicesListingGrid services={services} />
          ) : (
            <p className="text-center text-gray-500">{m.servicePage.empty}</p>
          )}
        </div>
      </section>

      <CTABannerSection />
    </>
  )
}
