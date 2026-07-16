import Link from 'next/link'

import { createLucideIcon } from 'lucide-react'

import Logo from '@/components/layout/Logo'

import ContactDetails from '@/components/ui/ContactDetails'
import CmsImage from '@/components/ui/CmsImage'

import { CERTIFICATIONS_FOOTER_IMAGE, COMPANY_FACEBOOK_URL, COMPANY_PHONE } from '@/lib/brand'

import { getFooterContent, getGlobalContent, getSiteSettings } from '@/lib/content'

import { getLocale } from '@/lib/i18n/locale'

import { getMessages } from '@/lib/i18n/messages'



const Linkedin = createLucideIcon('Linkedin', [

  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],

  ['rect', { width: '4', height: '12', x: '2', y: '9' }],

  ['circle', { cx: '4', cy: '4', r: '2' }],

])



const Facebook = createLucideIcon('Facebook', [

  ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' }],

])



const headingClasses =

  'mb-4 text-sm font-semibold uppercase tracking-wide text-white'



const linkClasses =

  'inline-flex min-h-[44px] items-center text-sm text-gray-300 transition-colors hover:text-white'



export default async function Footer() {

  const [siteSettings, globalContent, footer, locale] = await Promise.all([

    getSiteSettings(),

    getGlobalContent(),

    getFooterContent(),

    getLocale(),

  ])

  const m = getMessages(locale)

  const description = footer.description || siteSettings?.tagline || ''

  const divisionTagline = footer.divisionTagline ?? 'A division of Reliable Company'

  const certImage = footer.certificationImageUrl || CERTIFICATIONS_FOOTER_IMAGE

  const contactHeading = footer.contactHeading ?? m.footer.contact



  const phone = siteSettings?.phone || globalContent.phone || COMPANY_PHONE

  const email = siteSettings?.email || globalContent.email

  // Prioritize Site Settings so footer address is editable from CMS.
  const address = siteSettings?.address || globalContent.address

  const linkedIn = siteSettings?.linkedIn || globalContent.linkedIn
  const facebook = siteSettings?.facebook || globalContent.facebook || COMPANY_FACEBOOK_URL



  return (

    <footer className="bg-primary-900 text-white">

      <div className="site-container py-12 sm:py-16">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          <div className="lg:col-span-4">

            <div className="mb-3 [&_img]:brightness-0 [&_img]:invert">

              <Logo height={48} logoUrl={globalContent.logoUrl} />

            </div>

            <p className="text-xs font-medium uppercase tracking-widest text-accent-400">

              {divisionTagline}

            </p>

            <p className="mb-6 mt-3 max-w-md text-sm leading-relaxed text-gray-300">

              {description}

            </p>

            {certImage && (

              <div className="rounded-lg bg-white/95 p-3">

                <CmsImage

                  src={certImage}

                  alt="Accreditation certifications — ARS, UAF, IAF, ISO 27001"

                  width={520}

                  height={80}

                  className="h-auto w-full max-w-md object-contain"

                />

              </div>

            )}

            {(linkedIn || facebook) && (

              <div className="mt-6 flex items-center gap-3">

                {linkedIn && (

                  <a

                    href={linkedIn}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-800 text-gray-300 transition-colors hover:bg-primary-700 hover:text-white"

                    aria-label="LinkedIn"

                  >

                    <Linkedin className="h-4 w-4" aria-hidden />

                  </a>

                )}

                {facebook && (

                  <a

                    href={facebook}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-800 text-gray-300 transition-colors hover:bg-primary-700 hover:text-white"

                    aria-label="Facebook"

                  >

                    <Facebook className="h-4 w-4" aria-hidden />

                  </a>

                )}

              </div>

            )}

          </div>



          <div className="lg:col-span-2 lg:col-start-6">

            <h3 className={headingClasses}>{m.footer.services}</h3>

            <ul className="space-y-1">

              {footer.serviceLinks.map((link) => (

                <li key={link.href}>

                  <Link href={link.href} className={linkClasses}>

                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>

          </div>



          <div className="lg:col-span-2">

            <h3 className={headingClasses}>{m.footer.company}</h3>

            <ul className="space-y-1">

              {footer.companyLinks.map((link) => (

                <li key={link.href}>

                  <Link href={link.href} className={linkClasses}>

                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>

          </div>



          <div className="lg:col-span-3">

            <h3 className={headingClasses}>{contactHeading}</h3>

            <ContactDetails
              address={address}
              phone={phone}
              email={email}
              variant="dark"
            />

          </div>

        </div>



        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-800 pt-8 sm:flex-row">

          <div className="text-center sm:text-start">
            <p className="text-sm text-gray-400">{globalContent.copyrightText}</p>
            <p className="mt-1 text-xs text-gray-500">{m.footer.legalNotice}</p>
          </div>

          <div className="flex items-center gap-6">

            <Link href="/privacy" className={linkClasses}>

              {footer.privacyLabel}

            </Link>

            <Link href="/terms" className={linkClasses}>

              {footer.termsLabel}

            </Link>

          </div>

        </div>

      </div>

    </footer>

  )

}


