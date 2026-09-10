'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[projects] page error:', error)
  }, [error])

  return (
    <section className="section-pad bg-white">
      <div className="site-container max-w-xl text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Unable to load case study</h1>
        <p className="mt-3 text-sm text-gray-600">
          This case study could not be displayed. Please try again or return to the projects list.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700"
          >
            Try again
          </button>
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary-200 px-6 text-sm font-medium text-primary-700 hover:border-primary-300"
          >
            Back to case studies
          </Link>
        </div>
      </div>
    </section>
  )
}
