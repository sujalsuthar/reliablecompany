'use client'

import { clsx } from 'clsx'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface ExportCmsButtonProps {
  className?: string
  variant?: 'sidebar' | 'default'
}

export default function ExportCmsButton({
  className,
  variant = 'default',
}: ExportCmsButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [message, setMessage] = useState('')

  const handleExport = async () => {
    setIsExporting(true)
    setMessage('')

    try {
      const response = await fetch('/api/cms/export')

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const disposition = response.headers.get('Content-Disposition')
      const filename =
        disposition?.match(/filename="([^"]+)"/)?.[1] ??
        `cms-store-${new Date().toISOString().slice(0, 10)}.json`

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)

      setMessage('Download started.')
    } catch {
      setMessage('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const isSidebar = variant === 'sidebar'

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className={clsx(
          'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60',
          isSidebar
            ? 'text-white/70 hover:bg-white/5 hover:text-white'
            : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
          !isSidebar && 'inline-flex min-h-[40px] justify-center px-4 font-medium',
        )}
      >
        {isExporting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Download className="h-4 w-4" aria-hidden />
        )}
        {isExporting ? 'Exporting…' : 'Export CMS'}
      </button>
      {message && (
        <p
          className={clsx(
            'mt-2 text-xs',
            message.includes('failed')
              ? isSidebar
                ? 'text-red-300'
                : 'text-red-600'
              : isSidebar
                ? 'text-emerald-300'
                : 'text-emerald-600',
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
}
