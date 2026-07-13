import type { Metadata } from 'next'

import HomePageRenderer from '@/components/home/HomePageRenderer'
import { LOGO_PATH } from '@/lib/brand'
import { generateCmsPageMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

export const revalidate = PUBLIC_REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('home', { image: LOGO_PATH })
}

export default function Home() {
  return <HomePageRenderer />
}
