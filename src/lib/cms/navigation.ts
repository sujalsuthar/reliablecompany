import type { CmsCollection } from '@/lib/cms/types'

export interface AdminNavItem {
  label: string
  href: string
  collection?: CmsCollection
}

export interface AdminNavSection {
  title: string
  items: AdminNavItem[]
}

export const ADMIN_PATH_TO_COLLECTION: Record<string, CmsCollection> = {
  services: 'services',
  'case-studies': 'projects',
  'blog-posts': 'blogPosts',
  careers: 'careers',
  'career-applications': 'careerApplications',
  enquiries: 'enquiries',
  industries: 'industries',
  divisions: 'divisions',
  team: 'team',
  certifications: 'certifications',
  values: 'values',
  'why-stats': 'whyStats',
  campaigns: 'campaigns',
  'campaign-applications': 'campaignApplications',
}

export function resolveCollectionPath(path: string): CmsCollection | null {
  return ADMIN_PATH_TO_COLLECTION[path] ?? null
}

export const ADMIN_NAV: AdminNavSection[] = [
  {
    title: 'MAIN',
    items: [
      { label: 'Dashboard', href: '/admin' },
      { label: 'Site Changes', href: '/admin/site-changes' },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { label: 'Blog Posts', href: '/admin/blog-posts', collection: 'blogPosts' },
      { label: 'Case Studies', href: '/admin/case-studies', collection: 'projects' },
      { label: 'Careers', href: '/admin/careers', collection: 'careers' },
      { label: 'Career Applications', href: '/admin/career-applications', collection: 'careerApplications' },
      { label: 'New Enquiries', href: '/admin/enquiries', collection: 'enquiries' },
      { label: 'Campaign Applications', href: '/admin/campaign-applications', collection: 'campaignApplications' },
      { label: 'Services', href: '/admin/services', collection: 'services' },
      { label: 'Industries', href: '/admin/industries', collection: 'industries' },
    ],
  },
  {
    title: 'SITE',
    items: [
      { label: 'Banner Management', href: '/admin/banner' },
      { label: 'Campaigns', href: '/admin/campaigns', collection: 'campaigns' },
      { label: 'Page & Site Images', href: '/admin/site-images' },
      { label: 'About Us', href: '/admin/about' },
      { label: 'Certifications', href: '/admin/certifications', collection: 'certifications' },
      { label: 'Divisions', href: '/admin/divisions', collection: 'divisions' },
      { label: 'Team Members', href: '/admin/team', collection: 'team' },
      { label: 'Company Values', href: '/admin/values', collection: 'values' },
      { label: 'Why Us Stats', href: '/admin/why-stats', collection: 'whyStats' },
      { label: 'Site Settings', href: '/admin/site-settings' },
      { label: 'Page SEO', href: '/admin/seo' },
    ],
  },
]
