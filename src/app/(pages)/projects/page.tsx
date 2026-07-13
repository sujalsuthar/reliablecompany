import type { Metadata } from 'next'

import CmsPageHero from '@/components/ui/CmsPageHero'
import ProjectGrid from '@/components/ui/ProjectGrid'
import { getAllProjects } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { generateCmsPageMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('projects')
}

export default async function ProjectsPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const projects = await getAllProjects()

  return (
    <>
      <CmsPageHero
        pageKey="projects"
        title={m.projectPage.heroTitle}
        description={m.projectPage.heroDescription}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: m.common.projects },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container">
          {projects.length > 0 ? (
            <ProjectGrid projects={projects} />
          ) : (
            <p className="text-center text-gray-500">{m.projectPage.empty}</p>
          )}
        </div>
      </section>
    </>
  )
}
