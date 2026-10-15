'use client'

import { useEffect, useState } from 'react'

type StorageStatus = {
  dbConnected?: boolean
  dbError?: string
  mongodb?: boolean
}

export default function AdminSystemStatus() {
  const [status, setStatus] = useState<StorageStatus | null>(null)

  useEffect(() => {
    fetch('/api/cms/storage-status', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: StorageStatus | null) => setStatus(data))
      .catch(() => setStatus({ dbConnected: false, dbError: 'Could not check database status' }))
  }, [])

  if (!status) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" />
        Checking…
      </span>
    )
  }

  const online = status.mongodb && status.dbConnected

  return (
    <span
      className={`inline-flex max-w-[220px] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
        online ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
      }`}
      title={online ? 'MongoDB connected' : status.dbError ?? 'Database offline'}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${online ? 'bg-emerald-500' : 'bg-red-500'}`}
      />
      {online ? 'Database online' : 'Database offline'}
    </span>
  )
}
