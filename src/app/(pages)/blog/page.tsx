import type { Metadata } from 'next'
import Link from 'next/link'

import CmsImage from '@/components/ui/CmsImage'
import CmsPageHero from '@/components/ui/CmsPageHero'
import { getPublishedBlogPosts } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { formatDate, getMessages } from '@/lib/i18n/messages'
import { generateCmsPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsPageMetadata('blog')
}

export default async function BlogPage() {
  const locale = await getLocale()
  const m = getMessages(locale)
  const posts = await getPublishedBlogPosts()

  return (
    <>
      <CmsPageHero
        pageKey="blog"
        title={m.blogPage.heroTitle}
        description={m.blogPage.heroDescription}
        breadcrumbs={[
          { label: m.common.home, href: '/' },
          { label: m.common.blog },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="site-container">
          {posts.length === 0 ? (
            <p className="text-gray-500">{m.blogPage.empty}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="card-base block overflow-hidden transition hover:shadow-hover"
                >
                  {post.coverImageSrc ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-50">
                      <CmsImage
                        src={post.coverImageSrc}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-4 text-xs text-gray-400">
                      {formatDate(post.updatedAt, locale)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link href="/" className="text-sm text-primary-600 hover:underline">
              ← {m.common.backHome}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
