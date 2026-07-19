import { getFieldStyles, getSectionContent } from '@/lib/content'
import { fieldStyleToCss } from '@/lib/cms/editor/field-path'

interface CustomLineProps {
  sectionKey: string
}

export default async function CustomLine({ sectionKey }: CustomLineProps) {
  const [content, fieldStyles] = await Promise.all([
    getSectionContent(sectionKey),
    getFieldStyles(),
  ])

  const label = content?.label?.trim() ?? ''
  const title = content?.title?.trim() ?? ''
  const description = content?.description?.trim() ?? ''

  if (!title && !description && !label) return null

  const titleStyle = fieldStyleToCss(
    fieldStyles[`sectionContent.${sectionKey}.title`] ?? {},
  )
  const labelStyle = fieldStyleToCss(
    fieldStyles[`sectionContent.${sectionKey}.label`] ?? {},
  )
  const descriptionStyle = fieldStyleToCss(
    fieldStyles[`sectionContent.${sectionKey}.description`] ?? {},
  )

  const hasOnlyTitle = Boolean(title) && !label && !description
  const isCentered =
    titleStyle.textAlign === 'center' || (hasOnlyTitle && !titleStyle.textAlign)

  return (
    <section className="border-y border-primary-100 bg-white py-8 sm:py-10">
      <div className="site-container">
        {label ? (
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600"
            style={labelStyle}
          >
            {label}
          </p>
        ) : null}
        {title ? (
          <p
            className={
              isCentered
                ? 'text-center text-xl font-semibold tracking-tight text-primary-900 sm:text-2xl'
                : 'mt-1 text-lg font-semibold text-primary-900'
            }
            style={titleStyle}
          >
            {title}
          </p>
        ) : null}
        {description ? (
          <p
            className="mt-2 text-sm leading-relaxed text-primary-800/80"
            style={descriptionStyle}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
