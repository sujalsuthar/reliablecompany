import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_FACEBOOK_URL,
  COMPANY_PHONE,
  COMPANY_WEBSITE,
  LOGO_PATH,
} from '@/lib/brand'
import { getSiteUrl } from '@/lib/site-url'

const BASE_URL = getSiteUrl()

export interface BreadcrumbItem {
  name: string
  href?: string
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${BASE_URL}/#organization`,
    name: 'Reliable Company',
    alternateName: 'شركة ريلايبل',
    url: BASE_URL,
    logo: `${BASE_URL}${LOGO_PATH}`,
    image: `${BASE_URL}${LOGO_PATH}`,
    description:
      'Cybersecurity and VAPT company in Saudi Arabia providing penetration testing, security assessments, and NCA compliance consulting.',
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B64B, Prince Muteb Street, Al Aziziyah District',
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    sameAs: [COMPANY_FACEBOOK_URL, COMPANY_WEBSITE],
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    url: `${BASE_URL}${options.path}`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
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
    image: options.image ? `${BASE_URL}${options.image}` : `${BASE_URL}${LOGO_PATH}`,
    author: { '@id': `${BASE_URL}/#organization` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    mainEntityOfPage: `${BASE_URL}${options.path}`,
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Reliable Company',
    url: BASE_URL,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_ADDRESS,
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.5587664,
      longitude: 39.2126601,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      opens: '09:00',
      closes: '18:00',
    },
  }
}
