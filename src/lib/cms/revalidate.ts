import { revalidatePath } from 'next/cache'

import type { CmsStore } from '@/lib/cms/types'

export function revalidatePublicContent(store?: CmsStore) {
  revalidatePath('/', 'layout')
  const paths = [
    '/',
    '/about',
    '/services',
    '/projects',
    '/blog',
    '/contact',
    '/divisions',
    '/careers',
    '/privacy',
    '/terms',
  ]
  for (const path of paths) {
    revalidatePath(path)
  }

  // Listing layouts — also refresh all detail pages under each segment
  revalidatePath('/services', 'layout')
  revalidatePath('/projects', 'layout')
  revalidatePath('/blog', 'layout')

  if (store) {
    for (const service of store.services) {
      const slug = service.slug?.current
      if (slug) revalidatePath(`/services/${slug}`)
    }
    for (const project of store.projects) {
      const slug = project.slug?.current
      if (slug) revalidatePath(`/projects/${slug}`)
    }
    for (const post of store.blogPosts) {
      if (post.slug) revalidatePath(`/blog/${post.slug}`)
    }
  }
}
