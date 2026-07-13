import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  ClipboardCheck,
  ShieldAlert,
  ShieldCheck,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import SectionHeader from '@/components/ui/SectionHeader'
import { getSectionContent } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'
import { SERVICE_CATEGORIES } from '@/lib/service-catalog'

const CATEGORY_ICON: Record<string, LucideIcon> = {
  offensive: Target,
  grc: ClipboardCheck,
  incident: ShieldAlert,
  assessments: ShieldCheck,
}

export default async function Services() {
  const locale = await getLocale()
  const ui = getMessages(locale)
  const header = await getSectionContent('services')
  const isAr = locale === 'ar'

  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <SectionHeader
          label={header?.label ?? 'Services'}
          title={header?.title ?? 'Cybersecurity Services'}
          description={
            header?.description ??
            'End-to-end offensive security, compliance, incident response, and security assessment services across Saudi Arabia.'
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICON[category.id] ?? ShieldCheck
            const name = isAr ? category.nameAr : category.name
            const description = isAr ? category.descriptionAr : category.description
            return (
              <Link
                key={category.id}
                href="/services"
                className="card-base group flex flex-col p-6 transition-colors hover:border-primary-200 sm:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{name}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600">
                  {ui.sections.viewAllServices}
                  <ArrowRight className="icon-rtl-flip h-4 w-4" aria-hidden />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="btn-primary inline-flex gap-2 px-6"
          >
            {ui.sections.viewAllServices}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
