import BlogSection from '@/components/sections/BlogSection'
import Campaigns from '@/components/sections/Campaigns'
import Certifications from '@/components/sections/Certifications'
import CTABannerSection from '@/components/sections/CTABannerSection'
import Divisions from '@/components/sections/Divisions'
import Hero from '@/components/sections/Hero'
import Industries from '@/components/sections/Industries'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import { getHomepageSections } from '@/lib/content'
import type { ComponentType } from 'react'

import type { SectionType } from '@/lib/cms/editor/types'

const SECTION_COMPONENTS: Record<SectionType, ComponentType | null> = {
  hero: Hero,
  campaigns: Campaigns,
  services: Services,
  whyUs: WhyUs,
  industries: Industries,
  divisions: Divisions,
  projects: Projects,
  cta: CTABannerSection,
  blog: BlogSection,
  certifications: Certifications,
  about: null,
  features: null,
  testimonials: null,
  faqs: null,
  contact: null,
  gallery: null,
  team: null,
  pricing: null,
}

export default async function HomePageRenderer() {
  const sections = await getHomepageSections()

  return (
    <>
      {sections.map((section) => {
        const Component = SECTION_COMPONENTS[section.type]
        if (!Component) return null
        return <Component key={section.id} />
      })}
    </>
  )
}
