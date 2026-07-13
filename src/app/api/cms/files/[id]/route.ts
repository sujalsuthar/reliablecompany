import { NextRequest, NextResponse } from 'next/server'

import { readFileFromMongo } from '@/lib/cms/file-storage'
import { isMongoEnabled } from '@/lib/cms/storage'

interface RouteParams {
  params: { id: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  if (!isMongoEnabled()) {
    return NextResponse.json({ error: 'File storage not configured' }, { status: 503 })
  }

  const file = await readFileFromMongo(params.id)
  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  return new NextResponse(new Uint8Array(file.buffer), {
    headers: {
      'Content-Type': file.mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
