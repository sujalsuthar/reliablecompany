'use client'

import { Briefcase, FileText, Inbox, Layers, Wrench } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'
import ExportCmsButton from '@/components/admin/ExportCmsButton'
import StatusBadge from '@/components/admin/StatusBadge'

interface DashboardStats {
  blogPosts: number
  activeCareers: number
  newEnquiries: number
  services: number
  industries: number
  projects: number
  recentEnquiries: {
    _id: string
    fullName: string
    division: string
    status: string
  }[]
  recentBlogPosts: {
    _id: string
    title: string
    status: string
    updatedAt: string
  }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    fetch('/api/cms/stats')
      .then((res) => res.json())
      .then((data) => setStats(data as DashboardStats))
      .catch(() => setStats(null))
  }, [])

  const cards = [
    { label: 'Blog Posts', value: stats?.blogPosts ?? 0, icon: FileText, href: '/admin/blog-posts', color: 'text-purple-600 bg-purple-50' },
    { label: 'Active Jobs', value: stats?.activeCareers ?? 0, icon: Briefcase, href: '/admin/careers', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'New Enquiries', value: stats?.newEnquiries ?? 0, icon: Inbox, href: '/admin/enquiries', color: 'text-amber-600 bg-amber-50' },
    { label: 'Services', value: stats?.services ?? 0, icon: Wrench, href: '/admin/services', color: 'text-blue-600 bg-blue-50' },
    { label: 'Industries', value: stats?.industries ?? 0, icon: Layers, href: '/admin/industries', color: 'text-indigo-600 bg-indigo-50' },
  ]

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Welcome to the Reliable Engineering CMS — manage all content here."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <ExportCmsButton />
            <Link
              href="/admin/site-changes"
              className="btn-primary inline-flex gap-2"
            >
              Open Site Changes
            </Link>
          </div>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}>
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {(stats?.recentEnquiries ?? []).map((item) => (
              <li key={item._id} className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.fullName}</p>
                  <p className="text-xs text-gray-500">{item.division}</p>
                </div>
                <StatusBadge status={item.status} />
              </li>
            ))}
            {!stats?.recentEnquiries?.length && (
              <li className="text-sm text-gray-500">No enquiries yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Blog Posts</h2>
            <Link href="/admin/blog-posts" className="text-sm text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {(stats?.recentBlogPosts ?? []).map((item) => (
              <li key={item._id} className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </li>
            ))}
            {!stats?.recentBlogPosts?.length && (
              <li className="text-sm text-gray-500">No blog posts yet.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  )
}
