import { NextResponse } from 'next/server'

import { getDb, isMongoEnabled } from '@/lib/cms/mongodb'
import { inspectCmsStore } from '@/lib/cms/storage'

export const dynamic = 'force-dynamic'

/**
 * Public health check — minimal status only.
 * Never exposes CMS counts, DB names, env, logos, or enquiry totals.
 * Read-only: never seeds or overwrites CMS data.
 */
export async function GET() {
  let ok = true

  if (isMongoEnabled()) {
    try {
      const db = await getDb()
      await db.command({ ping: 1 })
    } catch {
      ok = false
    }
  } else {
    ok = false
  }

  try {
    const inspected = await inspectCmsStore()
    if (inspected.error || !inspected.store) ok = false
  } catch {
    ok = false
  }

  return NextResponse.json(
    { ok },
    {
      status: ok ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
