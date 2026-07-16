'use client'

import { useEffect, useState } from 'react'

export default function StorageStatusBanner() {
  const [uploadsReady, setUploadsReady] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/cms/storage-status', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { uploadsReady?: boolean } | null) => {
        setUploadsReady(data?.uploadsReady ?? null)
      })
      .catch(() => setUploadsReady(null))
  }, [])

  if (uploadsReady !== false) return null

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      File uploads are not configured on this server. Set <strong>MONGODB_URI</strong> in your
      environment variables (MongoDB Atlas recommended). CMS data and uploads persist across
      redeployments. You can still paste an image URL below.
    </div>
  )
}
