import type { Metadata } from 'next'

import BusinessHours from '@/components/ui/BusinessHours'
import ContactForm from '@/components/ui/ContactForm'
import ContactDetails from '@/components/ui/ContactDetails'
import ContactMap from '@/components/ui/ContactMap'
import CmsPageHero from '@/components/ui/CmsPageHero'
import { COMPANY_EMAIL, COMPANY_PHONE } from '@/lib/brand'
import { getFooterContent, getGlobalContent } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { generateCmsPageMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('contact')
}

export default async function ContactPage() {
  const [globalContent, footer, locale] = await Promise.all([
    getGlobalContent(),
    getFooterContent(),
    getLocale(),
  ])
  const messages = getMessages(locale)
  const m = messages.contact
  const email = globalContent.email || COMPANY_EMAIL
  const phone = globalContent.phone || COMPANY_PHONE

  return (
    <>
      <CmsPageHero
        pageKey="contact"
        title={m.title}
        description={m.description}
        breadcrumbs={[
          { label: m.home, href: '/' },
          { label: m.title },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
                  {footer.divisionTagline}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900 md:text-3xl">
                  {m.heading}
                </h2>
                <p className="mt-4 text-gray-600">{m.officesIntro}</p>
              </div>

              <article className="rounded-xl border border-primary-100 bg-primary-50/50 p-6">
                <h3 className="text-lg font-semibold text-primary-900">
                  {footer.contactHeading ?? messages.footer.contact}
                </h3>
                <ContactDetails
                  className="mt-4"
                  address={globalContent.address}
                  phone={phone}
                  email={email}
                />
              </article>

              <BusinessHours
                title={m.businessHours.title}
                weekdayHours={m.businessHours.weekday}
                weekendHours={m.businessHours.weekend}
              />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <h2 className="mb-8 text-2xl font-semibold text-primary-900">
                {m.sendMessage}
              </h2>
              <ContactForm />
            </div>
          </div>

          <ContactMap
            title={m.mapTitle}
            openInMapsLabel={m.openInMaps}
            mapUnavailableLabel={m.mapFallback}
          />
        </div>
      </section>
    </>
  )
}
