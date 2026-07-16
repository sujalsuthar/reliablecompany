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
import { getHomepageSections } from '@/lib/content'

export default async function HomePageRenderer() {
  const sections = await getHomepageSections()

  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <Hero key={section.id} />
          case 'campaigns':
            return <Campaigns key={section.id} />
          case 'customLine':
            return <CustomLine key={section.id} sectionKey={section.id} />
          case 'services':
            return <Services key={section.id} />
          case 'whyUs':
            return <WhyUs key={section.id} />
          case 'industries':
            return <Industries key={section.id} />
          case 'divisions':
            return <Divisions key={section.id} />
          case 'projects':
            return <Projects key={section.id} />
          case 'cta':
            return <CTABannerSection key={section.id} />
          case 'blog':
            return <BlogSection key={section.id} />
          case 'certifications':
            return <Certifications key={section.id} />
          default:
            return null
        }
      })}
    </>
  )
}
