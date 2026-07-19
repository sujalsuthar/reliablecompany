import BlogSection from '@/components/sections/BlogSection'
import Campaigns from '@/components/sections/Campaigns'
import Certifications from '@/components/sections/Certifications'
import CTABannerSection from '@/components/sections/CTABannerSection'
import CustomLine from '@/components/sections/CustomLine'
import Divisions from '@/components/sections/Divisions'
import Hero from '@/components/sections/Hero'
import Industries from '@/components/sections/Industries'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import SectionErrorBoundary from '@/components/home/SectionErrorBoundary'
import { getHomepageSections } from '@/lib/content'
import type { ReactNode } from 'react'

function wrap(name: string, node: ReactNode, key: string) {
  return (
    <SectionErrorBoundary key={key} name={name}>
      {node}
    </SectionErrorBoundary>
  )
}

export default async function HomePageRenderer() {
  const sections = await getHomepageSections()

  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return wrap('hero', <Hero />, section.id)
          case 'campaigns':
            return wrap('campaigns', <Campaigns />, section.id)
          case 'customLine':
            return wrap(
              'customLine',
              <CustomLine sectionKey={section.id} />,
              section.id,
            )
          case 'services':
            return wrap('services', <Services />, section.id)
          case 'whyUs':
            return wrap('whyUs', <WhyUs />, section.id)
          case 'industries':
            return wrap('industries', <Industries />, section.id)
          case 'divisions':
            return wrap('divisions', <Divisions />, section.id)
          case 'projects':
            return wrap('projects', <Projects />, section.id)
          case 'cta':
            return wrap(
              'cta',
              <CTABannerSection source="homepage" />,
              section.id,
            )
          case 'blog':
            return wrap('blog', <BlogSection />, section.id)
          case 'certifications':
            return wrap('certifications', <Certifications />, section.id)
          default:
            return null
        }
      })}
    </>
  )
}
