import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CmsPageHero from '@/components/ui/CmsPageHero'
import PortableTextContent from '@/components/ui/PortableTextContent'
import { getPageBySlug } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { generateCmsPageMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('privacy')
}

export default async function PrivacyPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const page = await getPageBySlug('privacy')

  if (!page) {
    notFound()
  }

  return (
    <>
      <CmsPageHero
        pageKey="privacy"
        title={page.title}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: m.common.privacy },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container max-w-3xl">
          {page.content && page.content.length > 0 ? (
            <PortableTextContent value={page.content} />
          ) : null}
        </div>
      </section>
    </>
  )
}
