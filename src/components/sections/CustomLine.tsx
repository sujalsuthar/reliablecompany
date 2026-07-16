import { getSectionContent } from '@/lib/content'

interface CustomLineProps {
  sectionKey: string
}

export default async function CustomLine({ sectionKey }: CustomLineProps) {
  const content = await getSectionContent(sectionKey)

  if (!content?.title && !content?.description) return null

  return (
    <section className="border-y border-primary-100 bg-primary-50/40 py-6">
      <div className="site-container">
        {content.label ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">
            {content.label}
          </p>
        ) : null}
        {content.title ? (
          <p className="mt-1 text-lg font-semibold text-primary-900">{content.title}</p>
        ) : null}
        {content.description ? (
          <p className="mt-1 text-sm text-primary-800/80">{content.description}</p>
        ) : null}
      </div>
    </section>
  )
}
