import {
  COMPANY_EMAIL,
  COMPANY_FACEBOOK_URL,
  COMPANY_LINKEDIN_URL,
  COMPANY_PHONE,
  LOGO_PATH,
} from '@/lib/brand'
import { getSiteUrl } from '@/lib/site-url'

const BASE_URL = getSiteUrl()

const LOGO_IMAGE = {
  '@type': 'ImageObject',
  url: `${BASE_URL}${LOGO_PATH}`,
  width: 512,
  height: 512,
}

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '8648, Prince Muteb Street, Al Aziziyah District',
  addressLocality: 'Jeddah',
  postalCode: '23342',
  addressCountry: 'SA',
}

const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  opens: '08:00',
  closes: '17:00',
}

export interface BreadcrumbItem {
  name: string
  href?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: 'Reliable Company',
    alternateName: 'شركة ريلايبل',
    url: BASE_URL,
    logo: LOGO_IMAGE,
    image: LOGO_IMAGE,
    description:
      'Cybersecurity and VAPT company in Saudi Arabia providing penetration testing, security assessments, and NCA compliance consulting.',
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    priceRange: '$$$',
    address: POSTAL_ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.5587664,
      longitude: 39.2126601,
    },
    openingHoursSpecification: OPENING_HOURS,
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    sameAs: [COMPANY_LINKEDIN_URL, COMPANY_FACEBOOK_URL],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Reliable Company',
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: ['en', 'ar'],
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${BASE_URL}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  }
}

export function serviceSchema(options: {
  name: string
  description: string
  path: string
  serviceType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    serviceType: options.serviceType ?? options.name,
    url: `${BASE_URL}${options.path}`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
  }
}

export function faqPageSchema(items: FaqItem[]) {
  if (!items.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function itemListSchema(options: {
  name: string
  items: { name: string; url: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: options.name,
    numberOfItems: options.items.length,
    itemListElement: options.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${BASE_URL}${item.url}`,
    })),
  }
}

export function articleSchema(options: {
  title: string
  description: string
  path: string
  datePublished?: string
  dateModified?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.title,
    description: options.description,
    url: `${BASE_URL}${options.path}`,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    image: options.image
      ? {
          '@type': 'ImageObject',
          url: options.image.startsWith('http') ? options.image : `${BASE_URL}${options.image}`,
        }
      : LOGO_IMAGE,
    author: { '@id': `${BASE_URL}/#organization` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    mainEntityOfPage: `${BASE_URL}${options.path}`,
  }
}

/** @deprecated Use organizationSchema() — LocalBusiness is merged into the Organization node. */
export function localBusinessSchema() {
  return organizationSchema()
}
