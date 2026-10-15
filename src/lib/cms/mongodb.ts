import { MongoClient, type Db } from 'mongodb'

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | null
  mongoClientPromise: Promise<MongoClient> | null
}

export function isMongoEnabled(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim())
}

export function getMongoDbName(): string {
  return process.env.MONGODB_DB_NAME?.trim() || 'reliable_cms'
}

export function resetMongoClient(): void {
  const client = globalForMongo.mongoClient
  globalForMongo.mongoClient = null
  globalForMongo.mongoClientPromise = null
  if (client) {
    void client.close().catch(() => undefined)
  }
}

async function connectMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (globalForMongo.mongoClient) {
    return globalForMongo.mongoClient
  }

  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(uri, {
      // Fail fast on shared hosting when Atlas IP is blocked / slow
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 20000,
      maxPoolSize: 5,
      maxIdleTimeMS: 60_000,
    })
    globalForMongo.mongoClientPromise = client.connect().then((connected) => {
      globalForMongo.mongoClient = connected
      return connected
    })
  }

  try {
    return await globalForMongo.mongoClientPromise
  } catch (error) {
    resetMongoClient()
    throw error
  }
}

export async function getDb(): Promise<Db> {
  const client = await connectMongoClient()
  return client.db(getMongoDbName())
}

export async function pingMongo(): Promise<{ ok: boolean; error?: string }> {
  if (!isMongoEnabled()) {
    return { ok: false, error: 'MONGODB_URI is not set on the server' }
  }

  const attempt = async (): Promise<void> => {
    const db = await getDb()
    await db.command({ ping: 1 })
  }

  try {
    await attempt()
    return { ok: true }
  } catch (firstError) {
    resetMongoClient()
    try {
      await attempt()
      return { ok: true }
    } catch (secondError) {
      const message =
        secondError instanceof Error
          ? secondError.message
          : firstError instanceof Error
            ? firstError.message
            : 'MongoDB ping failed'
      return { ok: false, error: message }
    }
  }
}
