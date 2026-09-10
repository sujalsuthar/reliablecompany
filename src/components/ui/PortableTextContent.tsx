import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-justify text-base leading-relaxed text-gray-600">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-2xl font-medium text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-primary-200 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-gray-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary-600 underline hover:text-primary-700"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

interface PortableTextContentProps {
  value: PortableTextBlock[]
}

export default function PortableTextContent({ value }: PortableTextContentProps) {
  const safeValue = value.filter(
    (block) =>
      block?._type === 'block' &&
      Array.isArray(block.children) &&
      block.children.some((child) => 'text' in child && String(child.text ?? '').trim()),
  )

  if (!safeValue.length) return null

  return <PortableText value={safeValue} components={components} />
}
