import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CareerApplyForm from '@/components/careers/CareerApplyForm'
import { getActiveCareers, getCareerById } from '@/lib/content'
import { generateLocalizedMetadata } from '@/lib/seo'

interface CareerApplyPageProps {
  params: { jobId: string }
}

export const revalidate = 0
export const dynamicParams = true

export async function generateStaticParams() {
  const careers = await getActiveCareers()
  return careers.map((job) => ({ jobId: job._id }))
}

export async function generateMetadata({ params }: CareerApplyPageProps): Promise<Metadata> {
  const job = await getCareerById(params.jobId)
  if (!job) return { title: 'Apply' }

  return generateLocalizedMetadata({
    title: `Apply — ${job.title}`,
    description: `Submit your application for ${job.title} at Reliable Company.`,
    path: `/careers/apply/${params.jobId}`,
    absoluteTitle: true,
  })
}

export default async function CareerApplyPage({ params }: CareerApplyPageProps) {
  const job = await getCareerById(params.jobId)

  if (!job) {
    notFound()
  }

  return <CareerApplyForm job={job} />
}
