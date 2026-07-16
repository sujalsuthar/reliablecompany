'use client'

import { Loader2, Save } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'
import ImageUploadField from '@/components/admin/ImageUploadField'
import StorageStatusBanner from '@/components/admin/StorageStatusBanner'
import {
  DEFAULT_PAGE_HERO_IMAGES,
  PAGE_HERO_LABELS,
  type PageHeroImages,
  type PageHeroKey,
} from '@/lib/page-heroes'

interface SiteImagesData {
  pageHeroImages: PageHeroImages
  logoUrl: string
  megaMenuImageUrl: string
  certificationImageUrl: string
}

export default function SiteImagesForm() {
  const [values, setValues] = useState<SiteImagesData>({
    pageHeroImages: { ...DEFAULT_PAGE_HERO_IMAGES },
    logoUrl: '',
    megaMenuImageUrl: '',
    certificationImageUrl: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/cms/singleton/siteImages', { credentials: 'include' })
      .then((res) => res.json())
      .then((json) => {
        const data = json.data as SiteImagesData
        setValues({
          pageHeroImages: {
            ...DEFAULT_PAGE_HERO_IMAGES,
            ...data.pageHeroImages,
          },
          logoUrl: data.logoUrl ?? '',
          megaMenuImageUrl: data.megaMenuImageUrl ?? '',
          certificationImageUrl: data.certificationImageUrl ?? '',
        })
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    setError('')

    const res = await fetch('/api/cms/singleton/siteImages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      credentials: 'include',
    })

    setIsSaving(false)

    if (res.ok) {
      setMessage('Site images saved successfully.')
    } else {
      const data = (await res.json()) as { error?: string }
      setError(data.error ?? 'Failed to save.')
    }
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>

  return (
    <div>
      <AdminHeader
        title="Page & Site Images"
        description="Upload images from your computer or paste a URL. Changes apply across the live site after you save."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <StorageStatusBanner />

        <ImageUploadField
          label="Site Logo"
          value={values.logoUrl}
          onChange={(url) => setValues((v) => ({ ...v, logoUrl: url }))}
          maxWidth={800}
          previewFit="contain"
          previewClassName="h-16 w-48"
          helpText="Shown in the header and footer. PNG with transparent background works best."
          onError={setError}
        />

        <div className="border-t border-gray-100 pt-6">
          <p className="mb-4 text-sm font-medium text-gray-900">Page Hero Images</p>
          <p className="mb-4 text-xs text-gray-500">
            Top banner on listing pages (Services, Projects, About, etc.). Individual service pages
            use their own hero image in Services CMS.
          </p>
          <div className="space-y-6">
            {(Object.keys(PAGE_HERO_LABELS) as PageHeroKey[]).map((key) => (
              <ImageUploadField
                key={key}
                label={PAGE_HERO_LABELS[key]}
                value={values.pageHeroImages[key] ?? ''}
                onChange={(url) =>
                  setValues((v) => ({
                    ...v,
                    pageHeroImages: { ...v.pageHeroImages, [key]: url },
                  }))
                }
                maxWidth={1920}
                onError={setError}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <ImageUploadField
            label="Services Mega Menu Image"
            value={values.megaMenuImageUrl}
            onChange={(url) => setValues((v) => ({ ...v, megaMenuImageUrl: url }))}
            maxWidth={1200}
            helpText="Large image shown in the Services dropdown menu on desktop."
            onError={setError}
          />
        </div>

        <ImageUploadField
          label="Footer Certification Logos"
          value={values.certificationImageUrl}
          onChange={(url) => setValues((v) => ({ ...v, certificationImageUrl: url }))}
          maxWidth={1200}
          previewFit="contain"
          previewClassName="h-20 w-full max-w-md"
          helpText="Single wide image with all certification badges for the footer."
          onError={setError}
        />

        {message && <p className="text-sm text-emerald-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={isSaving} className="btn-primary inline-flex gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Site Images
        </button>
      </form>
    </div>
  )
}
