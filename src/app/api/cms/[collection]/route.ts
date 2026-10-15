import { NextRequest, NextResponse } from 'next/server'

import { requireAdminSession } from '@/lib/cms/api-auth'
import { COLLECTION_CONFIGS } from '@/lib/cms/collections'
import { resolveCollectionPath } from '@/lib/cms/navigation'
import { formValuesToItem } from '@/lib/cms/transform'
import type { CmsCollection } from '@/lib/cms/types'
import { cmsDatabaseErrorResponse } from '@/lib/cms/api-response'
import { createCollectionItem, listCollection } from '@/lib/cms/store'

interface RouteParams {
  params: { collection: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const authError = await requireAdminSession()
  if (authError) return authError

  const collectionKey = resolveCollectionPath(params.collection)
  const config = collectionKey ? COLLECTION_CONFIGS[collectionKey] : null
  if (!config) {
    return NextResponse.json({ error: 'Unknown collection' }, { status: 404 })
  }

  try {
    const items = await listCollection(config.key)
    return NextResponse.json({ items })
  } catch (error) {
    return cmsDatabaseErrorResponse(error)
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAdminSession()
  if (authError) return authError

  const collectionKey = resolveCollectionPath(params.collection)
  const config = collectionKey ? COLLECTION_CONFIGS[collectionKey] : null
  if (!config) {
    return NextResponse.json({ error: 'Unknown collection' }, { status: 404 })
  }

  if (config.readOnly) {
    return NextResponse.json({ error: 'Collection is read-only' }, { status: 403 })
  }

  try {
    const body = (await request.json()) as Record<string, unknown>
    const payload = formValuesToItem(config.key, body)
    const item = await createCollectionItem(config.key as CmsCollection, payload)
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    console.error('[cms] POST failed:', error)
    const message =
      error instanceof Error ? error.message : 'Failed to create item'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
