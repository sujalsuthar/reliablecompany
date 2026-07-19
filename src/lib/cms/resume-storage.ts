import { promises as fs } from 'fs'
import path from 'path'

import {
  filePublicUrl,
  isFileStorageReady,
  saveFileToMongo,
} from '@/lib/cms/file-storage'
import { isMongoEnabled } from '@/lib/cms/storage'

function sanitizeResumeFilename(originalName: string): string {
  const extMatch = originalName.match(/\.(pdf|docx?)$/i)
  const ext = extMatch ? extMatch[0].toLowerCase() : '.pdf'
  const stem = originalName
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
  return `${Date.now()}-${stem || 'resume'}${ext}`
}

export interface SavedResume {
  url: string
  storage: 'mongo' | 'disk'
}

async function saveResumeToDisk(
  buffer: Buffer,
  filename: string,
): Promise<SavedResume> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes')
  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, filename), buffer)
  return { url: `/uploads/resumes/${filename}`, storage: 'disk' }
}

export async function saveResumeFile(
  buffer: Buffer,
  mime: string,
  originalName: string,
): Promise<SavedResume> {
  const filename = sanitizeResumeFilename(originalName)

  if (isMongoEnabled()) {
    try {
      const fileId = await saveFileToMongo(buffer, filename, mime, 'resume')
      return { url: filePublicUrl(fileId, 'resume'), storage: 'mongo' }
    } catch (error) {
      console.error('[careers] MongoDB resume upload failed, trying disk:', error)
      if (error instanceof Error && error.message === 'RESUME_TOO_LARGE') {
        throw error
      }
      // Fall through to disk on Masar/local so applications are never lost
    }
  }

  if (!process.env.VERCEL) {
    try {
      return await saveResumeToDisk(buffer, filename)
    } catch (error) {
      console.error('[careers] disk resume upload failed:', error)
      throw new Error('RESUME_UPLOAD_FAILED')
    }
  }

  if (!isFileStorageReady()) {
    throw new Error('STORAGE_NOT_CONFIGURED')
  }

  throw new Error('RESUME_UPLOAD_FAILED')
}
