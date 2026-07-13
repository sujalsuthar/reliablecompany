import { NextResponse } from 'next/server'

import { getDb, isMongoEnabled } from '@/lib/cms/mongodb'
import { readRawStore } from '@/lib/cms/storage'

export const dynamic = 'force-dynamic'

/**
 * Public health check for Masar / cPanel debugging.
 * Open: https://uat.reliablecompany.sa/api/health
 */
export async function GET() {
  const started = Date.now()
  const result: Record<string, unknown> = {
    ok: true,
    nodeEnv: process.env.NODE_ENV ?? null,
    siteUrl: process.env.SITE_URL ?? null,
    mongodbConfigured: isMongoEnabled(),
  }

  if (isMongoEnabled()) {
    const mongoStarted = Date.now()
    try {
      const db = await getDb()
      await db.command({ ping: 1 })
      result.mongodb = 'ok'
      result.mongodbMs = Date.now() - mongoStarted
    } catch (error) {
      result.ok = false
      result.mongodb = 'error'
      result.mongodbError =
        error instanceof Error ? error.message : 'MongoDB connection failed'
      result.mongodbMs = Date.now() - mongoStarted
    }
  } else {
    result.mongodb = 'disabled'
  }

  const storeStarted = Date.now()
  try {
    const store = await readRawStore()
    result.cmsStore = store ? 'ok' : 'empty'
    result.cmsStoreMs = Date.now() - storeStarted
  } catch (error) {
    result.ok = false
    result.cmsStore = 'error'
    result.cmsStoreError =
      error instanceof Error ? error.message : 'CMS store read failed'
    result.cmsStoreMs = Date.now() - storeStarted
  }

  result.totalMs = Date.now() - started
  return NextResponse.json(result)
}
