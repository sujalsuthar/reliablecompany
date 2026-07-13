import type { PageSeoMap } from '@/lib/cms/page-seo'
import type {
  CtaBannerContent,
  FooterContent,
  GlobalContent,
  HomepageSection,
  NavbarContent,
  SectionHeaderContent,
} from '@/lib/cms/editor/types'
import type { PageHeroImages } from '@/lib/page-heroes'
import type {
  Division,
  Hero,
  Page,
  Project,
  Service,
  SiteSettings,
  TeamMember,
  WhyStat,
} from '@/lib/types'
import type { FieldStyle } from '@/lib/cms/editor/types'

export type ContentStatus = 'active' | 'inactive'
export type PublishStatus = 'draft' | 'published'

export interface CmsService extends Service {
  titleAr?: string
  category?: string
  status?: ContentStatus
}

export interface CmsProject extends Project {
  status?: ContentStatus
}

export interface BlogPost {
  _id: string
  title: string
  titleAr?: string
  slug: string
  excerpt?: string
  excerptAr?: string
  content?: string
  contentAr?: string
  coverImageSrc?: string
  author?: string
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
  status: PublishStatus
  createdAt: string
  updatedAt: string
}

export interface Career {
  _id: string
  title: string
  titleAr?: string
  department?: string
  location?: string
  description?: string
  descriptionAr?: string
  responsibilities?: string[]
  status: ContentStatus
  order?: number
}

export interface CareerApplication {
  _id: string
  careerId: string
  fullName: string
  email: string
  phone: string
  city?: string
  position: string
  resumeUrl?: string
  resumeFileName?: string
  message?: string
  status: 'new' | 'reviewed' | 'archived'
  submittedAt: string
}

export interface Enquiry {
  _id: string
  fullName: string
  email: string
  phone: string
  companyName?: string
  city?: string
  service?: string
  division: string
  message: string
  status: 'new' | 'reviewed' | 'archived'
  submittedAt: string
}

export interface Campaign {
  _id: string
  name: string
  badge: string
  badgeAr?: string
  title: string
  titleAr?: string
  subtitle: string
  subtitleAr?: string
  body: string
  bodyAr?: string
  ctaText: string
  ctaTextAr?: string
  applyPagePath: string
  floatingLabel: string
  floatingLabelAr?: string
  floatingText: string
  floatingTextAr?: string
  showDelayMs?: number
  status: ContentStatus
  order?: number
}

export interface CampaignApplication {
  _id: string
  campaignId: string
  campaignName: string
  fullName: string
  email: string
  companyName: string
  domain: string
  message?: string
  status: 'new' | 'reviewed' | 'archived'
  submittedAt: string
}

export interface Industry {
  _id: string
  title: string
  titleAr?: string
  icon?: string
  imageSrc?: string
  order?: number
  status?: ContentStatus
}

export interface Certification {
  _id: string
  name: string
  nameAr?: string
  logoUrl?: string
  order?: number
}

export interface CompanyValue {
  _id: string
  title: string
  description: string
  icon?: string
  order?: number
}

export interface CmsPages {
  about: Page
  privacy: Page
  terms: Page
}

export interface CmsStore {
  siteSettings: SiteSettings
  globalContent: GlobalContent
  navbar: NavbarContent
  footer: FooterContent
  homepageSections: HomepageSection[]
  sectionContent: Record<string, SectionHeaderContent>
  ctaBanner: CtaBannerContent
  fieldStyles: Record<string, FieldStyle>
  hero: Hero
  whyStats: WhyStat[]
  divisions: Division[]
  services: CmsService[]
  projects: CmsProject[]
  team: TeamMember[]
  industries: Industry[]
  certifications: Certification[]
  values: CompanyValue[]
  pages: CmsPages
  pageSeo: PageSeoMap
  pageHeroImages: PageHeroImages
  blogPosts: BlogPost[]
  careers: Career[]
  careerApplications: CareerApplication[]
  enquiries: Enquiry[]
  campaigns: Campaign[]
  campaignApplications: CampaignApplication[]
  profileVersion?: number
  legalVersion?: number
}

export type CmsCollection =
  | 'services'
  | 'projects'
  | 'blogPosts'
  | 'careers'
  | 'careerApplications'
  | 'enquiries'
  | 'industries'
  | 'divisions'
  | 'team'
  | 'certifications'
  | 'values'
  | 'whyStats'
  | 'campaigns'
  | 'campaignApplications'

export type CmsSingleton = 'siteSettings' | 'hero' | 'pages' | 'pageSeo'
