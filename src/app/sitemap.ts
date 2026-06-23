import type { MetadataRoute } from 'next'

import {
  getAllProjects,
  getPublishedBlogPosts,
  getServices,
} from '@/lib/content'
import { getSiteUrl } from '@/lib/site-url'

const staticRoutes = [
  '/',
  '/services',
  '/divisions',
  '/projects',
  '/about',
  '/blog',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
] as const

export const revalidate = 60

function toSitemapUrl(path: string): string {
  const baseUrl = getSiteUrl()
  return `${baseUrl}${path === '/' ? '' : path}`
}

function toLastModified(iso?: string): Date {
  return iso ? new Date(iso) : new Date()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, blogPosts] = await Promise.all([
    getServices(),
    getAllProjects(),
    getPublishedBlogPosts(),
  ])

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: toSitemapUrl(path),
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))

  const serviceEntries: MetadataRoute.Sitemap = services
    .filter((service) => service.slug?.current)
    .map((service) => ({
      url: toSitemapUrl(`/services/${service.slug!.current}`),
      lastModified: toLastModified(service._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((project) => project.slug?.current)
    .map((project) => ({
      url: toSitemapUrl(`/projects/${project.slug!.current}`),
      lastModified: toLastModified(project._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.slug)
    .map((post) => ({
      url: toSitemapUrl(`/blog/${post.slug}`),
      lastModified: toLastModified(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...blogEntries]
}
