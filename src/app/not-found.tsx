import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you requested could not be found on Reliable Company.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          The page you are looking for may have moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-medium text-white hover:bg-primary-700"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-gray-200 px-6 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
