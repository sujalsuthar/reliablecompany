import { NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { isFileStorageReady } from '@/lib/cms/file-storage'
import { pingMongo } from '@/lib/cms/mongodb'
import { isMongoEnabled } from '@/lib/cms/storage'

export async function GET() {
  const authError = await requireAdminSession()
  if (authError) return authError

  const mongo = isMongoEnabled()
  const ping = mongo ? await pingMongo() : { ok: false, error: 'MONGODB_URI not configured' }

  return NextResponse.json({
    mongodb: mongo,
    dbConnected: ping.ok,
    dbError: ping.error,
    uploadsReady: isFileStorageReady(),
    persistence: mongo
      ? 'MongoDB — CMS data and uploads persist across redeployments'
      : process.env.VERCEL
        ? 'Not configured — set MONGODB_URI'
        : 'Local disk (data/cms-store.json + public/uploads/)',
  })
}
