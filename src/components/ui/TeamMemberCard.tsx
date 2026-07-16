import { clsx } from 'clsx'
import { User } from 'lucide-react'
import CmsImage from '@/components/ui/CmsImage'

import { getImageUrl } from '@/lib/images'
import type { SanityImage } from '@/lib/types'

interface TeamMemberCardProps {
  name: string
  role?: string
  division?: string
  photo?: SanityImage
  className?: string
}

export default function TeamMemberCard({
  name,
  role,
  division,
  photo,
  className,
}: TeamMemberCardProps) {
  const photoUrl = getImageUrl(photo)

  return (
    <article className={clsx('card-base overflow-hidden', className)}>
      <div className="relative aspect-square w-full overflow-hidden bg-primary-50">
        {photoUrl ? (
          <CmsImage
            src={photoUrl}
            alt={photo?.alt ?? name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-50">
            <User className="h-16 w-16 text-primary-200" aria-hidden />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {role && <p className="mt-1 text-sm text-gray-600">{role}</p>}
        {division && (
          <span className="mt-3 inline-block rounded-tag bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
            {division}
          </span>
        )}
      </div>
    </article>
  )
}
