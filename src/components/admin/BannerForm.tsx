'use client'

import { Loader2, Save } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'
import ImageUploadField from '@/components/admin/ImageUploadField'
import StorageStatusBanner from '@/components/admin/StorageStatusBanner'
import { getImageUrl } from '@/lib/images'

export default function BannerForm() {
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/cms/singleton/hero', { credentials: 'include' })
      .then((res) => res.json())
      .then((json) => setValues(json.data as Record<string, unknown>))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    setError('')

    const res = await fetch('/api/cms/singleton/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      credentials: 'include',
    })

    setIsSaving(false)

    if (res.ok) {
      setMessage('Banner saved successfully.')
    } else {
      const data = (await res.json()) as { error?: string }
      setError(data.error ?? 'Failed to save.')
    }
  }

  const backgroundImage = values.backgroundImage as { src?: string; alt?: string } | undefined
  const backgroundImageUrl = getImageUrl(backgroundImage)

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>

  return (
    <div>
      <AdminHeader
        title="Banner Management"
        description="Edit the homepage hero banner content and background image."
      />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <StorageStatusBanner />

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

        <ImageUploadField
          label="Hero Background Image"
          value={backgroundImageUrl ?? ''}
          onChange={(url) =>
            setValues((v) => ({
              ...v,
              backgroundImage: {
                ...(typeof v.backgroundImage === 'object' && v.backgroundImage
                  ? (v.backgroundImage as object)
                  : {}),
                src: url,
                alt: backgroundImage?.alt || 'Homepage hero background',
              },
            }))
          }
          maxWidth={1920}
          helpText="Full-width background behind the homepage hero text."
          onError={setError}
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Image Alt Text</label>
          <input
            type="text"
            value={backgroundImage?.alt ?? ''}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                backgroundImage: {
                  ...(typeof v.backgroundImage === 'object' && v.backgroundImage
                    ? (v.backgroundImage as object)
                    : {}),
                  src: backgroundImage?.src ?? backgroundImageUrl ?? '',
                  alt: e.target.value,
                },
              }))
            }
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
            placeholder="Describe the hero image for accessibility"
          />
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
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={isSaving} className="btn-primary inline-flex gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Banner
        </button>
      </form>
    </div>
  )
}
