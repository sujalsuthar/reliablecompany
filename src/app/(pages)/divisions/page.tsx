import type { Metadata } from 'next'

import DivisionsGrid from '@/components/sections/DivisionsGrid'
import CTABannerSection from '@/components/sections/CTABannerSection'
import CmsPageHero from '@/components/ui/CmsPageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import { getDivisions } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { generateCmsPageMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('divisions')
}

export default async function DivisionsPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const divisions = await getDivisions()

  return (
    <>
      <CmsPageHero
        pageKey="divisions"
        title={m.divisionsPage.heroTitle}
        description={m.divisionsPage.heroDescription}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: m.common.divisions },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container">
          <SectionHeader
            label={m.divisionsPage.expertise}
            title={m.divisionsPage.heroTitle}
            description={m.divisionsPage.expertiseDesc}
            className="mb-14"
          />
          <DivisionsGrid divisions={divisions} />
        </div>
      </section>

      <CTABannerSection />
    </>
  )
}
