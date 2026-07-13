import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

import CmsPageHero from '@/components/ui/CmsPageHero'
import { getActiveCareers } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { generateCmsPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('careers')
}

export default async function CareersPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const careers = await getActiveCareers()

  return (
    <>
      <CmsPageHero
        pageKey="careers"
        title={m.careersPage.heroTitle}
        description={m.careersPage.heroDescription}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: m.common.careers },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container max-w-3xl">
          {careers.length === 0 ? (
            <p className="text-gray-500">{m.careersPage.empty}</p>
          ) : (
            <ul className="space-y-4">
              {careers.map((job) => (
                <li key={job._id} className="card-base p-6">
                  <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                    {job.department && <span>{job.department}</span>}
                    {job.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {job.location}
                      </span>
                    )}
                  </div>
                  {job.description && (
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {job.description}
                    </p>
                  )}
                  <Link
                    href={`/careers/apply/${job._id}`}
                    className="mt-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700"
                  >
                    {m.careersPage.apply} →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
