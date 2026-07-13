import { PROFILE_IMAGES } from '@/lib/profile-content'

export type PageHeroKey =
  | 'default'
  | 'about'
  | 'careers'
  | 'contact'
  | 'blog'
  | 'services'
  | 'projects'
  | 'divisions'
  | 'privacy'
  | 'terms'

export interface PageHeroImages {
  default: string
  about: string
  careers: string
  contact: string
  blog: string
  services: string
  projects: string
  divisions: string
  privacy: string
  terms: string
}

export const DEFAULT_PAGE_HERO_IMAGES: PageHeroImages = {
  default: PROFILE_IMAGES.hero,
  about: PROFILE_IMAGES.hero,
  careers: PROFILE_IMAGES.industries,
  contact: PROFILE_IMAGES.contact,
  blog: PROFILE_IMAGES.expertise,
  services: PROFILE_IMAGES.pmc,
  projects: PROFILE_IMAGES.industries,
  divisions: PROFILE_IMAGES.expertise,
  privacy: PROFILE_IMAGES.hero,
  terms: PROFILE_IMAGES.hero,
}

export const DEFAULT_HERO_HOME_IMAGE = '/hero-cybersecurity.png'
export const DEFAULT_MEGA_MENU_IMAGE = PROFILE_IMAGES.pmc

export const PAGE_HERO_LABELS: Record<PageHeroKey, string> = {
  default: 'Default (fallback)',
  about: 'About',
  careers: 'Careers',
  contact: 'Contact',
  blog: 'Blog',
  services: 'Services',
  projects: 'Projects / Case Studies',
  divisions: 'Divisions',
  privacy: 'Privacy Policy',
  terms: 'Terms',
}

export function resolvePageHeroImage(
  images: Partial<PageHeroImages> | undefined,
  key: PageHeroKey,
): string {
  const merged = { ...DEFAULT_PAGE_HERO_IMAGES, ...images }
  return merged[key] || merged.default
}
