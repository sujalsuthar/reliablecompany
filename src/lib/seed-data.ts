import type { PortableTextBlock } from '@portabletext/types'

import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_FACEBOOK_URL,
  COMPANY_PHONE,
} from '@/lib/brand'
import {
  PRIVACY_POLICY_AR,
  PRIVACY_POLICY_EN,
  TERMS_OF_SERVICE_AR,
  TERMS_OF_SERVICE_EN,
} from '@/lib/legal-content'
import { ABOUT_PAGE_AR, HERO_AR } from '@/lib/i18n/cms-ar'
import { DEFAULT_HERO_HOME_IMAGE } from '@/lib/page-heroes'
import { PROFILE_ABOUT, PROFILE_IMAGES, PROFILE_SUBTITLE, PROFILE_TAGLINE } from '@/lib/profile-content'
import {
  buildSeedDivisions,
  buildSeedServices,
  buildServiceImageMap,
} from '@/lib/service-catalog'
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

function block(text: string, key: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
  }
}

function blocks(...paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, i) => block(text, `b${i}`))
}

export const SEED_SITE_SETTINGS: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Reliable Company',
  tagline: `${PROFILE_TAGLINE} — ${PROFILE_SUBTITLE} consultancy for businesses across Saudi Arabia.`,
  phone: COMPANY_PHONE,
  email: COMPANY_EMAIL,
  address: COMPANY_ADDRESS,
  linkedIn: 'https://www.linkedin.com/company/reliablecompany',
  facebook: COMPANY_FACEBOOK_URL,
  siteNameAr: 'شركة ريلايبل',
}

export const SEED_HERO: Hero = {
  _id: 'hero',
  _type: 'hero',
  eyebrow: PROFILE_SUBTITLE.toUpperCase(),
  eyebrowAr: HERO_AR.eyebrow,
  headline: PROFILE_TAGLINE,
  headlineAr: HERO_AR.headline,
  highlightedWord: 'Saudi Arabia',
  highlightedWordAr: HERO_AR.highlightedWord,
  subheadline:
    'Reliable Company provides professional Vulnerability Assessment and Penetration Testing (VAPT), web application security testing, network security assessment, and cybersecurity consulting services for businesses across Saudi Arabia.',
  subheadlineAr: HERO_AR.subheadline,
  primaryButtonText: 'Explore Our Services',
  primaryButtonTextAr: HERO_AR.primaryButtonText,
  primaryButtonLink: '/services',
  secondaryButtonText: 'Chat on WhatsApp',
  secondaryButtonTextAr: HERO_AR.secondaryButtonText,
  secondaryButtonLink: 'https://wa.me/966563913902',
  stats: [
    { _key: 's1', number: '100+', label: 'Years Combined Experience', labelAr: HERO_AR.stats[0].label },
    { _key: 's2', number: '500+', label: 'Industrial Projects Managed', labelAr: HERO_AR.stats[1].label },
    { _key: 's3', number: '300+', label: 'Clients Secured', labelAr: HERO_AR.stats[2].label },
    { _key: 's4', number: '30,000+', label: 'Vulnerabilities Remediated', labelAr: HERO_AR.stats[3].label },
  ],
  backgroundImage: {
    src: DEFAULT_HERO_HOME_IMAGE,
    alt: 'Reliable Company — Cyber Security & VAPT',
  },
}

export const SEED_WHY_STATS: WhyStat[] = [
  { _id: 'why-1', _type: 'whyStat', value: '100+', label: 'Years Combined Experience', labelAr: 'سنوات خبرة مجتمعة', order: 1 },
  { _id: 'why-2', _type: 'whyStat', value: '500+', label: 'Industrial Projects Managed', labelAr: 'مشروع صناعي', order: 2 },
  { _id: 'why-3', _type: 'whyStat', value: '300+', label: 'Clients Secured', labelAr: 'عميل محمي', order: 3 },
  { _id: 'why-4', _type: 'whyStat', value: '30,000+', label: 'Vulnerabilities Remediated', labelAr: 'ثغرة تم معالجتها', order: 4 },
]

export const SEED_DIVISIONS: Division[] = buildSeedDivisions()

export const SEED_SERVICES: Service[] = buildSeedServices()

