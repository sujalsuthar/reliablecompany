'use client'

import { ArrowLeft, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'
import BilingualField from '@/components/admin/BilingualField'
import type { CollectionConfig } from '@/lib/cms/collections'
import { compressImage } from '@/lib/cms/editor/image-utils'
import { itemToFormValues } from '@/lib/cms/transform'

interface CollectionFormProps {
  config: CollectionConfig
  pathKey: string
  itemId?: string
}

export default function CollectionForm({ config, pathKey, itemId }: CollectionFormProps) {
  const router = useRouter()
  const isNew = !itemId
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const [storageReady, setStorageReady] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/cms/storage-status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { uploadsReady?: boolean } | null) => {
        setStorageReady(data?.uploadsReady ?? null)
      })
      .catch(() => setStorageReady(null))
  }, [])

  useEffect(() => {
    if (!itemId) return

    async function load() {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/cms/${pathKey}/${itemId}`)
        if (!res.ok) throw new Error('Not found')
        const data = (await res.json()) as { item: Record<string, unknown> }
        setValues(itemToFormValues(config.key, data.item))
      } catch {
        setError('Could not load item.')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [config.key, itemId, pathKey])

  const setField = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingField(key)
    setError('')

    try {
      let fileToUpload: File = file
      try {
        fileToUpload = await compressImage(file, 1920)
      } catch {
        fileToUpload = file
      }

      const formData = new FormData()
      formData.append('file', fileToUpload)
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = (await res.json()) as { url?: string; error?: string }

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Image upload failed')
      }

      setField(key, data.url)
      setUploadSuccess(key)
      setTimeout(() => setUploadSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploadingField(null)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const url = isNew
        ? `/api/cms/${pathKey}`
        : `/api/cms/${pathKey}/${itemId}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include',
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Save failed')
      }

      router.push(`/admin/${pathKey}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading...</p>
  }

  return (
    <div>
      <Link
        href={`/admin/${pathKey}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {config.label}
      </Link>

      <AdminHeader
        title={isNew ? `Add ${config.singular}` : `Edit ${config.singular}`}
      />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {storageReady === false && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            File uploads are not configured on this server. Set{' '}
            <strong>MONGODB_URI</strong> in your environment variables (MongoDB Atlas recommended).
            CMS data and uploads persist across redeployments. You can still paste an image URL in the text field below.
          </div>
        )}
        {config.fields.map((field) => {
          if (field.key.endsWith('Ar')) return null

          const arField = config.fields.find((f) => f.key === `${field.key}Ar`)
          const isBilingual =
            arField && (field.type === 'text' || field.type === 'textarea')

          if (isBilingual) {
            return (
              <BilingualField
                key={field.key}
                label={field.label.replace(/\s*\(English\)\s*/i, '')}
                enValue={String(values[field.key] ?? '')}
                arValue={String(values[arField.key] ?? '')}
                onEnChange={(v) => setField(field.key, v)}
                onArChange={(v) => setField(arField.key, v)}
                type={field.type === 'textarea' ? 'textarea' : 'text'}
                rows={field.rows ?? 4}
                required={field.required}
                placeholder={field.placeholder}
              />
            )
          }

          return (
          <div key={field.key}>
            <label htmlFor={field.key} className="mb-1.5 block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.key}
                rows={field.rows ?? 4}
                value={String(values[field.key] ?? '')}
                onChange={(e) => setField(field.key, e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                placeholder={field.placeholder}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.key}
                value={String(values[field.key] ?? field.options?.[0]?.value ?? '')}
                onChange={(e) => setField(field.key, e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(values[field.key])}
                  onChange={(e) => setField(field.key, e.target.checked)}
                  className="rounded border-gray-300"
                />
                Yes
              </label>
            ) : field.type === 'tags' ? (
              <input
                id={field.key}
                type="text"
                value={
                  Array.isArray(values[field.key])
                    ? (values[field.key] as string[]).join(', ')
                    : String(values[field.key] ?? '')
                }
                onChange={(e) =>
                  setField(
                    field.key,
                    e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  )
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                placeholder="Comma-separated values"
              />
            ) : field.type === 'image' ? (
              <div className="space-y-3">
                {values[field.key] ? (
                  <div className="relative h-40 w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={String(values[field.key])}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <input
                  type="text"
                  value={String(values[field.key] ?? '')}
                  onChange={(e) => setField(field.key, e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                  placeholder="/uploads/image.jpg or https://..."
                />
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingField === field.key}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(field.key, file)
                    e.target.value = ''
                  }}
                  className="text-sm"
                />
                {uploadingField === field.key && (
                  <p className="text-xs text-gray-500">Uploading image…</p>
                )}
                {uploadSuccess === field.key && (
                  <p className="text-xs text-emerald-600">Image uploaded — click Save to apply on the site.</p>
                )}
              </div>
            ) : field.key === 'resumeUrl' && values[field.key] ? (
              <div className="space-y-2">
                <a
                  href={String(values[field.key]).startsWith('/') ? String(values[field.key]) : String(values[field.key])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm font-medium text-primary-600 hover:underline"
                >
                  Download resume
                </a>
                <input
                  type="text"
                  value={String(values[field.key] ?? '')}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
                />
              </div>
            ) : (
              <input
                id={field.key}
                type={field.type === 'number' ? 'number' : 'text'}
                value={String(values[field.key] ?? '')}
                onChange={(e) =>
                  setField(
                    field.key,
                    field.type === 'number' ? e.target.value : e.target.value,
                  )
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                placeholder={field.placeholder}
              />
            )}

            {field.helpText && (
              <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
            )}
          </div>
          )
        })}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSaving}
          className="btn-primary inline-flex gap-2"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save {config.singular}
        </button>
      </form>
    </div>
  )
}
