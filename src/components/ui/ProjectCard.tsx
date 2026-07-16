'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Building2, Server, Settings2, Zap } from 'lucide-react'
import CmsImage from '@/components/ui/CmsImage'
import type { LucideIcon } from 'lucide-react'

import { divisionStyles } from '@/lib/division-styles'
import { getImageUrl } from '@/lib/images'
import type { DivisionType, SanityImage } from '@/lib/types'

interface ProjectCardProps {
  title: string
  shortDescription?: string
  thumbnail?: SanityImage
  division: string
  divisionType?: DivisionType
  tags?: string[]
  className?: string
}

const divisionIcons: Record<DivisionType, LucideIcon> = {
  civil: Building2,
  electrical: Zap,
  mechanical: Settings2,
  it: Server,
}

function ProjectCardImage({
  title,
  thumbnail,
  divisionType = 'civil',
}: {
  title: string
  thumbnail?: SanityImage
  divisionType?: DivisionType
}) {
  const imageUrl = getImageUrl(thumbnail)
  if (imageUrl) {

    return (
      <CmsImage
        src={imageUrl}
        alt={thumbnail?.alt ?? title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  const styles = divisionStyles[divisionType]
  const Icon = divisionIcons[divisionType]

  return (
    <div className={clsx('flex h-full w-full items-center justify-center', styles.bg)}>
      <Icon className={clsx('h-12 w-12', styles.icon)} aria-hidden />
    </div>
  )
}

export default function ProjectCard({
  title,
  shortDescription,
  thumbnail,
  division,
  divisionType = 'civil',
  tags = [],
  className,
}: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={clsx(
        'card-base group flex h-full w-full flex-col overflow-hidden',
        className,
      )}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-primary-50">
        <ProjectCardImage
          title={title}
          thumbnail={thumbnail}
          divisionType={divisionType}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        {shortDescription && (
          <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
            {shortDescription}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-tag border border-primary-100 bg-primary-50 px-2.5 py-0.5 text-xs text-primary-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
          {division && (
            <span className="rounded-tag bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
              {division}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
