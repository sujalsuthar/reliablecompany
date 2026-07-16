import { promises as fs } from 'fs'
import path from 'path'

import { NextRequest, NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { filePublicUrl, saveFileToMongo } from '@/lib/cms/file-storage'
import { isMongoEnabled } from '@/lib/cms/storage'
import { validateImageUpload } from '@/lib/security/upload'

function buildUploadFilename(originalName: string, mime: string): string {
  const ext = mime.split('/')[1]?.replace('jpeg', 'jpg') ?? 'bin'
  const baseName = originalName
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .slice(0, 60)
  return `${Date.now()}-${baseName || 'image'}.${ext}`
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminSession()
  if (authError) return authError

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const validation = validateImageUpload(file, buffer)

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const filename = buildUploadFilename(file.name, validation.mime)

    if (process.env.VERCEL && !isMongoEnabled()) {
      return NextResponse.json(
        {
          error:
            'Image storage is not configured. Set MONGODB_URI in your environment variables.',
        },
        { status: 503 },
      )
    }

    if (isMongoEnabled()) {
      const fileId = await saveFileToMongo(buffer, filename, validation.mime, 'upload')
      return NextResponse.json({ url: filePublicUrl(fileId, 'upload') })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, filename), buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (error) {
    console.error('[cms] upload failed:', error)
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
