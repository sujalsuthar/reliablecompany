import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { MongoClient, ObjectId } from 'mongodb'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnvLocal() {
  const raw = readFileSync(join(root, '.env.local'), 'utf8')
  const env = {}
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 1) continue
    env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1)
  }
  return env
}

const env = loadEnvLocal()
const uri = env.MONGODB_URI?.trim()
const dbName = env.MONGODB_DB_NAME?.trim() || 'reliable_cms'
const backupPath =
  process.argv[2] ||
  'C:\\Users\\TUF\\Downloads\\cms-store-2026-07-14.json'

if (!uri) {
  console.error('MONGODB_URI missing in .env.local')
  process.exit(1)
}

const restored = JSON.parse(readFileSync(backupPath, 'utf8'))
if (!restored?.hero || !Array.isArray(restored.homepageSections)) {
  console.error('Backup does not look like a CMS store JSON export')
  process.exit(1)
}

restored.profileVersion = 15
if (!restored.legalVersion) restored.legalVersion = 1

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 })

try {
  await client.connect()
  const db = client.db(dbName)
  const col = db.collection('cms_store')
  const current = await col.findOne({ _id: 'main' })

  mkdirSync(join(root, 'data'), { recursive: true })
  if (current?.data) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const out = join(root, 'data', `cms-store-before-restore-${stamp}.json`)
    writeFileSync(out, JSON.stringify(current.data, null, 2), 'utf8')
    console.log('Saved current live CMS to', out)

    for (const key of ['enquiries', 'careerApplications', 'campaignApplications']) {
      const live = Array.isArray(current.data[key]) ? current.data[key] : []
      const old = Array.isArray(restored[key]) ? restored[key] : []
      const seen = new Set(old.map((item) => item?._id).filter(Boolean))
      const merged = [...old]
      for (const item of live) {
        if (item?._id && seen.has(item._id)) continue
        if (item?._id) seen.add(item._id)
        merged.push(item)
      }
      restored[key] = merged
    }
    console.log('Kept form counts:', {
      enquiries: restored.enquiries.length,
      careerApplications: restored.careerApplications.length,
      campaignApplications: restored.campaignApplications.length,
    })
  }

  const fileIds = JSON.stringify(restored).match(/\/api\/cms\/files\/([a-f0-9]+)/gi) || []
  const uniqueIds = [...new Set(fileIds.map((u) => u.split('/').pop()))]
  if (uniqueIds.length) {
    const files = db.collection('cms_files.files')
    let found = 0
    const missing = []
    for (const id of uniqueIds) {
      try {
        const doc = await files.findOne({ _id: new ObjectId(id) })
        if (doc) found += 1
        else missing.push(id)
      } catch {
        missing.push(id)
      }
    }
    console.log('CMS file URLs in backup:', uniqueIds.length, 'still in GridFS:', found)
    if (missing.length) console.log('Missing GridFS ids:', missing.join(', '))
  }

  const result = await col.updateOne(
    { _id: 'main' },
    { $set: { data: restored, updatedAt: new Date() } },
    { upsert: true },
  )
  console.log('Mongo write:', {
    matched: result.matchedCount,
    modified: result.modifiedCount,
    upserted: result.upsertedCount,
  })
  console.log('Restored hero headline:', restored.hero?.headline)
  console.log('Why Us title:', restored.sectionContent?.whyUs?.title)
  console.log('Homepage sections:', restored.homepageSections.map((s) => s.type).join(', '))
} finally {
  await client.close()
}
