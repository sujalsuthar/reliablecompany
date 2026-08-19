import { NextResponse } from 'next/server'

import { getDb, getMongoDbName, isMongoEnabled } from '@/lib/cms/mongodb'
import { inspectCmsStore } from '@/lib/cms/storage'

export const dynamic = 'force-dynamic'

/**
 * Public health check for Masar / cPanel debugging.
 * This endpoint is read-only and never seeds or overwrites CMS data.
 */
export async function GET() {
  const started = Date.now()
  const result: Record<string, unknown> = {
    ok: true,
    nodeEnv: process.env.NODE_ENV ?? null,
    siteUrl: process.env.SITE_URL ?? null,
    mongodbConfigured: isMongoEnabled(),
    mongodbDbName: isMongoEnabled() ? getMongoDbName() : null,
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
    const inspected = await inspectCmsStore()
    result.cmsStore = inspected.store ? 'ok' : 'empty'
    result.cmsStoreSource = inspected.source
    result.cmsStoreUpdatedAt = inspected.updatedAt ?? null
    result.cmsProfileVersion = inspected.store?.profileVersion ?? null
    result.cmsServices = inspected.store?.services?.length ?? 0
    result.cmsEnquiries = inspected.store?.enquiries?.length ?? 0
    result.cmsCareerApplications = inspected.store?.careerApplications?.length ?? 0
    result.cmsCustomLines = (inspected.store?.homepageSections ?? []).filter(
      (section) => section.type === 'customLine',
    ).length
    result.cmsLogoUrl = inspected.store?.globalContent?.logoUrl ?? null
    if (inspected.error) {
      result.ok = false
      result.cmsStore = 'error'
      result.cmsStoreError = inspected.error
    }
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
