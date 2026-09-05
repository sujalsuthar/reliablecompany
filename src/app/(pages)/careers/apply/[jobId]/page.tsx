import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import CareerApplyForm from '@/components/careers/CareerApplyForm'
import { getActiveCareers, getCareerById } from '@/lib/content'
import { generateLocalizedMetadata } from '@/lib/seo'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'

interface CareerApplyPageProps {
  params: { jobId: string }
}

export const revalidate = PUBLIC_REVALIDATE_SECONDS
export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const careers = await getActiveCareers()
    return careers.map((job) => ({ jobId: job._id }))
  } catch (error) {
    console.error('[careers] generateStaticParams failed:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: CareerApplyPageProps): Promise<Metadata> {
  try {
    const job = await getCareerById(params.jobId)
    if (!job) return { title: 'Apply', robots: { index: false, follow: false } }

    return {
      ...(await generateLocalizedMetadata({
        title: `Apply — ${job.title}`,
        description: `Submit your application for ${job.title} at Reliable Company.`,
        path: `/careers/apply/${params.jobId}`,
        absoluteTitle: true,
      })),
      robots: { index: false, follow: false },
    }
  } catch {
    return { title: 'Apply', robots: { index: false, follow: false } }
  }
}

export default async function CareerApplyPage({ params }: CareerApplyPageProps) {
  let job = null
  try {
    job = await getCareerById(params.jobId)
  } catch (error) {
    console.error('[careers] getCareerById failed:', error)
    return (
      <section className="section-pad bg-white">
        <div className="site-container max-w-xl text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Application temporarily unavailable
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            We could not load this job right now. Please try again in a moment, or email your CV
            to hr@reliablecompany.sa.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700"
            >
              Back to careers
            </Link>
            <a
              href="mailto:hr@reliablecompany.sa"
              className="inline-flex h-11 items-center justify-center rounded-full border border-gray-200 px-6 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Email HR
            </a>
          </div>
        </div>
      </section>
    )
  }

  if (!job) {
    notFound()
  }

  return <CareerApplyForm job={job} />
}
