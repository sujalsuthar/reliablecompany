import type {
  Division,
  Hero,
  Page,
  Project,
  Service,
  ServiceListItem,
  SiteSettings,
  TeamMember,
  WhyStat,
} from '@/lib/types'

import type {
  BlogPost,
  Career,
  Certification,
  CompanyValue,
  Industry,
} from '@/lib/cms/types'
import { getStore } from '@/lib/cms/store'
import { getLocale } from '@/lib/i18n/locale'
import {
  DEFAULT_MEGA_MENU_IMAGE,
  resolvePageHeroImage,
  type PageHeroKey,
} from '@/lib/page-heroes'
import {
  localizeBlogPosts,
  localizeCareers,
  localizeCertifications,
  localizeCtaBanner,
  localizeCompanyValues,
  localizeDivisions,
  localizeFooter,
  localizeGlobalContent,
  localizeHero,
  localizeIndustries,
  localizeNavbar,
  localizePage,
  localizeProjects,
  localizeSectionContent,
  localizeService,
  localizeServices,
  localizeSiteSettings,
  localizeWhyStats,
} from '@/lib/i18n/localize'
import { mergePageSeo, type PageSeoEntry, type PageSeoKey } from '@/lib/cms/page-seo'

async function withLocale<T>(fn: (locale: Awaited<ReturnType<typeof getLocale>>) => T): Promise<T> {
  const locale = await getLocale()
  return fn(locale)
}

export async function getHeroContent(): Promise<Hero> {
  return withLocale(async (locale) => {
    const store = await getStore()
    return localizeHero(store.hero, locale)
  })
}

export async function getServices(): Promise<ServiceListItem[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const services = store.services
      .filter((s) => s.status !== 'inactive')
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return localizeServices(services, locale)
  })
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const service =
      store.services.find(
        (s) => s.slug?.current === slug && s.status !== 'inactive',
      ) ?? null
    return service ? localizeService(service, locale) : null
  })
}

export async function getDivisions(): Promise<Division[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const divisions = [...store.divisions].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    )
    return localizeDivisions(divisions, locale)
  })
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const projects = store.projects.filter(
      (p) => p.featured && p.status !== 'inactive',
    )
    return localizeProjects(projects, locale)
  })
}

export async function getAllProjects(): Promise<Project[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const projects = store.projects.filter((p) => p.status !== 'inactive')
    return localizeProjects(projects, locale)
  })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const project =
      store.projects.find(
        (p) => p.slug?.current === slug && p.status !== 'inactive',
      ) ?? null
    return project ? localizeProjects([project], locale)[0] : null
  })
}

export async function getWhyStats(): Promise<WhyStat[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const stats = [...store.whyStats].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    )
    return localizeWhyStats(stats, locale)
  })
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const store = await getStore()
  return [...store.team].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return withLocale(async (locale) => {
    const store = await getStore()
    return localizeSiteSettings(store.siteSettings, locale)
  })
}

export async function getGlobalContent() {
  return withLocale(async (locale) => {
    const store = await getStore()
    return localizeGlobalContent(store.globalContent, locale)
  })
}

export async function getHomepageSections() {
  const store = await getStore()
  return store.homepageSections.filter((s) => s.visible)
}

export async function getSectionContent(key: string) {
  return withLocale(async (locale) => {
    const store = await getStore()
    return localizeSectionContent(key, store.sectionContent[key], locale)
  })
}

export async function getCtaBanner() {
  return withLocale(async (locale) => {
    const store = await getStore()
    return localizeCtaBanner(store.ctaBanner, locale)
  })
}

export async function getFieldStyles() {
  const store = await getStore()
  return store.fieldStyles
}

export async function getNavbarContent() {
  return withLocale(async (locale) => {
    const store = await getStore()
    return localizeNavbar(store.navbar, locale)
  })
}

export async function getPageHeroImage(pageKey: PageHeroKey): Promise<string> {
  const store = await getStore()
  return resolvePageHeroImage(store.pageHeroImages, pageKey)
}

export async function getMegaMenuImage(): Promise<string> {
  const store = await getStore()
  return store.navbar?.megaMenuImageUrl || DEFAULT_MEGA_MENU_IMAGE
}

export async function getFooterContent() {
  return withLocale(async (locale) => {
    const store = await getStore()
    return localizeFooter(store.footer, locale)
  })
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const pages = store.pages
    let page: Page | null = null
    if (slug === 'about') page = pages.about
    else if (slug === 'privacy') page = pages.privacy
    else if (slug === 'terms') page = pages.terms
    return page ? localizePage(page, locale) : null
  })
}

export async function getIndustries(): Promise<Industry[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const industries = store.industries
      .filter((i) => i.status !== 'inactive')
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return localizeIndustries(industries, locale)
  })
}

export async function getCertifications(): Promise<Certification[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const certs = [...store.certifications].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    )
    return localizeCertifications(certs, locale)
  })
}

export async function getCompanyValues(): Promise<CompanyValue[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const values = [...store.values].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return localizeCompanyValues(values, locale)
  })
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const posts = store.blogPosts
      .filter((p) => p.status === 'published')
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return localizeBlogPosts(posts, locale)
  })
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const post = store.blogPosts.find(
      (p) => p.slug === slug && p.status === 'published',
    )
    if (!post) return null
    return localizeBlogPosts([post], locale)[0]
  })
}

export async function getActiveCareers(): Promise<Career[]> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const careers = store.careers
      .filter((c) => c.status === 'active')
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return localizeCareers(careers, locale)
  })
}

export async function getCareerById(id: string): Promise<Career | null> {
  return withLocale(async (locale) => {
    const store = await getStore()
    const career = store.careers.find((c) => c._id === id && c.status === 'active')
    if (!career) return null
    return localizeCareers([career], locale)[0]
  })
}

export async function getPageSeoEntry(key: PageSeoKey): Promise<PageSeoEntry> {
  const store = await getStore()
  return mergePageSeo(store.pageSeo)[key]
}

export async function getPageSeoMap() {
  const store = await getStore()
  return mergePageSeo(store.pageSeo)
}
