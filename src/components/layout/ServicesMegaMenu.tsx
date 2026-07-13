'use client'

import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useLocale } from '@/components/providers/LocaleProvider'
import { buildMegaMenuCategories } from '@/lib/service-catalog'

interface ServicesMegaMenuProps {
  open: boolean
  onClose: () => void
  imageUrl?: string
}

export default function ServicesMegaMenu({
  open,
  onClose,
  imageUrl,
}: ServicesMegaMenuProps) {
  const { locale, messages } = useLocale()
  const categories = buildMegaMenuCategories(locale)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="mx-auto max-w-[1320px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-primary-50 shadow-mega">
            <button
              type="button"
              onClick={onClose}
              className="absolute end-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <div className="grid min-h-[340px] grid-cols-12">
              {/* Left banner — cyber security visual */}
              <div className="relative col-span-12 overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 md:col-span-4">
                {imageUrl && (
                  <>
                    <Image
                      src={imageUrl}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-900/85 to-primary-800/70"
                      aria-hidden
                    />
                  </>
                )}

                <div className="relative flex h-full min-h-[200px] flex-col justify-start p-8 md:min-h-0">
                  <h3 className="text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
                    {messages.nav.megaTitle}
                  </h3>
                  <p className="mt-3 max-w-[220px] text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-white/55">
                    {messages.nav.megaTagline}
                  </p>
                </div>
              </div>

              {/* Right — 2×2 service grid */}
              <div className="col-span-12 grid grid-cols-1 gap-0 sm:grid-cols-2 md:col-span-8">
                {categories.map((group, index) => (
                  <div
                    key={group.title}
                    className={clsx(
                      'px-8 py-8 md:px-10 md:py-9',
                      index < 2 && 'border-b border-primary-100/90',
                      index % 2 === 0 && 'sm:border-e sm:border-primary-100/90',
                    )}
                  >
                    <h4 className="text-[15px] font-bold text-primary-800">{group.title}</h4>
                    <ul className="mt-4 space-y-2.5">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="group inline-flex min-h-[32px] items-start gap-1.5 text-[14px] font-medium leading-snug text-primary-600 transition-colors hover:text-primary-700"
                          >
                            <ChevronRight
                              className="icon-rtl-flip mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500"
                              aria-hidden
                            />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ServicesMobileLinks({
  onNavigate,
  className,
}: {
  onNavigate: () => void
  className?: string
}) {
  const { locale, messages } = useLocale()
  const categories = buildMegaMenuCategories(locale)

  return (
    <div className={clsx('space-y-6', className)}>
      {categories.map((group) => (
        <div key={group.title}>
          <p className="text-sm font-bold text-primary-800">{group.title}</p>
          <ul className="mt-2 space-y-1">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="flex min-h-[44px] items-center gap-2 text-base text-primary-600"
                >
                  <ChevronRight className="icon-rtl-flip h-4 w-4 text-primary-500" aria-hidden />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        href="/services"
        onClick={onNavigate}
        className="inline-flex min-h-[44px] items-center gap-1 text-base font-medium text-primary-600"
      >
        {messages.nav.viewAllServices}
        <ChevronRight className="icon-rtl-flip h-4 w-4" aria-hidden />
      </Link>
    </div>
  )
}
