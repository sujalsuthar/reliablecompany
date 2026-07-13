const DEFAULT_SITE_URL = 'https://reliablecompany.sa'

/** Public site URL (no trailing slash). Used for SEO, sitemap, and Open Graph. */
export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    DEFAULT_SITE_URL
  return raw.replace(/\/$/, '')
}
