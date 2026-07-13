import { promises as fs } from 'fs'
import path from 'path'

import type { CmsStore } from '@/lib/cms/types'
import { getDb, isMongoEnabled } from '@/lib/cms/mongodb'

const STORE_PATH = path.join(process.cwd(), 'data', 'cms-store.json')
const STORE_DOC_ID = 'main' as const

type CmsStoreDocument = {
  _id: typeof STORE_DOC_ID
  data: CmsStore
  updatedAt?: Date
}

export { isMongoEnabled }

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

async function readStoreFromMongo(): Promise<CmsStore | null> {
  try {
    const db = await getDb()
    const doc = await db
      .collection<CmsStoreDocument>('cms_store')
      .findOne({ _id: STORE_DOC_ID })
    return doc?.data ?? null
  } catch (error) {
    console.error('[cms] MongoDB read failed:', error)
    return null
  }
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

export async function readRawStore(): Promise<CmsStore | null> {
  if (isMongoEnabled()) {
    const fromMongo = await readStoreFromMongo()
    if (fromMongo) return fromMongo

    const fromDisk = await readStoreFromDisk()
    if (fromDisk) {
      try {
        await writeStoreToMongo(fromDisk)
      } catch (error) {
        console.error('[cms] MongoDB seed from disk failed:', error)
      }
      return fromDisk
    }
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
