'use client'

import { clsx } from 'clsx'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Logo from '@/components/layout/Logo'
import NavDropdown from '@/components/layout/NavDropdown'
import ServicesMegaMenu, {
  ServicesMobileLinks,
} from '@/components/layout/ServicesMegaMenu'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useNavOverlay } from '@/components/providers/NavOverlayProvider'
import Button from '@/components/ui/Button'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { ENGINEERING_SITE_URL, NCA_BADGE_PATH } from '@/lib/brand'
import type { NavbarContent } from '@/lib/cms/editor/types'
import { DEFAULT_MEGA_MENU_IMAGE } from '@/lib/page-heroes'

const defaultResources = [
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/projects' },
]

interface NavbarClientProps {
  navbar?: NavbarContent
  logoUrl?: string
  megaMenuImageUrl?: string
}

export default function NavbarClient({
  navbar,
  logoUrl,
  megaMenuImageUrl = DEFAULT_MEGA_MENU_IMAGE,
}: NavbarClientProps) {
  const nav = navbar ?? {
    consultationText: 'Get Consultation',
    consultationLink: '/contact',
    arabicLabel: 'عربي',
    mainLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Career', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    resourcesLinks: defaultResources,
  }
  const resourcesItems = nav.resourcesLinks?.length
    ? nav.resourcesLinks
    : defaultResources
  const mainLinks = nav.mainLinks ?? []
  const quoteHref = nav.consultationLink || '/contact'
  const { messages } = useLocale()
  const { setServicesMenuOpen, setMobileNavOpen } = useNavOverlay()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollReady, setScrollReady] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    setScrollReady(true)
  }, [])

  useMotionValueEvent(scrollY, 'change', (value) => {
    if (!scrollReady) return
    setScrolled(value > 20)
  })

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    setServicesMenuOpen(servicesOpen)
  }, [servicesOpen, setServicesMenuOpen])

  useEffect(() => {
    setMobileNavOpen(isOpen)
  }, [isOpen, setMobileNavOpen])

  useEffect(() => {
    setServicesOpen(false)
    setResourcesOpen(false)
    setIsOpen(false)
  }, [pathname])

  // Desktop: close Services mega menu on Escape / outside click (prevents stuck overlay blocking UI)
  useEffect(() => {
    if (!servicesOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServicesOpen(false)
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('[data-services-menu]') || target.closest('[data-services-trigger]')) {
        return
      }
      setServicesOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [servicesOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const linkClasses = (href: string) =>
    clsx(
      'interactive whitespace-nowrap text-[15px] transition-colors hover:text-[#2563eb]',
      isActive(href) ? 'font-medium text-[#2563eb]' : 'font-normal text-gray-800',
    )

  const closeMobile = () => {
    setIsOpen(false)
    setMobileServicesOpen(false)
    setMobileResourcesOpen(false)
  }

  const servicesActive =
    pathname.startsWith('/services') || pathname.startsWith('/divisions')

  const resourcesActive =
    pathname.startsWith('/blog') || pathname.startsWith('/projects')

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-50 bg-white transition-shadow duration-300',
          scrolled
            ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
            : 'shadow-[0_1px_0_rgba(0,0,0,0.06)]',
        )}
      >
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          {/* Desktop */}
          <div className="relative hidden h-[88px] items-center justify-between gap-6 lg:flex xl:gap-8">
            <Logo onClick={closeMobile} height={52} logoUrl={logoUrl} />

            <nav
              className="flex flex-1 items-center justify-center gap-5 xl:gap-8"
              aria-label="Main navigation"
            >
              {mainLinks.slice(0, 2).map((link) => (
                <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
                  {link.label}
                </Link>
              ))}

              <div
                data-services-trigger
                onMouseEnter={() => {
                  setResourcesOpen(false)
                  setServicesOpen(true)
                }}
              >
                <button
                  type="button"
                  className={clsx(
                    'nav-link inline-flex items-center gap-1',
                    servicesActive || servicesOpen
                      ? 'nav-link-active font-medium text-[#2563eb]'
                      : 'font-normal text-gray-800',
                  )}
                  aria-expanded={servicesOpen}
                  onClick={() => {
                    setResourcesOpen(false)
                    setServicesOpen((open) => !open)
                  }}
                >
                  {messages.nav.services}
                  <ChevronDown
                    className={clsx(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      servicesOpen && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>
              </div>

              <a
                href={ENGINEERING_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive whitespace-nowrap text-[15px] font-normal text-gray-800 transition-colors hover:text-[#2563eb]"
              >
                {messages.nav.engineering}
              </a>

              <NavDropdown
                label={messages.nav.resources}
                items={[...resourcesItems]}
                isOpen={resourcesOpen}
                isActive={resourcesActive}
                onOpen={() => {
                  setServicesOpen(false)
                  setResourcesOpen(true)
                }}
                onClose={() => setResourcesOpen(false)}
                onToggle={() => {
                  setServicesOpen(false)
                  setResourcesOpen((open) => !open)
                }}
              />

              {mainLinks.slice(2).map((link) => (
                <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2.5 xl:gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={NCA_BADGE_PATH}
                alt="NCA Registered — مسجل لدى الهيئة الوطنية للأمن السيبراني"
                width={180}
                height={48}
                className="hidden h-[44px] w-auto object-contain lg:block xl:h-[48px] 2xl:h-[52px]"
              />

              <LanguageSwitcher size="xs" />

              <Link
                href={quoteHref}
                className="interactive inline-flex h-10 items-center justify-center rounded-full bg-[#2563eb] px-5 text-sm font-medium text-white hover:bg-[#1d4ed8] hover:shadow-md"
              >
                {nav.consultationText}
              </Link>
            </div>
          </div>

          {servicesOpen ? (
            <button
              type="button"
              aria-label="Close services menu"
              className="fixed inset-0 z-40 hidden bg-black/20 lg:block"
              onClick={() => setServicesOpen(false)}
            />
          ) : null}

          <div
            data-services-menu
            className={clsx(
              'absolute left-0 right-0 top-full z-50 hidden px-5 pt-3 sm:px-8 lg:px-10',
              servicesOpen ? 'lg:block' : 'lg:hidden',
            )}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <ServicesMegaMenu
              open={servicesOpen}
              onClose={() => setServicesOpen(false)}
              imageUrl={megaMenuImageUrl}
            />
          </div>

          {/* Mobile */}
          <div className="flex h-[72px] items-center justify-between gap-3 lg:hidden">
            <Logo onClick={closeMobile} height={44} logoUrl={logoUrl} />

            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={NCA_BADGE_PATH}
                alt="NCA Registered — مسجل لدى الهيئة الوطنية للأمن السيبراني"
                width={120}
                height={36}
                className="h-8 w-auto max-w-[120px] object-contain sm:h-9 sm:max-w-[140px]"
              />
              <button
                type="button"
                className="interactive inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                aria-label={messages.nav.openMenu}
              >
                <Menu className="h-6 w-6" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
              <Logo onClick={closeMobile} height={40} logoUrl={logoUrl} />
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={NCA_BADGE_PATH}
                  alt="NCA Registered — مسجل لدى الهيئة الوطنية للأمن السيبراني"
                  width={130}
                  height={40}
                  className="h-9 w-auto max-w-[130px] object-contain"
                />
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={closeMobile}
                  aria-label={messages.nav.closeMenu}
                >
                  <X className="h-6 w-6" aria-hidden />
                </button>
              </div>
            </div>

            <nav
              className="flex flex-1 flex-col overflow-y-auto px-6 py-6"
              aria-label="Mobile navigation"
            >
              {mainLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'flex min-h-[44px] items-center border-b border-gray-100 py-4 text-xl',
                    isActive(link.href)
                      ? 'font-medium text-[#2563eb]'
                      : 'text-gray-900',
                  )}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                className="flex min-h-[44px] w-full items-center justify-between border-b border-gray-100 py-4 text-left text-xl text-gray-900"
                onClick={() => setMobileServicesOpen((open) => !open)}
                aria-expanded={mobileServicesOpen}
              >
                {messages.nav.services}
                <ChevronDown
                  className={clsx(
                    'h-5 w-5 transition-transform',
                    mobileServicesOpen && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>

              {mobileServicesOpen && (
                <div className="border-b border-gray-100 py-4 ps-2">
                  <ServicesMobileLinks onNavigate={closeMobile} />
                </div>
              )}

              <a
                href={ENGINEERING_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center border-b border-gray-100 py-4 text-xl text-gray-900 hover:text-[#2563eb]"
                onClick={closeMobile}
              >
                {messages.nav.engineering}
              </a>

              <button
                type="button"
                className="flex min-h-[44px] w-full items-center justify-between border-b border-gray-100 py-4 text-start text-xl text-gray-900"
                onClick={() => setMobileResourcesOpen((open) => !open)}
                aria-expanded={mobileResourcesOpen}
              >
                {messages.nav.resources}
                <ChevronDown
                  className={clsx(
                    'h-5 w-5 transition-transform',
                    mobileResourcesOpen && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>

              {mobileResourcesOpen && (
                <div className="space-y-1 border-b border-gray-100 py-3 ps-4">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-[44px] items-center gap-2 text-lg text-[#2563eb]"
                      onClick={closeMobile}
                    >
                      <ChevronRight className="icon-rtl-flip h-4 w-4" aria-hidden />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {mainLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'flex min-h-[44px] items-center border-b border-gray-100 py-4 text-xl',
                    isActive(link.href)
                      ? 'font-medium text-[#2563eb]'
                      : 'text-gray-900',
                  )}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-8 space-y-3">
                <LanguageSwitcher className="w-full justify-center" size="sm" />
                <Button
                  href={quoteHref}
                  variant="primary"
                  size="md"
                  className="w-full rounded-full bg-[#2563eb] hover:bg-[#1d4ed8]"
                  onClick={closeMobile}
                >
                  {nav.consultationText}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
