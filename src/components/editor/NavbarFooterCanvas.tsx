'use client'

/**
 * Visual editor for navbar and footer regions.
 */

import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import Editable from '@/components/editor/Editable'
import { useEditor } from '@/components/editor/EditorProvider'

export default function NavbarFooterCanvas() {
  const { store } = useEditor()
  const { navbar, footer, globalContent } = store

  return (
    <div className="min-h-full bg-white">
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-800">
        Click navbar or footer elements to edit — changes apply site-wide
      </div>

      {/* Navbar preview */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-6 px-8">
          <Editable path="globalContent.logoUrl" type="image" label="Logo" as="span">
            <Image
              src={globalContent.logoUrl || '/logo.png'}
              alt={globalContent.siteName}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </Editable>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {navbar.mainLinks.map((link, i) => (
              <Editable
                key={link.href}
                path={`navbar.mainLinks.${i}.label`}
                type="text"
                label={`Nav link: ${link.label}`}
                as="span"
                className="text-[15px] text-gray-800"
              >
                {link.label}
              </Editable>
            ))}
            <span className="text-[15px] text-gray-800">Services ▾</span>
            <span className="text-[15px] text-gray-800">Engineering</span>
            <span className="text-[15px] font-medium text-[#2563eb]">Resources ▾</span>
            {navbar.resourcesLinks.map((link, i) => (
              <Editable
                key={link.href}
                path={`navbar.resourcesLinks.${i}.label`}
                type="text"
                label={`Resources: ${link.label}`}
                as="span"
                className="sr-only"
              >
                {link.label}
              </Editable>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Editable path="navbar.arabicLabel" type="text" label="Arabic button" as="span" className="rounded-full border border-gray-200 px-4 py-2 text-sm">
              {navbar.arabicLabel}
            </Editable>
            <Editable path="navbar.consultationText" type="text" label="Consultation button" as="span" className="rounded-full bg-[#2563eb] px-4 py-2 text-sm text-white">
              {navbar.consultationText}
            </Editable>
            <span className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700">
              {globalContent.phone}
            </span>
          </div>
        </div>
      </header>

      <div className="bg-primary-900 py-20 text-center text-white/50">
        Page content appears here on the live site
      </div>

      {/* Footer preview */}
      <footer className="bg-primary-900 text-white">
        <div className="site-container py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Image
                src={globalContent.logoUrl || '/logo.png'}
                alt={globalContent.siteName}
                width={160}
                height={48}
                className="mb-4 h-10 w-auto brightness-0 invert"
              />
              <Editable path="footer.description" type="richtext" label="Footer description" as="p" className="max-w-md text-sm text-gray-300">
                {footer.description}
              </Editable>
              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <Editable path="globalContent.phone" type="text" label="Phone" as="p" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {globalContent.phone}
                </Editable>
                <Editable path="globalContent.email" type="text" label="Email" as="p" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {globalContent.email}
                </Editable>
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide">Services</p>
              <ul className="space-y-2">
                {footer.serviceLinks.map((link, i) => (
                  <li key={link.href}>
                    <Editable path={`footer.serviceLinks.${i}.label`} type="text" label="Service link" as="span" className="text-sm text-gray-300">
                      {link.label}
                    </Editable>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide">Offices</p>
              {footer.officeCities.map((city, i) => (
                <Editable key={city} path={`footer.officeCities.${i}`} type="text" label="Office city" as="p" className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4" />
                  {city}
                </Editable>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-800 pt-8 sm:flex-row">
            <Editable path="globalContent.copyrightText" type="text" label="Copyright" as="p" className="text-sm text-gray-400">
              {globalContent.copyrightText}
            </Editable>
            <div className="flex gap-6">
              <Editable path="footer.privacyLabel" type="text" label="Privacy label" as="span" className="text-sm text-gray-300">
                {footer.privacyLabel}
              </Editable>
              <Editable path="footer.termsLabel" type="text" label="Terms label" as="span" className="text-sm text-gray-300">
                {footer.termsLabel}
              </Editable>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
