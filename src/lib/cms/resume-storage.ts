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
    .slice(0, 60)
  return `${Date.now()}-${stem}${ext}`
}

export interface SavedResume {
  url: string
  storage: 'mongo' | 'disk'
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
      console.error('[careers] MongoDB resume upload failed:', error)
      if (error instanceof Error && error.message === 'RESUME_TOO_LARGE') {
        throw error
      }
    }
  }

  if (!process.env.VERCEL) {
    const ext = originalName.split('.').pop()?.toLowerCase() ?? 'pdf'
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes')
    await fs.mkdir(uploadDir, { recursive: true })
    const diskName = filename.endsWith(`.${ext}`) ? filename : `${filename}.${ext}`
    await fs.writeFile(path.join(uploadDir, diskName), buffer)
    return { url: `/uploads/resumes/${diskName}`, storage: 'disk' }
  }

  if (!isFileStorageReady()) {
    throw new Error('STORAGE_NOT_CONFIGURED')
  }

  throw new Error('RESUME_UPLOAD_FAILED')
}
