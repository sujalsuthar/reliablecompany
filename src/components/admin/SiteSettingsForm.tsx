'use client'

import { Loader2, Save } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

import AdminHeader from '@/components/admin/AdminHeader'

export default function SiteSettingsForm() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/cms/singleton/siteSettings')
      .then((res) => res.json())
      .then((json) => {
        const data = json.data as Record<string, string>
        setValues({
          siteName: data.siteName ?? '',
          tagline: data.tagline ?? '',
          phone: data.phone ?? '',
          email: data.email ?? '',
          address: data.address ?? '',
          linkedIn: data.linkedIn ?? '',
          twitter: data.twitter ?? '',
          facebook: data.facebook ?? '',
        })
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    const res = await fetch('/api/cms/singleton/siteSettings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    setIsSaving(false)
    setMessage(res.ok ? 'Site settings saved.' : 'Failed to save.')
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>

  return (
    <div>
      <AdminHeader
        title="Site Settings"
        description="Global site name, contact details, and social links."
      />
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {[
          ['siteName', 'Site Name'],
          ['tagline', 'Tagline'],
          ['phone', 'Phone'],
          ['email', 'Email'],
          ['linkedIn', 'LinkedIn URL'],
          ['twitter', 'Twitter URL'],
          ['facebook', 'Facebook URL'],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              value={values[key] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
            />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
          <textarea
            rows={4}
            value={values.address ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, address: e.target.value }))}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>

        {message && <p className="text-sm text-emerald-600">{message}</p>}

        <button type="submit" disabled={isSaving} className="btn-primary inline-flex gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Settings
        </button>
      </form>
    </div>
  )
}
