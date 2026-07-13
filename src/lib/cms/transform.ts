import { slugify, textToBlocks } from '@/lib/cms/text'
import type { CmsCollection } from '@/lib/cms/types'
import {
  formatFaqLines,
  formatPipeLines,
  formatStepLines,
  mergeBilingualBenefits,
  mergeBilingualFaqs,
  parseFaqLines,
  parsePipeLines,
  parseStepLines,
} from '@/lib/service-detail'

function tagsToArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  return String(value ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function serviceBenefitsToText(
  items?: { title: string; description: string }[],
): string {
  if (!items?.length) return ''
  return formatPipeLines(items)
}

function serviceFaqsToText(items?: { question: string; answer: string }[]): string {
  if (!items?.length) return ''
  return formatFaqLines(items)
}

function serviceStepsToText(steps?: string[]): string {
  if (!steps?.length) return ''
  return formatStepLines(steps)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function itemToFormValues(collection: CmsCollection, item: any): Record<string, unknown> {
  const values: Record<string, unknown> = { ...item }

  if (collection === 'services' || collection === 'projects') {
    values.fullDescriptionText = item.fullDescription
      ? item.fullDescription
          .map((block: { children?: { text?: string }[] }) =>
            block.children?.map((c) => c.text ?? '').join('') ?? '',
          )
          .join('\n\n')
      : ''
    values.slug = item.slug?.current ?? ''
  }

  if (collection === 'services') {
    values.overviewBulletPoints = item.overviewBulletPoints ?? []
    values.overviewBulletPointsAr = item.overviewBulletPointsAr ?? []
    values.subServices = item.subServices ?? []
    values.subServicesAr = item.subServicesAr ?? []
    values.benefitsText = serviceBenefitsToText(item.benefits)
    values.benefitsTextAr = serviceBenefitsToText(
      item.benefits?.map((b: { titleAr?: string; descriptionAr?: string; title: string; description: string }) => ({
        title: b.titleAr ?? '',
        description: b.descriptionAr ?? '',
      })),
    )
    values.processStepsText = serviceStepsToText(item.processSteps)
    values.processStepsTextAr = serviceStepsToText(item.processStepsAr)
    values.faqsText = serviceFaqsToText(item.faqs)
    values.faqsTextAr = serviceFaqsToText(
      item.faqs?.map((f: { questionAr?: string; answerAr?: string; question: string; answer: string }) => ({
        question: f.questionAr ?? '',
        answer: f.answerAr ?? '',
      })),
    )
    values.keyBenefitsText = serviceBenefitsToText(item.keyBenefits)
    values.keyBenefitsTextAr = serviceBenefitsToText(
      item.keyBenefits?.map((b: { titleAr?: string; descriptionAr?: string; title: string; description: string }) => ({
        title: b.titleAr ?? '',
        description: b.descriptionAr ?? '',
      })),
    )
  }

  if (collection === 'projects') {
    values.divisionName = item.division?.name ?? ''
    values.divisionType = item.division?.type ?? 'civil'
    values.tags = item.tags ?? []
    values.thumbnailSrc = item.thumbnail?.src ?? ''
  }

  if (collection === 'divisions') {
    values.slug = item.slug?.current ?? ''
    values.bulletPoints = item.bulletPoints ?? []
  }

  if (collection === 'careers') {
    values.responsibilities = item.responsibilities ?? []
  }

  if (collection === 'team') {
    values.photoSrc = item.photo?.src ?? ''
  }

  if (collection === 'blogPosts') {
    values.slug = item.slug ?? ''
  }

  return values
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formValuesToItem(collection: CmsCollection, values: Record<string, unknown>): any {
  const data = { ...values }

  if (collection === 'services') {
    const slug = String(values.slug || slugify(String(values.title ?? '')))
    const benefitsEn = parsePipeLines(String(values.benefitsText ?? ''))
    const benefitsAr = parsePipeLines(String(values.benefitsTextAr ?? ''))
    const keyBenefitsEn = parsePipeLines(String(values.keyBenefitsText ?? ''))
    const keyBenefitsAr = parsePipeLines(String(values.keyBenefitsTextAr ?? ''))
    const faqsEn = parseFaqLines(String(values.faqsText ?? ''))
    const faqsAr = parseFaqLines(String(values.faqsTextAr ?? ''))

    return {
      _type: 'service',
      _id: values._id,
      title: values.title,
      titleAr: values.titleAr,
      slug: { _type: 'slug', current: slug },
      icon: values.icon,
      category: values.category || 'Cybersecurity Services',
      categoryAr: values.categoryAr,
      heroImageSrc: values.heroImageSrc || undefined,
      overviewImageSrc: values.overviewImageSrc || undefined,
      shortDescription: values.shortDescription,
      shortDescriptionAr: values.shortDescriptionAr,
      overviewTitle: values.overviewTitle,
      overviewTitleAr: values.overviewTitleAr,
      overviewDescription: values.overviewDescription,
      overviewDescriptionAr: values.overviewDescriptionAr,
      overviewBulletPoints: tagsToArray(values.overviewBulletPoints),
      overviewBulletPointsAr: tagsToArray(values.overviewBulletPointsAr),
      subServices: tagsToArray(values.subServices),
      subServicesAr: tagsToArray(values.subServicesAr),
      contentTitle: values.contentTitle,
      contentTitleAr: values.contentTitleAr,
      fullDescription: textToBlocks(String(values.fullDescriptionText ?? '')),
      fullDescriptionAr: values.fullDescriptionTextAr
        ? textToBlocks(String(values.fullDescriptionTextAr))
        : undefined,
      benefitsTitle: values.benefitsTitle,
      benefitsTitleAr: values.benefitsTitleAr,
      benefits: mergeBilingualBenefits(benefitsEn, benefitsAr),
      processTitle: values.processTitle,
      processTitleAr: values.processTitleAr,
      processSteps: parseStepLines(String(values.processStepsText ?? '')),
      processStepsAr: parseStepLines(String(values.processStepsTextAr ?? '')),
      faqsTitle: values.faqsTitle,
      faqsTitleAr: values.faqsTitleAr,
      faqs: mergeBilingualFaqs(faqsEn, faqsAr),
      keyBenefitsTitle: values.keyBenefitsTitle,
      keyBenefitsTitleAr: values.keyBenefitsTitleAr,
      keyBenefits: mergeBilingualBenefits(keyBenefitsEn, keyBenefitsAr),
      ctaTitle: values.ctaTitle,
      ctaTitleAr: values.ctaTitleAr,
      ctaDescription: values.ctaDescription,
      ctaDescriptionAr: values.ctaDescriptionAr,
      ctaButtonText: values.ctaButtonText,
      ctaButtonTextAr: values.ctaButtonTextAr,
      ctaButtonLink: values.ctaButtonLink || '/contact',
      seoTitle: values.seoTitle,
      seoTitleAr: values.seoTitleAr,
      seoTitleAlt: values.seoTitleAlt,
      seoTitleAltAr: values.seoTitleAltAr,
      seoDescription: values.seoDescription,
      seoDescriptionAr: values.seoDescriptionAr,
      seoDescriptionAlt: values.seoDescriptionAlt,
      seoDescriptionAltAr: values.seoDescriptionAltAr,
      seoKeywords: values.seoKeywords,
      seoKeywordsAr: values.seoKeywordsAr,
      order: Number(values.order) || 0,
      status: values.status || 'active',
    }
  }

  if (collection === 'projects') {
    const slug = String(values.slug || slugify(String(values.title ?? '')))
    const tags = Array.isArray(values.tags)
      ? values.tags
      : String(values.tags ?? '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)

    return {
      _type: 'project',
      title: values.title,
      titleAr: values.titleAr,
      slug: { _type: 'slug', current: slug },
      shortDescription: values.shortDescription,
      shortDescriptionAr: values.shortDescriptionAr,
      fullDescription: textToBlocks(String(values.fullDescriptionText ?? '')),
      fullDescriptionAr: values.fullDescriptionTextAr
        ? textToBlocks(String(values.fullDescriptionTextAr))
        : undefined,
      seoTitle: values.seoTitle,
      seoTitleAr: values.seoTitleAr,
      seoTitleAlt: values.seoTitleAlt,
      seoTitleAltAr: values.seoTitleAltAr,
      seoDescription: values.seoDescription,
      seoDescriptionAr: values.seoDescriptionAr,
      seoDescriptionAlt: values.seoDescriptionAlt,
      seoDescriptionAltAr: values.seoDescriptionAltAr,
      seoKeywords: values.seoKeywords,
      seoKeywordsAr: values.seoKeywordsAr,
      division: {
        name: values.divisionName,
        type: values.divisionType,
      },
      tags,
      completedYear: values.completedYear ? Number(values.completedYear) : undefined,
      featured: Boolean(values.featured),
      thumbnail: values.thumbnailSrc
        ? { _type: 'image', src: String(values.thumbnailSrc), alt: String(values.title ?? '') }
        : undefined,
      status: values.status || 'active',
    }
  }

  if (collection === 'blogPosts') {
    const now = new Date().toISOString()
    return {
      title: values.title,
      titleAr: values.titleAr,
      slug: String(values.slug || slugify(String(values.title ?? ''))),
      excerpt: values.excerpt,
      excerptAr: values.excerptAr,
      content: values.content,
      contentAr: values.contentAr,
      coverImageSrc: values.coverImageSrc,
      author: values.author,
      seoTitle: values.seoTitle,
      seoTitleAr: values.seoTitleAr,
      seoTitleAlt: values.seoTitleAlt,
      seoTitleAltAr: values.seoTitleAltAr,
      seoDescription: values.seoDescription,
      seoDescriptionAr: values.seoDescriptionAr,
      seoDescriptionAlt: values.seoDescriptionAlt,
      seoDescriptionAltAr: values.seoDescriptionAltAr,
      seoKeywords: values.seoKeywords,
      seoKeywordsAr: values.seoKeywordsAr,
      status: values.status || 'draft',
      updatedAt: now,
      createdAt: values.createdAt || now,
    }
  }

  if (collection === 'divisions') {
    const slug = String(values.slug || slugify(String(values.name ?? '')))
    const bulletPoints = Array.isArray(values.bulletPoints)
      ? values.bulletPoints
      : String(values.bulletPoints ?? '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)

    return {
      _type: 'division',
      name: values.name,
      slug: { _type: 'slug', current: slug },
      type: values.type,
      tagLabel: values.tagLabel,
      description: values.description,
      bulletPoints,
      order: Number(values.order) || 0,
    }
  }

  if (collection === 'team') {
    return {
      _type: 'teamMember',
      name: values.name,
      role: values.role,
      division: values.division,
      bio: values.bio,
      linkedIn: values.linkedIn,
      photo: values.photoSrc
        ? { _type: 'image', src: String(values.photoSrc), alt: String(values.name ?? '') }
        : undefined,
      order: Number(values.order) || 0,
    }
  }

  if (collection === 'industries' || collection === 'certifications' || collection === 'values' || collection === 'whyStats') {
    if ('order' in data) data.order = Number(values.order) || 0
    return data
  }

  if (collection === 'careers') {
    return {
      ...data,
      responsibilities: tagsToArray(values.responsibilities),
      order: Number(values.order) || 0,
    }
  }

  return data
}
