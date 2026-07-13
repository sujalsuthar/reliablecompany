import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import CmsPageHero from '@/components/ui/CmsPageHero'
import { getBlogPostBySlug, getPublishedBlogPosts } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { formatDate, getMessages } from '@/lib/i18n/messages'
import { generateLocalizedMetadata } from '@/lib/seo'

export const revalidate = 0
export const dynamicParams = true

interface BlogDetailPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return generateLocalizedMetadata({
    title: post.seoTitle ?? post.title,
    titleAr: post.seoTitleAr,
    titleAlt: post.seoTitleAlt,
    titleAltAr: post.seoTitleAltAr,
    description: post.seoDescription ?? post.excerpt ?? post.title,
    descriptionAr: post.seoDescriptionAr,
    descriptionAlt: post.seoDescriptionAlt,
    descriptionAltAr: post.seoDescriptionAltAr,
    keywords: post.seoKeywords,
    keywordsAr: post.seoKeywordsAr,
    path: `/blog/${params.slug}`,
    absoluteTitle: Boolean(post.seoTitle?.trim()),
  })
}

function renderContent(content?: string) {
  if (!content?.trim()) return null
  return content.split(/\n\n+/).map((paragraph, i) => (
    <p key={i} className="mb-4 text-justify text-base leading-relaxed text-gray-600 last:mb-0">
      {paragraph.trim()}
    </p>
  ))
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const locale = await getLocale()
  const m = getMessages(locale)
  const post = await getBlogPostBySlug(params.slug)

  if (!post) notFound()

  const body =
    locale === 'ar' && post.contentAr?.trim() ? post.contentAr : post.content

  return (
    <>
      <CmsPageHero
        pageKey="blog"
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: m.common.blog, href: '/blog' },
          { label: post.title },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time>
            {post.author && <span>· {post.author}</span>}
          </div>

          <div className="prose prose-gray max-w-none">{renderContent(body)}</div>

          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link href="/blog" className="text-sm text-primary-600 hover:underline">
              ← {m.common.blog}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
