import type { Metadata } from 'next'
import { Building2, Calendar, Server, Settings2, Tag, Zap } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'

import CTABannerSection from '@/components/sections/CTABannerSection'
import CmsImage from '@/components/ui/CmsImage'
import PortableTextContent from '@/components/ui/PortableTextContent'
import { getAllProjects, getProjectBySlug } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { getImageUrl } from '@/lib/images'
import { normalizeDivisionType } from '@/lib/project-utils'
import { generateLocalizedMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'
import type { DivisionType } from '@/lib/types'

interface ProjectDetailPageProps {
  params: { slug: string }
}

export const revalidate = PUBLIC_REVALIDATE_SECONDS
export const dynamicParams = true

const divisionBadgeStyles: Record<DivisionType, string> = {
  civil: 'bg-primary-50 text-primary-700',
  electrical: 'bg-primary-50 text-primary-600',
  mechanical: 'bg-primary-50 text-primary-600',
  it: 'bg-primary-50 text-accent-500',
}

const placeholderStyles: Record<
  DivisionType,
  { bg: string; icon: string; Icon: LucideIcon }
> = {
  civil: { bg: 'bg-primary-800', icon: 'text-primary-200', Icon: Building2 },
  electrical: { bg: 'bg-primary-700', icon: 'text-primary-200', Icon: Zap },
  mechanical: { bg: 'bg-primary-800', icon: 'text-accent-400', Icon: Settings2 },
  it: { bg: 'bg-primary-900', icon: 'text-accent-400', Icon: Server },
}

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects()
    return projects
      .filter((project) => project.slug?.current)
      .map((project) => ({
        slug: project.slug!.current,
      }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  try {
    const project = await getProjectBySlug(params.slug)

    if (!project) {
      return { title: 'Project Not Found' }
    }

    return generateLocalizedMetadata({
      title: project.seoTitle ?? project.title,
      titleAr: project.seoTitleAr,
      titleAlt: project.seoTitleAlt,
      titleAltAr: project.seoTitleAltAr,
      description: project.seoDescription ?? project.shortDescription,
      descriptionAr: project.seoDescriptionAr,
      descriptionAlt: project.seoDescriptionAlt,
      descriptionAltAr: project.seoDescriptionAltAr,
      keywords: project.seoKeywords,
      keywordsAr: project.seoKeywordsAr,
      path: `/projects/${params.slug}`,
      image: getImageUrl(project.thumbnail) ?? undefined,
      absoluteTitle: Boolean(project.seoTitle?.trim()),
    })
  } catch (error) {
    console.error('[projects] generateMetadata failed:', params.slug, error)
    return { title: 'Case Study' }
  }
}

function ProjectHeroImage({
  title,
  imageUrl,
  divisionType,
}: {
  title: string
  imageUrl: string | null
  divisionType: DivisionType
}) {
  const placeholder = placeholderStyles[divisionType]
  const PlaceholderIcon = placeholder.Icon

  if (imageUrl) {
    return (
      <CmsImage
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    )
  }

  return (
    <div className={`flex h-full w-full items-center justify-center ${placeholder.bg}`}>
      <PlaceholderIcon className={`h-20 w-20 ${placeholder.icon}`} aria-hidden />
    </div>
  )
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const locale = await getLocale()
  const m = getMessages(locale)
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const divisionType = normalizeDivisionType(project.division?.type)
  const imageUrl = getImageUrl(project.thumbnail)
  const tags = Array.isArray(project.tags) ? project.tags : []
  const descriptionBlocks =
    locale === 'ar' && project.fullDescriptionAr?.length
      ? project.fullDescriptionAr
      : project.fullDescription

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <ProjectHeroImage title={project.title} imageUrl={imageUrl} divisionType={divisionType} />

        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/60 to-primary-900/20" />

        <div className="site-container relative z-10 flex h-full items-end pb-12">
          <div>
            {project.division?.name ? (
              <span
                className={`mb-4 inline-block rounded-tag px-3 py-1 text-xs font-medium ${divisionBadgeStyles[divisionType]}`}
              >
                {project.division.name}
              </span>
            ) : null}
            <h1 className="text-3xl font-medium text-white md:text-5xl">{project.title}</h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {descriptionBlocks && descriptionBlocks.length > 0 ? (
                <PortableTextContent value={descriptionBlocks} />
              ) : (
                <p className="text-gray-500">
                  {project.shortDescription ?? m.common.comingSoon}
                </p>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-card border border-gray-100 bg-gray-50 p-6 shadow-card">
                <h2 className="mb-6 text-lg font-medium text-gray-900">
                  {m.projectDetail.details}
                </h2>
                <dl className="space-y-5">
                  {project.completedYear ? (
                    <div>
                      <dt className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                        <Calendar className="h-3.5 w-3.5" aria-hidden />
                        {m.projectDetail.completed}
                      </dt>
                      <dd className="text-sm text-gray-900">{project.completedYear}</dd>
                    </div>
                  ) : null}
                  {project.division?.name ? (
                    <div>
                      <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                        {m.projectDetail.division}
                      </dt>
                      <dd>
                        <span
                          className={`inline-block rounded-tag px-3 py-1 text-xs font-medium ${divisionBadgeStyles[divisionType]}`}
                        >
                          {project.division.name}
                        </span>
                      </dd>
                    </div>
                  ) : null}
                  {tags.length > 0 ? (
                    <div>
                      <dt className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                        <Tag className="h-3.5 w-3.5" aria-hidden />
                        {m.projectDetail.tags}
                      </dt>
                      <dd className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-tag border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABannerSection />
    </>
  )
}
