import { CheckCircle2, ChevronRight } from 'lucide-react'

import ServiceFaqAccordion from '@/components/sections/ServiceFaqAccordion'
import ServiceKeyBenefitsSection, {
  ServiceBenefitsGrid,
  ServiceProcessGrid,
} from '@/components/sections/ServiceKeyBenefitsSection'
import CmsImage from '@/components/ui/CmsImage'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionLabel from '@/components/ui/SectionLabel'
import PortableTextContent from '@/components/ui/PortableTextContent'
import type { Service } from '@/lib/types'

interface ServiceDetailContentProps {
  service: Service
  overviewImage?: string
  labels: {
    services: string
    serviceContent: string
    benefits: string
    process: string
    faqs: string
    keyBenefits: string
    defaultOverviewTitle: string
    defaultBenefitsTitle: string
    defaultProcessTitle: string
    defaultFaqsTitle: string
    ctaButton: string
  }
}

function pickLocalized<T extends string | undefined>(
  en: T,
  ar: string | undefined,
  locale: 'en' | 'ar',
): T {
  if (locale === 'ar' && ar) return ar as T
  return en
}

function pickLocalizedList(
  en: string[] | undefined,
  ar: string[] | undefined,
  locale: 'en' | 'ar',
): string[] {
  if (locale === 'ar' && ar?.length) return ar
  return en ?? []
}

function highlightFromTitle(title: string, serviceTitle: string): string | undefined {
  if (title.includes(serviceTitle)) return serviceTitle
  const words = serviceTitle.split(' ')
  if (words.length >= 2) {
    const lastTwo = words.slice(-2).join(' ')
    if (title.includes(lastTwo)) return lastTwo
  }
  return words[words.length - 1]
}

function TitleWithBlueHighlight({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>
  }

  const index = title.indexOf(highlight)
  return (
    <>
      {title.slice(0, index)}
      <span className="text-primary-600">{highlight}</span>
      {title.slice(index + highlight.length)}
    </>
  )
}

export default function ServiceDetailContent({
  service,
  overviewImage,
  labels,
  locale = 'en',
}: ServiceDetailContentProps & { locale?: 'en' | 'ar' }) {
  const title = service.title
  const overviewTitle =
    pickLocalized(service.overviewTitle, service.overviewTitleAr, locale) ||
    labels.defaultOverviewTitle.replace('{service}', title)
  const overviewDescription =
    pickLocalized(service.overviewDescription, service.overviewDescriptionAr, locale) ||
    service.shortDescription
  const overviewBullets = pickLocalizedList(
    service.overviewBulletPoints,
    service.overviewBulletPointsAr,
    locale,
  )
  const subServices = pickLocalizedList(service.subServices, service.subServicesAr, locale)
  const contentTitle =
    pickLocalized(service.contentTitle, service.contentTitleAr, locale) || title
  const benefitsTitle =
    pickLocalized(service.benefitsTitle, service.benefitsTitleAr, locale) ||
    labels.defaultBenefitsTitle.replace('{service}', title)
  const processTitle =
    pickLocalized(service.processTitle, service.processTitleAr, locale) ||
    labels.defaultProcessTitle
  const faqsTitle =
    pickLocalized(service.faqsTitle, service.faqsTitleAr, locale) || labels.defaultFaqsTitle
  const keyBenefitsTitle =
    pickLocalized(service.keyBenefitsTitle, service.keyBenefitsTitleAr, locale) ||
    labels.defaultBenefitsTitle.replace('{service}', title)
  const ctaTitle = pickLocalized(service.ctaTitle, service.ctaTitleAr, locale)
  const ctaDescription = pickLocalized(service.ctaDescription, service.ctaDescriptionAr, locale)
  const ctaButton =
    pickLocalized(service.ctaButtonText, service.ctaButtonTextAr, locale) || labels.ctaButton
  const ctaLink = service.ctaButtonLink || '/contact'
  const titleHighlight = highlightFromTitle(overviewTitle, title)

  const benefits =
    service.benefits?.map((item) => ({
      title: pickLocalized(item.title, item.titleAr, locale) ?? item.title,
      description:
        pickLocalized(item.description, item.descriptionAr, locale) ?? item.description,
    })) ?? []

  const keyBenefits =
    service.keyBenefits?.map((item) => ({
      title: pickLocalized(item.title, item.titleAr, locale) ?? item.title,
      description:
        pickLocalized(item.description, item.descriptionAr, locale) ?? item.description,
    })) ?? []

  const processSteps = pickLocalizedList(service.processSteps, service.processStepsAr, locale)

  const faqs =
    service.faqs?.map((item) => ({
      question: pickLocalized(item.question, item.questionAr, locale) ?? item.question,
      answer: pickLocalized(item.answer, item.answerAr, locale) ?? item.answer,
    })) ?? []

  const fullDescription =
    locale === 'ar' && service.fullDescriptionAr?.length
      ? service.fullDescriptionAr
      : service.fullDescription

  return (
    <>
      {(overviewDescription || overviewBullets.length > 0 || subServices.length > 0) && (
        <section className="section-pad bg-white">
          <div className="site-container">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <SectionLabel>{labels.services}</SectionLabel>
                <h2 className="section-title mt-4 text-start">
                  <TitleWithBlueHighlight title={overviewTitle} highlight={titleHighlight} />
                </h2>
                {overviewDescription ? (
                  <p className="mt-4 text-justify text-base leading-relaxed text-gray-600 sm:text-[17px]">
                    {overviewDescription}
                  </p>
                ) : null}

                {overviewBullets.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {overviewBullets.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-primary-600"
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {subServices.length > 0 && (
                  <div className="mt-8 space-y-3">
                    {subServices.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-card border border-gray-100 bg-white px-4 py-3.5 shadow-card transition-shadow hover:shadow-hover"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                          <ChevronRight className="icon-rtl-flip h-4 w-4 text-white" aria-hidden />
                        </span>
                        <span className="text-sm font-medium text-gray-900">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {overviewImage ? (
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(26,79,160,0.18)] lg:aspect-auto lg:min-h-[480px]">
                  <CmsImage
                    src={overviewImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"
                    aria-hidden
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {fullDescription && fullDescription.length > 0 && (
        <section className="section-pad border-t border-gray-100 bg-gray-50">
          <div className="site-container">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
              <SectionLabel>{labels.serviceContent}</SectionLabel>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">{contentTitle}</h2>
              <div className="mt-6 max-w-3xl">
                <PortableTextContent value={fullDescription} />
              </div>
            </div>
          </div>
        </section>
      )}

      <ServiceBenefitsGrid
        label={labels.benefits}
        title={benefitsTitle}
        highlight={titleHighlight}
        items={benefits}
      />

      <ServiceProcessGrid label={labels.process} title={processTitle} steps={processSteps} />

      {faqs.length > 0 && (
        <section className="section-pad bg-white">
          <div className="site-container max-w-3xl">
            <SectionHeader
              align="center"
              label={labels.faqs}
              title={faqsTitle}
              description=""
              className="mb-8"
            />
            <ServiceFaqAccordion items={faqs} />
          </div>
        </section>
      )}

      <ServiceKeyBenefitsSection
        label={labels.keyBenefits}
        title={keyBenefitsTitle}
        highlight={titleHighlight}
        subtitle={overviewDescription ?? service.shortDescription}
        items={keyBenefits}
        ctaTitle={ctaTitle}
        ctaDescription={ctaDescription}
        ctaButton={ctaButton}
        ctaLink={ctaLink}
      />
    </>
  )
}
