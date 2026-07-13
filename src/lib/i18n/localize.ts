import type {
  CtaBannerContent,
  FooterContent,
  NavbarContent,
  SectionHeaderContent,
} from '@/lib/cms/editor/types'
import type { BlogPost, Career, Certification, Industry } from '@/lib/cms/types'
import {
  ABOUT_PAGE_AR,
  CERT_AR,
  CTA_AR,
  DIVISION_AR,
  FOOTER_AR,
  FOOTER_CONTACT_AR,
  FOOTER_DIVISION_AR,
  GLOBAL_AR,
  HERO_AR,
  INDUSTRY_AR,
  NAVBAR_AR,
  SECTION_CONTENT_AR,
  SERVICE_SHORT_AR,
  SERVICE_TITLE_AR,
  VALUE_AR,
  WHY_STAT_LABELS_AR,
} from '@/lib/i18n/cms-ar'
import { resolveBilingual } from '@/lib/i18n/bilingual'
import type { Locale } from '@/lib/i18n/config'
import type {
  Division,
  Hero,
  Page,
  Project,
  Service,
  ServiceListItem,
  SiteSettings,
  WhyStat,
} from '@/lib/types'

export function pickLocalized(
  en: string | undefined,
  ar: string | undefined | null,
  locale: Locale,
): string {
  return resolveBilingual(en, ar, locale)
}

export function localizeNavbar(navbar: NavbarContent, locale: Locale): NavbarContent {
  if (locale === 'en') return navbar

  return {
    ...navbar,
    consultationText: pickLocalized(
      navbar.consultationText,
      navbar.consultationTextAr ?? NAVBAR_AR.consultationText,
      locale,
    ),
    mainLinks: navbar.mainLinks.map((link, i) => ({
      ...link,
      label: pickLocalized(
        link.label,
        link.labelAr ?? NAVBAR_AR.mainLinks[i]?.label,
        locale,
      ),
    })),
    resourcesLinks: (navbar.resourcesLinks ?? []).map((link, i) => ({
      ...link,
      label: pickLocalized(
        link.label,
        link.labelAr ?? NAVBAR_AR.resourcesLinks[i]?.label,
        locale,
      ),
    })),
  }
}

export function localizeFooter(footer: FooterContent, locale: Locale): FooterContent {
  if (locale === 'en') return footer

  return {
    ...footer,
    divisionTagline: pickLocalized(
      footer.divisionTagline,
      footer.divisionTaglineAr ?? FOOTER_DIVISION_AR,
      locale,
    ),
    contactHeading: pickLocalized(
      footer.contactHeading,
      footer.contactHeadingAr ?? FOOTER_CONTACT_AR,
      locale,
    ),
    description: pickLocalized(footer.description, footer.descriptionAr ?? FOOTER_AR.description, locale),
    serviceLinks: footer.serviceLinks.map((link, i) => ({
      ...link,
      label: pickLocalized(
        link.label,
        link.labelAr ?? FOOTER_AR.serviceLinks[i]?.label,
        locale,
      ),
    })),
    companyLinks: footer.companyLinks.map((link, i) => ({
      ...link,
      label: pickLocalized(
        link.label,
        link.labelAr ?? FOOTER_AR.companyLinks[i]?.label,
        locale,
      ),
    })),
    privacyLabel: pickLocalized(
      footer.privacyLabel,
      footer.privacyLabelAr ?? FOOTER_AR.privacyLabel,
      locale,
    ),
    termsLabel: pickLocalized(
      footer.termsLabel,
      footer.termsLabelAr ?? FOOTER_AR.termsLabel,
      locale,
    ),
  }
}

export function localizeHero(hero: Hero, locale: Locale): Hero {
  if (locale === 'en') return hero

  return {
    ...hero,
    eyebrow: pickLocalized(hero.eyebrow, hero.eyebrowAr ?? HERO_AR.eyebrow, locale),
    headline: pickLocalized(hero.headline, hero.headlineAr ?? HERO_AR.headline, locale),
    highlightedWord: pickLocalized(
      hero.highlightedWord,
      hero.highlightedWordAr ?? HERO_AR.highlightedWord,
      locale,
    ),
    subheadline: pickLocalized(
      hero.subheadline,
      hero.subheadlineAr ?? HERO_AR.subheadline,
      locale,
    ),
    primaryButtonText: pickLocalized(
      hero.primaryButtonText,
      hero.primaryButtonTextAr ?? HERO_AR.primaryButtonText,
      locale,
    ),
    secondaryButtonText: pickLocalized(
      hero.secondaryButtonText,
      hero.secondaryButtonTextAr ?? HERO_AR.secondaryButtonText,
      locale,
    ),
    stats: hero.stats?.map((stat, i) => ({
      ...stat,
      label: pickLocalized(
        stat.label,
        stat.labelAr ??
          HERO_AR.stats[i]?.label ??
          (stat.label ? WHY_STAT_LABELS_AR[stat.label] : undefined),
        locale,
      ),
    })),
  }
}

