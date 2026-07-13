import { NextRequest, NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { readFileFromMongo } from '@/lib/cms/file-storage'
import { isMongoEnabled } from '@/lib/cms/storage'

interface RouteParams {
  params: { id: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const authError = await requireAdminSession()
  if (authError) return authError

  if (!isMongoEnabled()) {
    return NextResponse.json({ error: 'Resume storage not configured' }, { status: 503 })
  }

  const file = await readFileFromMongo(params.id)
  if (!file) {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
  }

  return new NextResponse(new Uint8Array(file.buffer), {
    headers: {
      'Content-Type': file.mime,
      'Content-Disposition': `attachment; filename="${file.filename.replace(/"/g, '')}"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
