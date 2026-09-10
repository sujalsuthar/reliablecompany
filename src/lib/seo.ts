import type { Metadata } from 'next'

import type { PageSeoKey } from '@/lib/cms/page-seo'
import type { Locale } from '@/lib/i18n/config'
import { getLocale } from '@/lib/i18n/locale'
import { getPageSeoEntry } from '@/lib/content'
import { sanitizeCmsText } from '@/lib/seo-sanitize'
import { getSiteUrl } from '@/lib/site-url'

const BASE_URL = getSiteUrl()
const SITE_NAME = 'Reliable Company'
const SITE_NAME_AR = 'شركة ريلايبل'
const DEFAULT_OG_IMAGE = '/logo.png'
const DEFAULT_DESCRIPTION =
  'ISO 27001 certified cybersecurity company in Saudi Arabia offering VAPT, web app penetration testing, network security, and NCA compliance consulting.'
const DEFAULT_DESCRIPTION_AR =
  'شركة أمن سيبراني معتمدة ISO 27001 في السعودية — تقييم الثغرات، اختبار الاختراق، أمان الشبكات، والامتثال لمتطلبات الهيئة الوطنية للأمن السيبراني.'

const META_TITLE_MAX = 60
const META_DESCRIPTION_MAX = 160

function truncateAtWord(text: string, maxLength: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed

  const slice = trimmed.slice(0, maxLength)
  const lastSpace = slice.lastIndexOf(' ')
  if (lastSpace > maxLength * 0.6) {
    return `${slice.slice(0, lastSpace).trim()}…`
  }

  return `${slice.trim()}…`
}

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
  const enTitle = sanitizeCmsText(title?.trim() ?? '')
  const arTitle = sanitizeCmsText(titleAr?.trim() ?? '')
  const enAltTitle = sanitizeCmsText(titleAlt?.trim() ?? '')
  const arAltTitle = sanitizeCmsText(titleAltAr?.trim() ?? '')

  const primaryTitle = (isAr ? arTitle : enTitle) || (isAr ? enTitle : arTitle)
  const altTitle = (isAr ? arAltTitle : enAltTitle) || (isAr ? enAltTitle : arAltTitle)

  const primaryDescription = (isAr ? descriptionAr : description)?.trim() ?? ''
  const altDescription = (isAr ? descriptionAltAr : descriptionAlt)?.trim() ?? ''

  const resolvedTitle = truncateAtWord(
    primaryTitle || altTitle || (isAr ? 'شركة ريلايبل' : 'Reliable Company'),
    META_TITLE_MAX,
  )
  const resolvedDescription = truncateAtWord(
    primaryDescription || altDescription || (isAr ? DEFAULT_DESCRIPTION_AR : DEFAULT_DESCRIPTION),
    META_DESCRIPTION_MAX,
  )
  const resolvedKeywords = (isAr && keywordsAr?.trim() ? keywordsAr : keywords)?.trim()
  const resolvedOgTitle = truncateAtWord(altTitle || primaryTitle || resolvedTitle, META_TITLE_MAX)
  const resolvedOgDescription = truncateAtWord(
    altDescription || primaryDescription || resolvedDescription,
    META_DESCRIPTION_MAX,
  )
  const siteName = isAr ? SITE_NAME_AR : SITE_NAME

  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const canonicalUrl =
    canonicalPath === '/'
      ? `${BASE_URL}/`
      : `${BASE_URL}${canonicalPath}`
  const ogImage = image ?? DEFAULT_OG_IMAGE
  const openGraphTitle = absoluteTitle ? resolvedOgTitle : `${resolvedOgTitle} | ${siteName}`

  return {
    title: absoluteTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    alternates: {
      canonical: canonicalPath,
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
