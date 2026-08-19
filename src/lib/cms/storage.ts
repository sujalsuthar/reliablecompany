import { promises as fs } from 'fs'
import path from 'path'

import type { CmsStore } from '@/lib/cms/types'
import { getDb, getMongoDbName, isMongoEnabled } from '@/lib/cms/mongodb'

const STORE_PATH = path.join(process.cwd(), 'data', 'cms-store.json')
export const STORE_DOC_ID = 'main' as const

type CmsStoreDocument = {
  _id: typeof STORE_DOC_ID
  data: CmsStore
  updatedAt?: Date
}

export { isMongoEnabled }

export interface CmsStoreReadResult {
  store: CmsStore | null
  source: 'mongo' | 'disk' | 'empty'
  dbName?: string
  updatedAt?: string
  error?: string
}

async function readStoreFromDisk(): Promise<CmsStore | null> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf-8')
    return JSON.parse(raw) as CmsStore
  } catch {
    return null
  }
}

async function writeStoreToDisk(store: CmsStore): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true })
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8')
}

async function readStoreDocumentFromMongo(): Promise<{
  data: CmsStore | null
  updatedAt?: Date
}> {
  const db = await getDb()
  const doc = await db
    .collection<CmsStoreDocument>('cms_store')
    .findOne({ _id: STORE_DOC_ID })
  return { data: doc?.data ?? null, updatedAt: doc?.updatedAt }
}

async function writeStoreToMongo(store: CmsStore): Promise<void> {
  try {
    const db = await getDb()
    await db.collection<CmsStoreDocument>('cms_store').updateOne(
      { _id: STORE_DOC_ID },
      { $set: { data: store, updatedAt: new Date() } },
      { upsert: true },
    )
  } catch (error) {
    console.error('[cms] MongoDB write failed:', error)
    throw new Error(
      'Could not save to database. Check MONGODB_URI and MONGODB_DB_NAME in your environment.',
    )
  }
}

/**
 * Read-only inspect. Never seeds or overwrites MongoDB.
 */
export async function inspectCmsStore(): Promise<CmsStoreReadResult> {
  if (isMongoEnabled()) {
    try {
      const { data, updatedAt } = await readStoreDocumentFromMongo()
      return {
        store: data,
        source: data ? 'mongo' : 'empty',
        dbName: getMongoDbName(),
        updatedAt: updatedAt?.toISOString(),
      }
    } catch (error) {
      return {
        store: null,
        source: 'empty',
        dbName: getMongoDbName(),
        error: error instanceof Error ? error.message : 'MongoDB read failed',
      }
    }
  }

  const fromDisk = await readStoreFromDisk()
  return { store: fromDisk, source: fromDisk ? 'disk' : 'empty' }
}

export async function readRawStore(): Promise<CmsStore | null> {
  const inspected = await inspectCmsStore()

  if (inspected.error) {
    console.error('[cms] store read failed — refusing to seed over live data:', inspected.error)
    throw new Error(inspected.error)
  }

  if (inspected.store) return inspected.store

  // Mongo is configured but the document is missing. Never auto-write git seed
  // into Atlas — that is how production CMS content gets wiped.
  if (isMongoEnabled()) {
    console.error(
      `[cms] No cms_store document in database "${inspected.dbName}". ` +
        'Will not seed from disk. Restore from Atlas backup or set ALLOW_CMS_SEED=1 only for a new empty project.',
    )
    return null
  }

  return readStoreFromDisk()
}

export async function writeRawStore(store: CmsStore): Promise<void> {
  if (isMongoEnabled()) {
    await writeStoreToMongo(store)
    return
  }

  if (process.env.VERCEL) {
    throw new Error(
      'CMS storage is not configured on Vercel. Set MONGODB_URI to a MongoDB Atlas connection string.',
    )
  }

  await writeStoreToDisk(store)
}
