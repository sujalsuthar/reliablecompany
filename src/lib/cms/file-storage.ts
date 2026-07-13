import { GridFSBucket, ObjectId } from 'mongodb'

import { getDb, isMongoEnabled } from '@/lib/cms/mongodb'

const BUCKET_NAME = 'cms_files'
const MAX_RESUME_BYTES = 10 * 1024 * 1024

export type FileStorageType = 'upload' | 'resume'

export interface StoredFile {
  buffer: Buffer
  mime: string
  filename: string
}

function getBucket() {
  return getDb().then((db) => new GridFSBucket(db, { bucketName: BUCKET_NAME }))
}

function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id
}

export async function saveFileToMongo(
  buffer: Buffer,
  filename: string,
  mime: string,
  type: FileStorageType,
): Promise<string> {
  if (type === 'resume' && buffer.length > MAX_RESUME_BYTES) {
    throw new Error('RESUME_TOO_LARGE')
  }

  const bucket = await getBucket()
  const id = new ObjectId()

  await new Promise<void>((resolve, reject) => {
    const upload = bucket.openUploadStreamWithId(id, filename, {
      contentType: mime,
      metadata: { type, originalName: filename },
    })
    upload.on('error', reject)
    upload.on('finish', () => resolve())
    upload.end(buffer)
  })

  return id.toHexString()
}

export async function readFileFromMongo(fileId: string): Promise<StoredFile | null> {
  if (!isValidObjectId(fileId)) return null

  const bucket = await getBucket()
  const id = new ObjectId(fileId)

  const files = await bucket.find({ _id: id }).toArray()
  if (!files.length) return null

  const meta = files[0]
  const chunks: Buffer[] = []

  await new Promise<void>((resolve, reject) => {
    bucket
      .openDownloadStream(id)
      .on('data', (chunk: Buffer) => chunks.push(chunk))
      .on('error', reject)
      .on('end', () => resolve())
  })

  return {
    buffer: Buffer.concat(chunks),
    mime: meta.contentType || 'application/octet-stream',
    filename: meta.filename || 'file',
  }
}

export function filePublicUrl(fileId: string, type: FileStorageType): string {
  return type === 'resume' ? `/api/cms/resumes/${fileId}` : `/api/cms/files/${fileId}`
}

export function isFileStorageReady(): boolean {
  return isMongoEnabled() || !process.env.VERCEL
}
