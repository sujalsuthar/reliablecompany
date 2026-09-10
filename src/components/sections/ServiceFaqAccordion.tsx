'use client'

import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface ServiceFaqAccordionProps {
  items: FaqItem[]
  className?: string
}

export default function ServiceFaqAccordion({ items, className }: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items.length) return null

  return (
    <div className={clsx('divide-y divide-gray-200 rounded-card border border-gray-200 bg-white', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-gray-900">{item.question}</span>
              <ChevronDown
                className={clsx(
                  'h-5 w-5 shrink-0 text-primary-600 transition-transform',
                  isOpen && 'rotate-180',
                )}
                aria-hidden
              />
            </button>
            {/* Always render answers in HTML for crawlers; hide collapsed with CSS */}
            <div
              className={clsx(
                'px-5 pb-4 text-sm leading-relaxed text-gray-600',
                !isOpen && 'hidden',
              )}
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