export function localizeSectionContent(
  key: string,
  content: SectionHeaderContent | undefined,
  locale: Locale,
): SectionHeaderContent | undefined {
  if (!content || locale === 'en') return content
  const fallback = SECTION_CONTENT_AR[key]

  return {
    ...content,
    label: pickLocalized(content.label, content.labelAr ?? fallback?.label, locale),
    title: pickLocalized(content.title, content.titleAr ?? fallback?.title, locale),
    description: pickLocalized(
      content.description,
      content.descriptionAr ?? fallback?.description,
      locale,
    ),
  }
}

export function localizeCtaBanner(cta: CtaBannerContent, locale: Locale): CtaBannerContent {
  if (locale === 'en') return cta

  return {
    ...cta,
    title: pickLocalized(cta.title, cta.titleAr ?? CTA_AR.title, locale),
    description: pickLocalized(cta.description, cta.descriptionAr ?? CTA_AR.description, locale),
    emailPlaceholder: pickLocalized(
      cta.emailPlaceholder,
      cta.emailPlaceholderAr ?? CTA_AR.emailPlaceholder,
      locale,
    ),
    buttonText: pickLocalized(cta.buttonText, cta.buttonTextAr ?? CTA_AR.buttonText, locale),
    secondaryButtonText: pickLocalized(
      cta.secondaryButtonText,
      cta.secondaryButtonTextAr ?? CTA_AR.secondaryButtonText,
      locale,
    ),
  }
}

export function localizeWhyStats(stats: WhyStat[], locale: Locale): WhyStat[] {
  if (locale === 'en') return stats
  return stats.map((stat) => ({
    ...stat,
    label: pickLocalized(
      stat.label,
      stat.labelAr ?? (stat.label ? WHY_STAT_LABELS_AR[stat.label] : undefined),
      locale,
    ),
    description: pickLocalized(stat.description, stat.descriptionAr, locale),
  }))
}

export function localizeSiteSettings(
  settings: SiteSettings,
  locale: Locale,
): SiteSettings {
  if (locale === 'en') return settings
  return {
    ...settings,
    siteName: pickLocalized(settings.siteName, settings.siteNameAr, locale),
    tagline: pickLocalized(settings.tagline, settings.taglineAr ?? GLOBAL_AR.tagline, locale),
    address: pickLocalized(settings.address, settings.addressAr, locale),
  }
}

export function localizeGlobalContent<T extends {
  siteName?: string
  siteNameAr?: string
  tagline?: string
  taglineAr?: string
  address?: string
  addressAr?: string
  copyrightText?: string
  copyrightTextAr?: string
}>(content: T, locale: Locale): T {
  if (locale === 'en') return content
  return {
    ...content,
    siteName: pickLocalized(content.siteName, content.siteNameAr ?? GLOBAL_AR.siteName, locale),
    tagline: pickLocalized(content.tagline, content.taglineAr ?? GLOBAL_AR.tagline, locale),
    address: pickLocalized(content.address, content.addressAr ?? GLOBAL_AR.address, locale),
    copyrightText: pickLocalized(
      content.copyrightText,
      content.copyrightTextAr ?? GLOBAL_AR.copyrightText,
      locale,
    ),
  }
}

function localizeServiceTitle(
  item: { title: string; titleAr?: string; slug?: { current?: string } },
  locale: Locale,
): string {
  const slug = item.slug?.current
  const arFromMap = slug ? SERVICE_TITLE_AR[slug] : undefined
  return pickLocalized(item.title, item.titleAr ?? arFromMap, locale)
}

