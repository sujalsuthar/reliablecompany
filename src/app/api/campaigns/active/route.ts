import { NextResponse } from 'next/server'

import { getActiveCampaign } from '@/lib/cms/store'

export const revalidate = 0

export async function GET() {
  const campaign = await getActiveCampaign()
  if (!campaign) {
    return NextResponse.json({ campaign: null })
  }

  return NextResponse.json({ campaign })
}
