import type { Metadata } from 'next'

import CampaignApplyPage from '@/components/campaigns/CampaignApplyPage'
import { generateLocalizedMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

const APPLY_PATH = '/dark-web-assessment'

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    title: 'Free Dark Web Assessment',
    titleAr: 'تقييم مجاني للويب المظلم',
    description:
      'Request a free dark web assessment for your organization in Saudi Arabia. Discover leaked credentials and exposure risks before attackers exploit them.',
    descriptionAr:
      'اطلب تقييماً مجانياً للويب المظلم لمؤسستك في السعودية. اكتشف بيانات الاعتماد المسربة ومخاطر التعرض قبل أن يستغلها المهاجمون.',
    path: APPLY_PATH,
  })
}

export default function DarkWebAssessmentPage() {
  return (
    <CampaignApplyPage
      applyPagePath={APPLY_PATH}
      secondaryHref="/services/dark-web-monitoring"
      secondaryLabelEn="Explore Monitoring Service"
      secondaryLabelAr="استكشف خدمة المراقبة"
    />
  )
}
