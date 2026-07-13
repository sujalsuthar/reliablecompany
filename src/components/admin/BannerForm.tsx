'use client'

import { Loader2, Save } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'
import { compressImage } from '@/lib/cms/editor/image-utils'
import { getImageUrl } from '@/lib/images'

export default function BannerForm() {
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    fetch('/api/cms/singleton/hero')
      .then((res) => res.json())
      .then((json) => setValues(json.data as Record<string, unknown>))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    const res = await fetch('/api/cms/singleton/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    setIsSaving(false)
    setMessage(res.ok ? 'Banner saved successfully.' : 'Failed to save.')
  }

  const uploadHeroImage = async (file: File) => {
    setUploadError('')
    try {
      const compressed = await compressImage(file, 1920)
      const formData = new FormData()
      formData.append('file', compressed)
      const res = await fetch('/api/cms/upload', { method: 'POST', body: formData })
      const data = (await res.json()) as { url?: string; error?: string }

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Image upload failed')
      }

      setValues((v) => ({
        ...v,
        backgroundImage: {
          src: data.url,
          alt: 'Homepage hero background',
        },
      }))
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Image upload failed')
    }
  }

  const backgroundImageUrl = getImageUrl(
    values.backgroundImage as { src?: string } | undefined,
  )

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>

  return (
    <div>
      <AdminHeader
        title="Banner Management"
        description="Edit the homepage hero banner content."
      />
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {(
          [
            ['eyebrow', 'Eyebrow Text', false],
            ['headline', 'Headline', false],
            ['highlightedWord', 'Highlighted Word', false],
            ['subheadline', 'Subheadline', true],
            ['primaryButtonText', 'Primary Button Text', false],
            ['primaryButtonLink', 'Primary Button Link', false],
            ['secondaryButtonText', 'Secondary Button Text', false],
            ['secondaryButtonLink', 'Secondary Button Link', false],
          ] as const
        ).map(([key, label, multiline]) => (
          <div key={key}>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
            {multiline ? (
              <textarea
                rows={4}
                value={String(values[key] ?? '')}
                onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
              />
            ) : (
              <input
                type="text"
                value={String(values[key] ?? '')}
                onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
              />
            )}
          </div>
        ))}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Hero Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void uploadHeroImage(f)
            }}
            className="text-sm"
          />
          {backgroundImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={backgroundImageUrl}
              alt="Hero background preview"
              className="mt-3 h-32 w-full rounded-lg object-cover"
            />
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Hero Stats</p>
          {((values.stats as { number?: string; label?: string }[]) ?? []).map((stat, index) => (
            <div key={index} className="mb-3 grid grid-cols-2 gap-3">
              <input
                placeholder="Number"
                value={stat.number ?? ''}
                onChange={(e) => {
                  const stats = [...((values.stats as object[]) ?? [])]
                  stats[index] = { ...stat, number: e.target.value }
                  setValues((v) => ({ ...v, stats }))
                }}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
              />
              <input
                placeholder="Label"
                value={stat.label ?? ''}
                onChange={(e) => {
                  const stats = [...((values.stats as object[]) ?? [])]
                  stats[index] = { ...stat, label: e.target.value }
                  setValues((v) => ({ ...v, stats }))
                }}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
              />
            </div>
          ))}
        </div>

        {message && <p className="text-sm text-emerald-600">{message}</p>}
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}

        <button type="submit" disabled={isSaving} className="btn-primary inline-flex gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Banner
        </button>
      </form>
    </div>
  )
}
