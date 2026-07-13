import { ChevronRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'

import CmsImage from '@/components/ui/CmsImage'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  description?: ReactNode
  breadcrumbs: BreadcrumbItem[]
  imageUrl?: string | null
  eyebrow?: string
  className?: string
}

export default function PageHero({
  title,
  description,
  breadcrumbs,
  imageUrl,
  eyebrow = 'Reliable Company',
  className,
}: PageHeroProps) {
  return (
    <section
      className={clsx(
        'relative overflow-hidden bg-primary-900 text-white',
        className,
      )}
    >
      {imageUrl && (
        <CmsImage
          src={imageUrl}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={70}
        />
      )}

      <div className="absolute inset-0 bg-primary-900/75" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 60% at 80% 40%, rgba(77, 163, 255, 0.2) 0%, transparent 60%)
          `,
        }}
        aria-hidden
      />

      <div className="site-container relative py-14 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/60">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1

              return (
                <li key={item.label} className="flex items-center gap-1">
                  {index > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  )}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'text-white/90' : undefined}>
                      {item.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-primary-800/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-accent-400">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          {eyebrow}
        </span>

        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">
          {title}
        </h1>

        {description && (
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-[17px]">
            {description}
          </div>
        )}
      </div>
    </section>
  )
}
