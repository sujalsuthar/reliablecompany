import type { Metadata } from 'next'

import CampaignApplyPage from '@/components/campaigns/CampaignApplyPage'
import { getActiveCampaign } from '@/lib/cms/store'
import { generateLocalizedMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

const APPLY_PATH = '/campaign-apply'

export async function generateMetadata(): Promise<Metadata> {
  let campaign = null
  try {
    campaign = await getActiveCampaign(APPLY_PATH)
  } catch {
    // CMS unavailable
  }

  const base = await generateLocalizedMetadata({
    title: 'Campaign Application',
    titleAr: 'طلب الحملة',
    description: 'Apply for the current Reliable Company cybersecurity campaign.',
    descriptionAr: 'قدّم طلبًا للحملة الحالية من شركة ريلايبل للأمن السيبراني.',
    path: APPLY_PATH,
  })

  return { ...base, robots: { index: false, follow: false } }
}

export default function CampaignApplyRoute() {
  return <CampaignApplyPage applyPagePath={APPLY_PATH} />
}
