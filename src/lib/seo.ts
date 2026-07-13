import type { Metadata } from 'next'

import type { PageSeoKey } from '@/lib/cms/page-seo'
import type { Locale } from '@/lib/i18n/config'
import { getLocale } from '@/lib/i18n/locale'
import { getPageSeoEntry } from '@/lib/content'
import { getSiteUrl } from '@/lib/site-url'

const BASE_URL = getSiteUrl()
const SITE_NAME = 'Reliable Company'
const SITE_NAME_AR = 'شركة ريلايبل'
const DEFAULT_OG_IMAGE = '/og-default.png'
const DEFAULT_DESCRIPTION =
  'Reliable Company provides professional Vulnerability Assessment and Penetration Testing (VAPT), web application security testing, and cybersecurity consulting across Saudi Arabia.'
const DEFAULT_DESCRIPTION_AR =
  'تقدم شركة ريلايبل خدمات تقييم الثغرات واختبار الاختراق (VAPT) واختبار أمان تطبيقات الويب واستشارات الأمن السيبراني في المملكة العربية السعودية.'

export interface SEOOptions {
  title: string
  titleAr?: string
  titleAlt?: string
  titleAltAr?: string
  description?: string
  descriptionAr?: string
  descriptionAlt?: string
  descriptionAltAr?: string
  keywords?: string
  keywordsAr?: string
  image?: string
  path?: string
  absoluteTitle?: boolean
  locale?: Locale
}

export function generateMetadata(options: SEOOptions): Metadata {
  const {
    title,
    titleAr,
    titleAlt,
    titleAltAr,
    description = DEFAULT_DESCRIPTION,
    descriptionAr = DEFAULT_DESCRIPTION_AR,
    descriptionAlt,
    descriptionAltAr,
    keywords,
    keywordsAr,
    image,
    path = '/',
    absoluteTitle = false,
    locale = 'en',
  } = options

  const isAr = locale === 'ar'
  const primaryTitle = (isAr ? titleAr : title)?.trim() ?? ''
  const altTitle = (isAr ? titleAltAr : titleAlt)?.trim() ?? ''
  const primaryDescription = (isAr ? descriptionAr : description)?.trim() ?? ''
  const altDescription = (isAr ? descriptionAltAr : descriptionAlt)?.trim() ?? ''

  const resolvedTitle = primaryTitle || altTitle
  const resolvedDescription =
    primaryDescription || altDescription || (isAr ? DEFAULT_DESCRIPTION_AR : DEFAULT_DESCRIPTION)
  const resolvedKeywords = (isAr && keywordsAr?.trim() ? keywordsAr : keywords)?.trim()
  const resolvedOgTitle = altTitle || primaryTitle
  const resolvedOgDescription = altDescription || primaryDescription || resolvedDescription
  const siteName = isAr ? SITE_NAME_AR : SITE_NAME

  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const canonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '' : canonicalPath}`
  const ogImage = image ?? DEFAULT_OG_IMAGE
  const openGraphTitle = absoluteTitle ? resolvedOgTitle : `${resolvedOgTitle} | ${siteName}`

  return {
    title: absoluteTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: canonicalUrl,
        ar: canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: openGraphTitle,
      description: resolvedOgDescription,
      url: canonicalUrl || BASE_URL,
      siteName,
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? ['en_US'] : ['ar_SA'],
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: openGraphTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraphTitle,
      description: resolvedOgDescription,
      images: [ogImage],
    },
  }
}

export async function generateLocalizedMetadata(
  options: Omit<SEOOptions, 'locale'>,
): Promise<Metadata> {
  const locale = await getLocale()
  return generateMetadata({ ...options, locale })
}

export async function generateCmsPageMetadata(
  key: PageSeoKey,
  overrides?: Partial<SEOOptions>,
): Promise<Metadata> {
  const locale = await getLocale()
  const entry = await getPageSeoEntry(key)

  const definedOverrides = Object.fromEntries(
    Object.entries(overrides ?? {}).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Partial<SEOOptions>

  return generateMetadata({
    title: entry.seoTitle ?? '',
    titleAr: entry.seoTitleAr,
    titleAlt: entry.seoTitleAlt,
    titleAltAr: entry.seoTitleAltAr,
    description: entry.seoDescription,
    descriptionAr: entry.seoDescriptionAr,
    descriptionAlt: entry.seoDescriptionAlt,
    descriptionAltAr: entry.seoDescriptionAltAr,
    keywords: entry.seoKeywords,
    keywordsAr: entry.seoKeywordsAr,
    path: entry.path,
    // CMS meta titles are full titles — do not append layout template suffix
    absoluteTitle: true,
    locale,
    ...definedOverrides,
  })
}

export { BASE_URL, DEFAULT_DESCRIPTION, SITE_NAME }
