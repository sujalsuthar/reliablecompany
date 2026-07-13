import type { PortableTextBlock } from '@portabletext/types'

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt?: string
  _updatedAt?: string
  _rev?: string
}

export interface Slug {
  _type: 'slug'
  current: string
}

export interface SanityImage {
  _type?: 'image'
  src?: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export type DivisionType = 'civil' | 'electrical' | 'mechanical' | 'it'

export interface HeroStat {
  _key?: string
  number?: string
  label?: string
  labelAr?: string
}

export interface Hero extends SanityDocument {
  _type: 'hero'
  eyebrow?: string
  eyebrowAr?: string
  headline: string
  headlineAr?: string
  highlightedWord?: string
  highlightedWordAr?: string
  subheadline?: string
  subheadlineAr?: string
  primaryButtonText?: string
  primaryButtonTextAr?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonTextAr?: string
  secondaryButtonLink?: string
  stats?: HeroStat[]
  backgroundImage?: SanityImage
  seoTitle?: string
  seoTitleAr?: string
  seoDescription?: string
  seoDescriptionAr?: string
  seoKeywords?: string
  seoKeywordsAr?: string
}

export interface ServiceListItem extends SanityDocument {
  _type: 'service'
  title: string
  titleAr?: string
  slug?: Slug
  icon?: string
  shortDescription?: string
  shortDescriptionAr?: string
  category?: string
  categoryAr?: string
  /** Top banner image on the service detail page */
  heroImageSrc?: string
  /** Image beside the overview section (below the hero) */
  overviewImageSrc?: string
  order?: number
}

export interface Service extends ServiceListItem {
  fullDescription?: PortableTextBlock[]
  fullDescriptionAr?: PortableTextBlock[]
  overviewTitle?: string
  overviewTitleAr?: string
  overviewDescription?: string
  overviewDescriptionAr?: string
  overviewBulletPoints?: string[]
  overviewBulletPointsAr?: string[]
  subServices?: string[]
  subServicesAr?: string[]
  contentTitle?: string
  contentTitleAr?: string
  benefitsTitle?: string
  benefitsTitleAr?: string
  benefits?: { title: string; titleAr?: string; description: string; descriptionAr?: string }[]
  processTitle?: string
  processTitleAr?: string
  processSteps?: string[]
  processStepsAr?: string[]
  faqsTitle?: string
  faqsTitleAr?: string
  faqs?: { question: string; questionAr?: string; answer: string; answerAr?: string }[]
  keyBenefitsTitle?: string
  keyBenefitsTitleAr?: string
  keyBenefits?: { title: string; titleAr?: string; description: string; descriptionAr?: string }[]
  ctaTitle?: string
  ctaTitleAr?: string
  ctaDescription?: string
  ctaDescriptionAr?: string
  ctaButtonText?: string
  ctaButtonTextAr?: string
  ctaButtonLink?: string
  seoTitle?: string
  seoTitleAr?: string
  seoTitleAlt?: string
  seoTitleAltAr?: string
  seoDescription?: string
  seoDescriptionAr?: string
  seoDescriptionAlt?: string
  seoDescriptionAltAr?: string
  seoKeywords?: string
  seoKeywordsAr?: string
}

export interface Division extends SanityDocument {
  _type: 'division'
  name: string
  slug?: Slug
  type?: DivisionType
  tagLabel?: string
  description?: string
  bulletPoints?: string[]
  order?: number
}

export interface ProjectDivision {
  name: string
  type?: DivisionType
}

export interface ProjectListItem extends SanityDocument {
  _type: 'project'
  title: string
  titleAr?: string
  slug?: Slug
  shortDescription?: string
  shortDescriptionAr?: string
  thumbnail?: SanityImage
  division?: ProjectDivision
  tags?: string[]
  seoTitle?: string
  seoTitleAr?: string
  seoTitleAlt?: string
  seoTitleAltAr?: string
  seoDescription?: string
  seoDescriptionAr?: string
  seoDescriptionAlt?: string
  seoDescriptionAltAr?: string
  seoKeywords?: string
  seoKeywordsAr?: string
}

export interface Project extends ProjectListItem {
  fullDescription?: PortableTextBlock[]
  fullDescriptionAr?: PortableTextBlock[]
  completedYear?: number
  featured?: boolean
}

export interface WhyStat extends SanityDocument {
  _type: 'whyStat'
  value?: string
  label?: string
  labelAr?: string
  description?: string
  descriptionAr?: string
  order?: number
}

export interface TeamMember extends SanityDocument {
  _type: 'teamMember'
  name: string
  role?: string
  division?: string
  photo?: SanityImage
  bio?: string
  linkedIn?: string
  order?: number
}

export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings'
  siteName: string
  siteNameAr?: string
  tagline?: string
  taglineAr?: string
  logo?: SanityImage
  primaryColor?: string
  phone?: string
  email?: string
  address?: string
  addressAr?: string
  linkedIn?: string
  twitter?: string
  facebook?: string
}

export interface Page extends SanityDocument {
  _type: 'page'
  title: string
  titleAr?: string
  slug: Slug
  seoTitle?: string
  seoTitleAr?: string
  seoDescription?: string
  seoDescriptionAr?: string
  seoKeywords?: string
  seoKeywordsAr?: string
  content?: PortableTextBlock[]
  contentAr?: PortableTextBlock[]
}
