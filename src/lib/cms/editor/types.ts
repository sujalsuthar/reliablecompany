/**
 * Visual Site Editor — type definitions
 * @module cms/editor/types
 */

export type SectionType =
  | 'hero'
  | 'campaigns'
  | 'customLine'
  | 'services'
  | 'whyUs'
  | 'industries'
  | 'divisions'
  | 'projects'
  | 'cta'
  | 'about'
  | 'features'
  | 'testimonials'
  | 'faqs'
  | 'contact'
  | 'gallery'
  | 'team'
  | 'pricing'
  | 'blog'
  | 'certifications'

export type FieldType = 'text' | 'richtext' | 'image' | 'button'

export type TextAlign = 'left' | 'center' | 'right'

export interface FieldStyle {
  fontSize?: string
  fontWeight?: string
  color?: string
  textAlign?: TextAlign
}

export interface ButtonFieldValue {
  text: string
  href: string
  openInNewTab?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface ImageFieldValue {
  src: string
  alt?: string
  caption?: string
}

export interface HomepageSection {
  id: string
  type: SectionType
  visible: boolean
}

export interface SectionHeaderContent {
  label?: string
  labelAr?: string
  title?: string
  titleAr?: string
  description?: string
  descriptionAr?: string
}

export interface CtaBannerContent {
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  emailPlaceholder: string
  emailPlaceholderAr?: string
  buttonText: string
  buttonTextAr?: string
  secondaryButtonText: string
  secondaryButtonTextAr?: string
  secondaryButtonLink: string
}

export interface GlobalContent {
  siteName: string
  siteNameAr?: string
  tagline: string
  taglineAr?: string
  phone: string
  email: string
  address: string
  addressAr?: string
  linkedIn: string
  twitter: string
  facebook: string
  copyrightText: string
  copyrightTextAr?: string
  logoUrl: string
}

export interface NavLinkItem {
  label: string
  labelAr?: string
  href: string
}

export interface NavbarContent {
  consultationText: string
  consultationTextAr?: string
  consultationLink: string
  arabicLabel: string
  mainLinks: NavLinkItem[]
  resourcesLinks: NavLinkItem[]
  megaMenuImageUrl?: string
}

export interface FooterContent {
  description: string
  descriptionAr?: string
  divisionTagline?: string
  divisionTaglineAr?: string
  certificationImageUrl?: string
  contactHeading?: string
  contactHeadingAr?: string
  serviceLinks: NavLinkItem[]
  companyLinks: NavLinkItem[]
  officeCities: string[]
  privacyLabel: string
  privacyLabelAr?: string
  termsLabel: string
  termsLabelAr?: string
}

export interface EditorFieldMeta {
  path: string
  type: FieldType
  label: string
}

export interface SectionDefinition {
  type: SectionType
  label: string
  description: string
  icon: string
  /** Default fields editable in this section (paths relative to store) */
  fields: EditorFieldMeta[]
}
