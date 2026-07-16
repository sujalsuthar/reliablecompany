'use client'

/**
 * Global content fields — updates propagate across the entire site.
 * @module components/editor/GlobalContentManager
 */

import { Globe, Loader2, Save } from 'lucide-react'
import { useState } from 'react'

import BilingualField from '@/components/admin/BilingualField'
import ImageUploadField from '@/components/admin/ImageUploadField'
import { useEditor } from '@/components/editor/EditorProvider'
import {
  DEFAULT_PAGE_HERO_IMAGES,
  PAGE_HERO_LABELS,
  type PageHeroKey,
} from '@/lib/page-heroes'

const FIELDS = [
  { key: 'siteName', label: 'Company Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address', multiline: true },
  { key: 'linkedIn', label: 'LinkedIn URL' },
  { key: 'twitter', label: 'Twitter URL' },
  { key: 'facebook', label: 'Facebook URL' },
  { key: 'copyrightText', label: 'Copyright Text' },
] as const

export default function GlobalContentManager() {
  const { store, updateField, isSaving } = useEditor()
  const [draft, setDraft] = useState(store.globalContent)
  const [footerDraft, setFooterDraft] = useState(store.footer)
  const [heroImagesDraft, setHeroImagesDraft] = useState(
    store.pageHeroImages ?? DEFAULT_PAGE_HERO_IMAGES,
  )
  const [megaMenuImage, setMegaMenuImage] = useState(
    store.navbar?.megaMenuImageUrl ?? '',
  )
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const saveAll = async () => {
    setError('')
    for (const field of FIELDS) {
      await updateField(`globalContent.${field.key}`, draft[field.key])
    }
    await updateField('globalContent.logoUrl', draft.logoUrl)
    await updateField('footer.divisionTagline', footerDraft.divisionTagline ?? '')
    await updateField('footer.divisionTaglineAr', footerDraft.divisionTaglineAr ?? '')
    await updateField('footer.certificationImageUrl', footerDraft.certificationImageUrl ?? '')
    for (const key of Object.keys(PAGE_HERO_LABELS) as PageHeroKey[]) {
      await updateField(`pageHeroImages.${key}`, heroImagesDraft[key])
    }
    await updateField('navbar.megaMenuImageUrl', megaMenuImage)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-[#2563eb]" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Global Content
        </h3>
      </div>
      <p className="text-xs text-gray-500">
        Logo, contact info, footer branding, and certification image — updates site-wide.
      </p>

      <div className="space-y-3">
        <ImageUploadField
          compact
          label="Site Logo"
          value={draft.logoUrl}
          onChange={(url) => setDraft((d) => ({ ...d, logoUrl: url }))}
          maxWidth={800}
          previewFit="contain"
          previewClassName="h-12 w-32"
          onError={setError}
        />

        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              {field.label}
            </label>
            {'multiline' in field && field.multiline ? (
              <textarea
                rows={3}
                value={draft[field.key]}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs"
              />
            ) : (
              <input
                type="text"
                value={draft[field.key]}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs"
              />
            )}
          </div>
        ))}

        <BilingualField
          label="Division Tagline (under logo)"
          enValue={footerDraft.divisionTagline ?? ''}
          arValue={footerDraft.divisionTaglineAr ?? ''}
          onEnChange={(v) => setFooterDraft((f) => ({ ...f, divisionTagline: v }))}
          onArChange={(v) => setFooterDraft((f) => ({ ...f, divisionTaglineAr: v }))}
        />

        <div className="border-t border-gray-100 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Page Hero Images
          </p>
          <div className="space-y-3">
            {(Object.keys(PAGE_HERO_LABELS) as PageHeroKey[]).map((key) => (
              <ImageUploadField
                key={key}
                compact
                label={PAGE_HERO_LABELS[key]}
                value={heroImagesDraft[key] ?? ''}
                onChange={(url) => setHeroImagesDraft((h) => ({ ...h, [key]: url }))}
                maxWidth={1920}
                onError={setError}
              />
            ))}
          </div>
        </div>

        <ImageUploadField
          compact
          label="Services Mega Menu Image"
          value={megaMenuImage}
          onChange={setMegaMenuImage}
          maxWidth={1200}
          onError={setError}
        />

        <ImageUploadField
          compact
          label="Footer Certification Logos"
          value={footerDraft.certificationImageUrl ?? ''}
          onChange={(url) =>
            setFooterDraft((fd) => ({ ...fd, certificationImageUrl: url }))
          }
          maxWidth={1200}
          previewFit="contain"
          previewClassName="h-16 w-full"
          onError={setError}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="button"
        onClick={saveAll}
        disabled={isSaving}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-3 py-2 text-xs font-medium text-white"
      >
        {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
        {saved ? 'Saved!' : 'Save Global Content'}
      </button>
    </div>
  )
}