export const SEED_PROJECTS: Project[] = [
  {
    _id: 'proj-web-vapt',
    _type: 'project',
    title: 'Enterprise Web Application VAPT',
    slug: { _type: 'slug', current: 'enterprise-web-application-vapt' },
    shortDescription:
      'Full-scope web application penetration testing for a major financial services platform in Saudi Arabia.',
    fullDescription: blocks(
      'Comprehensive OWASP-based testing uncovered critical authentication and authorization flaws. Delivered prioritized remediation roadmap with retest validation.',
    ),
    division: { name: 'Offensive Security', type: 'it' },
    tags: ['Web Security', 'VAPT', 'Financial'],
    thumbnail: { src: PROFILE_IMAGES.expertise, alt: 'Web application security testing' },
    completedYear: 2024,
    featured: true,
  },
  {
    _id: 'proj-network',
    _type: 'project',
    title: 'Oil & Gas Network Infrastructure VAPT',
    slug: { _type: 'slug', current: 'oil-gas-network-vapt' },
    shortDescription:
      'External and internal penetration testing for an oil & gas operator\'s corporate and OT network segments.',
    fullDescription: blocks(
      'Dual-perspective VAPT identified segmentation gaps and exposed services. Provided hardening guidance aligned with NCA cybersecurity controls.',
    ),
    division: { name: 'Offensive Security', type: 'it' },
    tags: ['Network Security', 'Oil & Gas', 'OT'],
    thumbnail: { src: PROFILE_IMAGES.industries, alt: 'Network security assessment' },
    completedYear: 2024,
    featured: true,
  },
  {
    _id: 'proj-cloud',
    _type: 'project',
    title: 'Cloud Security Assessment — AWS',
    slug: { _type: 'slug', current: 'cloud-security-assessment-aws' },
    shortDescription:
      'Cloud configuration review and penetration testing for a multi-account AWS environment.',
    fullDescription: blocks(
      'Identified misconfigured S3 buckets, overly permissive IAM policies, and network exposure. Delivered CIS benchmark-aligned remediation plan.',
    ),
    division: { name: 'Security Assessments', type: 'it' },
    tags: ['Cloud Security', 'AWS', 'Compliance'],
    thumbnail: { src: PROFILE_IMAGES.pmc, alt: 'Cloud security assessment' },
    completedYear: 2023,
    featured: true,
  },
  {
    _id: 'proj-iso',
    _type: 'project',
    title: 'ISO 27001 Certification Support',
    slug: { _type: 'slug', current: 'iso-27001-certification-support' },
    shortDescription:
      'Gap analysis and ISMS implementation support for an industrial manufacturing group.',
    fullDescription: blocks(
      'Guided the organization from initial gap assessment through control implementation, internal audit, and successful certification readiness.',
    ),
    division: { name: 'Security Assessments', type: 'it' },
    tags: ['ISO 27001', 'Compliance', 'Manufacturing'],
    thumbnail: { src: PROFILE_IMAGES.designManagement, alt: 'ISO 27001 audit support' },
    completedYear: 2023,
    featured: true,
  },
  {
    _id: 'proj-mobile',
    _type: 'project',
    title: 'Mobile Banking App Security Testing',
    slug: { _type: 'slug', current: 'mobile-banking-app-security' },
    shortDescription:
      'iOS and Android security assessment for a consumer banking application.',
    fullDescription: blocks(
      'Static and dynamic analysis identified insecure data storage and API weaknesses. Coordinated remediation with development team and validated fixes.',
    ),
    division: { name: 'Offensive Security', type: 'it' },
    tags: ['Mobile Security', 'Banking', 'API'],
    thumbnail: { src: PROFILE_IMAGES.feed, alt: 'Mobile application security' },
    completedYear: 2022,
    featured: false,
  },
]

export const SEED_TEAM: TeamMember[] = [
  { _id: 'team-1', _type: 'teamMember', name: 'Certified Penetration Testers', role: 'Offensive Security', division: 'Offensive Security', order: 1 },
  { _id: 'team-2', _type: 'teamMember', name: 'GRC & Compliance Specialists', role: 'GRC', division: 'GRC & Compliance', order: 2 },
  { _id: 'team-3', _type: 'teamMember', name: 'Incident Response Experts', role: 'IR', division: 'Incident Response & Resilience', order: 3 },
]

export const SEED_ABOUT_PAGE: Page = {
  _id: 'page-about',
  _type: 'page',
  title: 'Who We Are',
  titleAr: ABOUT_PAGE_AR.title,
  slug: { _type: 'slug', current: 'about' },
  content: blocks(...PROFILE_ABOUT.split('\n\n')),
  contentAr: blocks(...ABOUT_PAGE_AR.content),
}

export const SEED_PRIVACY_PAGE: Page = {
  _id: 'page-privacy',
  _type: 'page',
  title: 'Privacy Policy',
  titleAr: 'سياسة الخصوصية',
  slug: { _type: 'slug', current: 'privacy' },
  content: PRIVACY_POLICY_EN,
  contentAr: PRIVACY_POLICY_AR,
}

export const SEED_TERMS_PAGE: Page = {
  _id: 'page-terms',
  _type: 'page',
  title: 'Terms of Service',
  titleAr: 'شروط الخدمة',
  slug: { _type: 'slug', current: 'terms' },
  content: TERMS_OF_SERVICE_EN,
  contentAr: TERMS_OF_SERVICE_AR,
}

export function getSeedServiceBySlug(slug: string): Service | null {
  return SEED_SERVICES.find((s) => s.slug?.current === slug) ?? null
}

export function getSeedProjectBySlug(slug: string): Project | null {
  return SEED_PROJECTS.find((p) => p.slug?.current === slug) ?? null
}

export function getSeedPageBySlug(slug: string): Page | null {
  const pages = [SEED_ABOUT_PAGE, SEED_PRIVACY_PAGE, SEED_TERMS_PAGE]
  return pages.find((p) => p.slug.current === slug) ?? null
}

export const SERVICE_IMAGE_MAP: Record<string, string> = buildServiceImageMap()