export function localizeServices(
  services: ServiceListItem[],
  locale: Locale,
): ServiceListItem[] {
  if (locale === 'en') return services
  return services.map((s) => {
    const slug = s.slug?.current
    return {
      ...s,
      title: localizeServiceTitle(s, locale),
      shortDescription: pickLocalized(
        s.shortDescription,
        s.shortDescriptionAr ?? (slug ? SERVICE_SHORT_AR[slug] : undefined),
        locale,
      ),
    }
  })
}

export function localizeService(service: Service, locale: Locale): Service {
  if (locale === 'en') return service
  const slug = service.slug?.current
  return {
    ...service,
    title: localizeServiceTitle(service, locale),
    shortDescription: pickLocalized(
      service.shortDescription,
      service.shortDescriptionAr ?? (slug ? SERVICE_SHORT_AR[slug] : undefined),
      locale,
    ),
    fullDescription:
      service.fullDescriptionAr && locale === 'ar'
        ? service.fullDescriptionAr
        : service.fullDescription,
  }
}

export function localizeDivisions(divisions: Division[], locale: Locale): Division[] {
  if (locale === 'en') return divisions
  return divisions.map((d) => {
    const ar = DIVISION_AR[d.name]
    if (!ar) return d
    return {
      ...d,
      name: ar.name,
      tagLabel: ar.tagLabel,
      description: ar.description,
      bulletPoints: ar.bulletPoints,
    }
  })
}

export function localizeProjects(projects: Project[], locale: Locale): Project[] {
  if (locale === 'en') return projects
  return projects.map((p) => ({
    ...p,
    title: pickLocalized(p.title, (p as Project & { titleAr?: string }).titleAr, locale),
  }))
}

export function localizePage(page: Page, locale: Locale): Page {
  if (locale === 'en') return page
  const aboutFallback =
    page.slug?.current === 'about' && !page.contentAr
      ? ABOUT_PAGE_AR.content.map((text, i) => ({
          _type: 'block' as const,
          _key: `arb${i}`,
          style: 'normal' as const,
          markDefs: [],
          children: [{ _type: 'span' as const, _key: `arbs${i}`, text, marks: [] }],
        }))
      : undefined

  return {
    ...page,
    title: pickLocalized(
      page.title,
      page.titleAr ??
        (page.slug?.current === 'about'
          ? ABOUT_PAGE_AR.title
          : page.slug?.current === 'privacy'
            ? 'سياسة الخصوصية'
            : page.slug?.current === 'terms'
              ? 'شروط الخدمة'
              : undefined),
      locale,
    ),
    seoTitle: pickLocalized(page.seoTitle, page.seoTitleAr, locale),
    seoDescription: pickLocalized(page.seoDescription, page.seoDescriptionAr, locale),
    content: page.contentAr?.length ? page.contentAr : aboutFallback ?? page.content,
  }
}

export function localizeIndustries(
  industries: Industry[],
  locale: Locale,
): Industry[] {
  if (locale === 'en') return industries
  return industries.map((i) => ({
    ...i,
    title: pickLocalized(i.title, i.titleAr ?? INDUSTRY_AR[i.title], locale),
  }))
}

export function localizeBlogPosts(posts: BlogPost[], locale: Locale): BlogPost[] {
  if (locale === 'en') return posts
  return posts.map((p) => ({
    ...p,
    title: pickLocalized(p.title, p.titleAr, locale),
    excerpt: pickLocalized(p.excerpt, p.excerptAr, locale),
    content: p.contentAr?.trim() ? p.contentAr : p.content,
  }))
}

export function localizeCareers(careers: Career[], locale: Locale): Career[] {
  if (locale === 'en') return careers
  return careers.map((c) => ({
    ...c,
    title: pickLocalized(c.title, c.titleAr, locale),
  }))
}

export function localizeCertifications(
  certs: Certification[],
  locale: Locale,
): Certification[] {
  if (locale === 'en') return certs
  return certs.map((c) => ({
    ...c,
    name: pickLocalized(c.name, c.nameAr ?? CERT_AR[c.name], locale),
  }))
}

export function localizeCompanyValues<
  T extends { title: string; description?: string },
>(values: T[], locale: Locale): T[] {
  if (locale === 'en') return values
  return values.map((v) => {
    const ar = VALUE_AR[v.title]
    if (!ar) return v
    return { ...v, title: ar.title, description: ar.description }
  })
}
