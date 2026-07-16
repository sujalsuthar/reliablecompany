'use client'

import { clsx } from 'clsx'
import { Loader2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

import { uploadCmsImage } from '@/lib/cms/upload-client'

interface ImageUploadFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
  maxWidth?: number
  helpText?: string
  placeholder?: string
  previewClassName?: string
  previewFit?: 'cover' | 'contain'
  compact?: boolean
  disabled?: boolean
  onError?: (message: string) => void
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  maxWidth = 1920,
  helpText,
  placeholder = '/uploads/image.jpg or https://...',
  previewClassName,
  previewFit = 'cover',
  compact = false,
  disabled = false,
  onError,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setLocalError('')
    setUploadSuccess(false)

    try {
      const { url } = await uploadCmsImage(file, { maxWidth })
      onChange(url)
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Image upload failed'
      setLocalError(message)
      onError?.(message)
    } finally {
      setIsUploading(false)
    }
  }

  const labelClass = compact
    ? 'mb-1 block text-xs font-medium text-gray-600'
    : 'mb-1.5 block text-sm font-medium text-gray-700'
  const inputClass = compact
    ? 'w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs'
    : 'w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm'

  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>

      {value ? (
        <div
          className={clsx(
            'relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50',
            previewClassName ?? (compact ? 'h-20 w-full' : 'h-40 w-full max-w-md'),
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className={clsx(
              'h-full w-full',
              previewFit === 'contain' ? 'object-contain p-2' : 'object-cover',
            )}
          />
        </div>
      ) : null}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        placeholder={placeholder}
        disabled={disabled || isUploading}
      />

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={disabled || isUploading}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void handleUpload(file)
            e.target.value = ''
          }}
        />
        <button
          type="button"
          disabled={disabled || isUploading}
          onClick={() => inputRef.current?.click()}
          className={clsx(
            'inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors',
            'hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
            compact && 'px-2.5 py-1.5 text-xs',
          )}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Upload className="h-4 w-4" aria-hidden />
          )}
          {isUploading ? 'Uploading…' : 'Upload from computer'}
        </button>
        {value ? (
          <button
            type="button"
            disabled={disabled || isUploading}
            onClick={() => onChange('')}
            className={clsx(
              'text-sm text-gray-500 hover:text-gray-700',
              compact && 'text-xs',
            )}
          >
            Remove
          </button>
        ) : null}
      </div>

      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
      {uploadSuccess && (
        <p className="text-xs text-emerald-600">Image uploaded — save to apply on the site.</p>
      )}
      {localError && <p className="text-xs text-red-600">{localError}</p>}
    </div>
  )
}
