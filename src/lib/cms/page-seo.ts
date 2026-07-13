export type PageSeoKey =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'blog'
  | 'contact'
  | 'careers'
  | 'divisions'
  | 'privacy'
  | 'terms'

export interface PageSeoFields {
  seoTitle?: string
  seoTitleAr?: string
  /** Alternate title for Open Graph / social sharing */
  seoTitleAlt?: string
  seoTitleAltAr?: string
  seoDescription?: string
  seoDescriptionAr?: string
  /** Alternate description for Open Graph / social sharing */
  seoDescriptionAlt?: string
  seoDescriptionAltAr?: string
  seoKeywords?: string
  seoKeywordsAr?: string
}

export interface PageSeoEntry extends PageSeoFields {
  key: PageSeoKey
  label: string
  path: string
}

export type PageSeoMap = Record<PageSeoKey, PageSeoEntry>

export const PAGE_SEO_KEYS: PageSeoKey[] = [
  'home',
  'about',
  'services',
  'projects',
  'blog',
  'contact',
  'careers',
  'divisions',
  'privacy',
  'terms',
]

export function createDefaultPageSeo(): PageSeoMap {
  return {
    home: {
      key: 'home',
      label: 'Homepage',
      path: '/',
      seoTitle: 'Reliable Company | Cyber Security & Penetration Testing Saudi Arabia',
      seoTitleAlt: 'Professional VAPT & Cybersecurity Services — Saudi Arabia',
      seoDescription:
        'Reliable Company provides professional Vulnerability Assessment and Penetration Testing (VAPT), web application security testing, network security assessment, and cybersecurity consulting across Saudi Arabia.',
      seoDescriptionAlt:
        'Cybersecurity and VAPT excellence — protecting applications and infrastructure through real-world security testing in KSA.',
      seoKeywords:
        'cyber security, penetration testing, VAPT, Saudi Arabia, Reliable Company, web application security, network security, ISO 27001',
    },
    about: {
      key: 'about',
      label: 'About Us',
      path: '/about',
      seoTitle: 'About Us | Reliable Company Cybersecurity',
      seoDescription:
        'Learn about Reliable Company — cybersecurity and VAPT specialists protecting businesses across Saudi Arabia since 2016.',
      seoKeywords: 'about Reliable Company, cybersecurity company Saudi Arabia, VAPT consultancy',
    },
    services: {
      key: 'services',
      label: 'Services Listing',
      path: '/services',
      seoTitle: 'Our Services | Cyber Security & VAPT',
      seoDescription:
        'Explore our cybersecurity services — network VAPT, web application penetration testing, mobile security, API testing, cloud assessment, and ISO 27001 audits.',
      seoKeywords:
        'VAPT services, penetration testing, web application security, cloud security, ISO 27001, Saudi Arabia',
    },
    projects: {
      key: 'projects',
      label: 'Case Studies / Projects',
      path: '/projects',
      seoTitle: 'Case Studies & Projects | Reliable Company',
      seoDescription:
        'Portfolio of cybersecurity and VAPT projects across financial, oil & gas, manufacturing, and enterprise sectors in Saudi Arabia.',
      seoKeywords: 'cybersecurity projects, VAPT case studies, Saudi Arabia security portfolio',
    },
    blog: {
      key: 'blog',
      label: 'Blog',
      path: '/blog',
      seoTitle: 'Blog | Cybersecurity Insights',
      seoDescription:
        'Insights and updates from Reliable Company cybersecurity teams across Saudi Arabia.',
      seoKeywords: 'cybersecurity blog, VAPT insights, Saudi security news',
    },
    contact: {
      key: 'contact',
      label: 'Contact',
      path: '/contact',
      seoTitle: 'Contact Us | Reliable Company',
      seoDescription:
        'Contact Reliable Company for cybersecurity consulting and VAPT services in Jeddah and across Saudi Arabia.',
      seoKeywords: 'contact Reliable Company, cybersecurity consultancy Jeddah, VAPT contact',
    },
    careers: {
      key: 'careers',
      label: 'Careers',
      path: '/careers',
      seoTitle: 'Careers | Join Reliable Company',
      seoDescription:
        'Build your career with Reliable Company — cybersecurity and penetration testing teams across the Kingdom.',
      seoKeywords: 'cybersecurity careers Saudi Arabia, penetration tester jobs, Reliable Company careers',
    },
    divisions: {
      key: 'divisions',
      label: 'Divisions',
      path: '/divisions',
      seoTitle: 'Our Divisions | VAPT & Cybersecurity Consulting',
      seoDescription:
        'VAPT & Penetration Testing and Cybersecurity Consulting — two integrated pillars for comprehensive security.',
      seoKeywords: 'VAPT division, cybersecurity consulting, Reliable Company capabilities',
    },
    privacy: {
      key: 'privacy',
      label: 'Privacy Policy',
      path: '/privacy',
      seoTitle: 'Privacy Policy | Reliable Company',
      seoDescription: 'Privacy policy for Reliable Company cybersecurity website.',
      seoKeywords: 'privacy policy, Reliable Company',
    },
    terms: {
      key: 'terms',
      label: 'Terms of Service',
      path: '/terms',
      seoTitle: 'Terms of Service | Reliable Company',
      seoDescription: 'Terms of service for Reliable Company cybersecurity website.',
      seoKeywords: 'terms of service, Reliable Company',
    },
  }
}

export function mergePageSeo(stored?: Partial<PageSeoMap>): PageSeoMap {
  const defaults = createDefaultPageSeo()
  const merged = { ...defaults }

  if (!stored) return merged

  for (const key of PAGE_SEO_KEYS) {
    merged[key] = { ...defaults[key], ...stored[key] }
  }

  return merged
}
