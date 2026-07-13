import { NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { getStore } from '@/lib/cms/store'

export async function GET() {
  const authError = await requireAdminSession()
  if (authError) return authError

  const store = await getStore()
  const date = new Date().toISOString().slice(0, 10)
  const filename = `cms-store-${date}.json`
  const body = JSON.stringify(store, null, 2)

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
