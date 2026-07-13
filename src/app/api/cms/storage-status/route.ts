import { NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { isFileStorageReady } from '@/lib/cms/file-storage'
import { isMongoEnabled } from '@/lib/cms/storage'

export async function GET() {
  const authError = await requireAdminSession()
  if (authError) return authError

  const mongo = isMongoEnabled()

  return NextResponse.json({
    mongodb: mongo,
    uploadsReady: isFileStorageReady(),
    persistence: mongo
      ? 'MongoDB — CMS data and uploads persist across redeployments'
      : process.env.VERCEL
        ? 'Not configured — set MONGODB_URI'
        : 'Local disk (data/cms-store.json + public/uploads/)',
  })
}
