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
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 15000,
      maxPoolSize: 5,
    })
    globalForMongo.mongoClientPromise = client.connect().then((connected) => {
      globalForMongo.mongoClient = connected
      return connected
    })
  }

  try {
    return await globalForMongo.mongoClientPromise
  } catch (error) {
    globalForMongo.mongoClientPromise = null
    globalForMongo.mongoClient = null
    throw error
  }
}

export async function getDb(): Promise<Db> {
  const client = await connectMongoClient()
  return client.db(getMongoDbName())
}
