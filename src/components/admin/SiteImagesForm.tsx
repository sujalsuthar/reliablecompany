'use client'

import { Loader2, Save } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'
import { compressImage } from '@/lib/cms/editor/image-utils'
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
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/cms/singleton/siteImages')
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

  const uploadImage = async (
    file: File,
    maxWidth: number,
    onUrl: (url: string) => void,
    key: string,
  ) => {
    setUploadingKey(key)
    setError('')

    try {
      const compressed = await compressImage(file, maxWidth)
      const formData = new FormData()
      formData.append('file', compressed)
      const res = await fetch('/api/cms/upload', { method: 'POST', body: formData })
      const data = (await res.json()) as { url?: string; error?: string }

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Image upload failed')
      }

      onUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploadingKey(null)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    setError('')

    const res = await fetch('/api/cms/singleton/siteImages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
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
        description="Hero banners for listing pages, logo, mega menu image, and footer certifications."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Site Logo</label>
          <input
            type="file"
            accept="image/*"
            disabled={uploadingKey === 'logo'}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) {
                void uploadImage(f, 800, (url) => setValues((v) => ({ ...v, logoUrl: url })), 'logo')
              }
              e.target.value = ''
            }}
            className="text-sm"
          />
          {values.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={values.logoUrl} alt="Logo preview" className="mt-3 h-12 object-contain" />
          )}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="mb-4 text-sm font-medium text-gray-900">Page Hero Images</p>
          <p className="mb-4 text-xs text-gray-500">
            Top banner on listing pages (Services, Projects, About, etc.). Individual service pages
            use their own hero image in Services CMS.
          </p>
          <div className="space-y-5">
            {(Object.keys(PAGE_HERO_LABELS) as PageHeroKey[]).map((key) => (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  {PAGE_HERO_LABELS[key]}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingKey === `hero-${key}`}
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) {
                      void uploadImage(
                        f,
                        1920,
                        (url) =>
                          setValues((v) => ({
                            ...v,
                            pageHeroImages: { ...v.pageHeroImages, [key]: url },
                          })),
                        `hero-${key}`,
                      )
                    }
                    e.target.value = ''
                  }}
                  className="text-sm"
                />
                {uploadingKey === `hero-${key}` && (
                  <p className="mt-1 text-xs text-gray-500">Uploading…</p>
                )}
                {values.pageHeroImages[key] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={values.pageHeroImages[key]}
                    alt={`${PAGE_HERO_LABELS[key]} preview`}
                    className="mt-3 h-28 w-full rounded-lg object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Services Mega Menu Image
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={uploadingKey === 'mega-menu'}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) {
                void uploadImage(
                  f,
                  1200,
                  (url) => setValues((v) => ({ ...v, megaMenuImageUrl: url })),
                  'mega-menu',
                )
              }
              e.target.value = ''
            }}
            className="text-sm"
          />
          {values.megaMenuImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={values.megaMenuImageUrl}
              alt="Mega menu preview"
              className="mt-3 h-28 w-full rounded-lg object-cover"
            />
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Footer Certification Logos
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={uploadingKey === 'certifications'}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) {
                void uploadImage(
                  f,
                  1200,
                  (url) => setValues((v) => ({ ...v, certificationImageUrl: url })),
                  'certifications',
                )
              }
              e.target.value = ''
            }}
            className="text-sm"
          />
          {values.certificationImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={values.certificationImageUrl}
              alt="Certifications preview"
              className="mt-3 max-h-20 w-full object-contain"
            />
          )}
        </div>

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
