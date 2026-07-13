import type { ServiceListItem } from '@/lib/types'
import { SERVICE_IMAGE_MAP } from '@/lib/seed-data'

export interface ResolvedServiceImages {
  heroImage?: string
  overviewImage?: string
}

/** CMS image fields with legacy seed fallbacks when unset. */
export function resolveServiceImages(
  service: Pick<ServiceListItem, 'heroImageSrc' | 'overviewImageSrc'>,
  slug: string,
): ResolvedServiceImages {
  const legacy = SERVICE_IMAGE_MAP[slug]
  return {
    heroImage: service.heroImageSrc?.trim() || legacy,
    overviewImage: service.overviewImageSrc?.trim() || legacy,
  }
}
