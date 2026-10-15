import Link from 'next/link'

import AdminSystemStatus from '@/components/admin/AdminSystemStatus'

interface AdminHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <Link
          href="/"
          target="_blank"
          className="inline-flex min-h-[40px] items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          View Site
        </Link>
        <AdminSystemStatus />
      </div>
    </div>
  )
}
