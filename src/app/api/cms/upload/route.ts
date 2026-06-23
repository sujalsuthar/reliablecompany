import { put } from '@vercel/blob'
import { promises as fs } from 'fs'
import path from 'path'

import { NextRequest, NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { isBlobEnabled } from '@/lib/cms/storage'
import { validateImageUpload } from '@/lib/security/upload'

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

    const ext = validation.mime.split('/')[1]?.replace('jpeg', 'jpg') ?? 'bin'
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 80)
    const filename = `${Date.now()}-${safeName}.${ext}`

    if (isBlobEnabled()) {
      const blob = await put(`uploads/${filename}`, buffer, {
        access: 'public',
        contentType: validation.mime,
      })
      return NextResponse.json({ url: blob.url })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, filename), buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
