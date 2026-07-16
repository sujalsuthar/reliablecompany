'use client'

/**
 * Live homepage preview canvas for the visual editor.
 * @module components/editor/HomeCanvas
 */

import BlogSectionEdit from '@/components/editor/sections/BlogSectionEdit'
import CtaSectionEdit from '@/components/editor/sections/CtaSectionEdit'
import Editable from '@/components/editor/Editable'
import HeroSectionEdit from '@/components/editor/sections/HeroSectionEdit'
import PlaceholderSectionEdit from '@/components/editor/sections/PlaceholderSectionEdit'
import WhyUsSectionEdit from '@/components/editor/sections/WhyUsSectionEdit'
import SectionHeaderEdit from '@/components/editor/sections/SectionHeaderEdit'
import { useEditor } from '@/components/editor/EditorProvider'
import DivisionsGrid from '@/components/sections/DivisionsGrid'
import FeaturedProjectsGrid from '@/components/sections/FeaturedProjectsGrid'
import ServicesGrid from '@/components/sections/ServicesGrid'
import { getLucideIcon } from '@/lib/icons'
import type { HomepageSection } from '@/lib/cms/editor/types'

function DataSection({
  sectionKey,
  children,
}: {
  sectionKey: string
  children: React.ReactNode
}) {
  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <SectionHeaderEdit sectionKey={sectionKey} />
        {children}
      </div>
    </section>
  )
}

function IndustriesPreview() {
  const { store } = useEditor()
  return (
    <section className="section-pad bg-primary-50">
      <div className="site-container">
        <SectionHeaderEdit sectionKey="industries" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {store.industries
            .filter((i) => i.status !== 'inactive')
            .map((industry) => {
              const Icon = getLucideIcon(industry.icon)
              return (
                <article key={industry._id} className="card-base flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{industry.title}</h3>
                </article>
              )
            })}
        </div>
      </div>
    </section>
  )
}

function SectionBlock({ section }: { section: HomepageSection }) {
  const { store } = useEditor()
  const { type } = section
  const services = store.services.filter((s) => s.status !== 'inactive')
  const projects = store.projects.filter((p) => p.featured && p.status !== 'inactive')

  switch (type) {
    case 'hero':
      return <HeroSectionEdit />
    case 'services':
      return (
        <DataSection sectionKey="services">
          <ServicesGrid services={services} />
        </DataSection>
      )
    case 'whyUs':
      return <WhyUsSectionEdit />
    case 'blog':
      return <BlogSectionEdit />
    case 'industries':
      return <IndustriesPreview />
    case 'divisions':
      return (
        <DataSection sectionKey="divisions">
          <DivisionsGrid divisions={store.divisions} />
        </DataSection>
      )
    case 'projects':
      return (
        <DataSection sectionKey="projects">
          <FeaturedProjectsGrid projects={projects} />
        </DataSection>
      )
    case 'cta':
      return <CtaSectionEdit />
    case 'customLine': {
      const content = store.sectionContent[section.id] ?? {
        label: 'Custom line',
        title: 'Add your one-line announcement here',
        description: '',
      }
      return (
        <section className="border-y border-primary-100 bg-primary-50/40 py-6">
          <div className="site-container">
            <Editable
              path={`sectionContent.${section.id}.label`}
              type="text"
              label="Custom line label"
              as="p"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600"
            >
              {content.label}
            </Editable>
            <Editable
              path={`sectionContent.${section.id}.title`}
              type="text"
              label="Custom line text"
              as="p"
              className="mt-1 text-lg font-semibold text-primary-900"
            >
              {content.title}
            </Editable>
            <Editable
              path={`sectionContent.${section.id}.description`}
              type="richtext"
              label="Custom line description"
              as="p"
              className="mt-1 text-sm text-primary-800/80"
            >
              {content.description}
            </Editable>
          </div>
        </section>
      )
    }
    default:
      return <PlaceholderSectionEdit type={type} />
  }
}

export default function HomeCanvas() {
  const { store } = useEditor()
  const sections = store.homepageSections.filter((s) => s.visible)

  return (
    <div className="min-h-full bg-white">
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-800">
        Visual Editor — click any highlighted element to edit
      </div>
      {sections.map((section) => (
        <div key={section.id} data-section-id={section.id}>
          <SectionBlock section={section} />
        </div>
      ))}
    </div>
  )
}
