import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CTABannerSection from '@/components/sections/CTABannerSection'
import ServiceDetailContent from '@/components/sections/ServiceDetailContent'
import JsonLd from '@/components/seo/JsonLd'
import PageHero from '@/components/ui/PageHero'
import ServiceListingCard from '@/components/ui/ServiceListingCard'
import { getServiceBySlug, getServices } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { resolveServiceImages } from '@/lib/service-images'
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/structured-data'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'
import { generateLocalizedMetadata } from '@/lib/seo'

interface ServiceDetailPageProps {
  params: { slug: string }
}

export const revalidate = PUBLIC_REVALIDATE_SECONDS
export const dynamicParams = true

export async function generateStaticParams() {
  const services = await getServices()

  return services
    .filter((service) => service.slug?.current)
    .map((service) => ({
      slug: service.slug!.current,
    }))
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  const slug = params.slug
  const defaultTitle = `${service.title} in Saudi Arabia | VAPT & Cybersecurity`
  const defaultTitleAr = `${service.title} في السعودية | تقييم الثغرات والأمن السيبراني`
  const defaultDescription =
    service.shortDescription ??
    `Professional ${service.title} services in Saudi Arabia. NCA-compliant assessments by ISO 27001 certified experts.`

  return generateLocalizedMetadata({
    title: service.seoTitle ?? defaultTitle,
    titleAr: service.seoTitleAr ?? defaultTitleAr,
    titleAlt: service.seoTitleAlt ?? service.title,
    titleAltAr: service.seoTitleAltAr,
    description: service.seoDescription ?? defaultDescription,
    descriptionAr: service.seoDescriptionAr,
    descriptionAlt: service.seoDescriptionAlt,
    descriptionAltAr: service.seoDescriptionAltAr,
    keywords: service.seoKeywords,
    keywordsAr: service.seoKeywordsAr,
    path: `/services/${slug}`,
    absoluteTitle: true,
  })
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const locale = await getLocale()
  const m = getMessages(locale)
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const allServices = await getServices()
  const relatedServices = allServices
    .filter((item) => item.slug?.current !== params.slug)
    .slice(0, 3)

  const categoryLabel =
    locale === 'ar' && service.categoryAr ? service.categoryAr : service.category
  const { heroImage, overviewImage } = resolveServiceImages(service, params.slug)

  const breadcrumbs = [
    { label: m.common.home, href: '/' },
    { label: m.common.services, href: '/services' },
    { label: service.title },
  ]

  const faqs = (service.faqs ?? []).map((faq) => ({
    question: locale === 'ar' && faq.questionAr ? faq.questionAr : faq.question,
    answer: locale === 'ar' && faq.answerAr ? faq.answerAr : faq.answer,
  }))

  const faqSchema = faqPageSchema(faqs)
  const jsonLd = [
    breadcrumbSchema(
      breadcrumbs.map((item) => ({
        name: item.label,
        href: item.href,
      })),
    ),
    serviceSchema({
      name: service.title,
      description: service.shortDescription ?? service.title,
      path: `/services/${params.slug}`,
      serviceType: categoryLabel ?? service.category,
    }),
    ...(faqSchema ? [faqSchema] : []),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        title={service.title}
        description={service.shortDescription}
        imageUrl={heroImage}
        breadcrumbs={breadcrumbs}
      />

      <ServiceDetailContent
        service={service}
        overviewImage={overviewImage}
        locale={locale}
        labels={{
          services: m.serviceDetail.servicesLabel,
          serviceContent: m.serviceDetail.serviceContentLabel,
          benefits: m.serviceDetail.benefitsLabel,
          process: m.serviceDetail.processLabel,
          faqs: m.serviceDetail.faqsLabel,
          keyBenefits: m.serviceDetail.keyBenefitsLabel,
          defaultOverviewTitle: m.serviceDetail.defaultOverviewTitle,
          defaultBenefitsTitle: m.serviceDetail.defaultBenefitsTitle,
          defaultProcessTitle: m.serviceDetail.defaultProcessTitle,
          defaultFaqsTitle: m.serviceDetail.defaultFaqsTitle,
          ctaButton: m.serviceDetail.ctaButton,
        }}
      />

      {relatedServices.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-16">
          <div className="site-container">
            <h2 className="mb-8 text-2xl font-medium text-gray-900">
              {m.serviceDetail.related}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceListingCard
                  key={related._id}
                  title={related.title}
                  description={related.shortDescription ?? ''}
                  icon={related.icon ?? 'Circle'}
                  slug={related.slug?.current ?? related._id}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABannerSection />
    </>
  )
}
