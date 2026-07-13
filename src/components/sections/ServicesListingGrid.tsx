'use client'

import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import ServiceListingCard from '@/components/ui/ServiceListingCard'
import type { ServiceListItem } from '@/lib/types'

interface ServicesListingGridProps {
  services: ServiceListItem[]
}

export default function ServicesListingGrid({
  services,
}: ServicesListingGridProps) {
  const grouped = services.reduce<Record<string, ServiceListItem[]>>((acc, service) => {
    const category = service.category?.trim() || 'Services'
    if (!acc[category]) acc[category] = []
    acc[category].push(service)
    return acc
  }, {})

  const categories = Object.keys(grouped)

  if (categories.length <= 1) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <AnimateOnScroll key={service._id} delay={index * 0.05} className="w-full">
            <ServiceListingCard
              title={service.title}
              description={service.shortDescription ?? ''}
              icon={service.icon ?? 'Circle'}
              slug={service.slug?.current ?? service._id}
            />
          </AnimateOnScroll>
        ))}
      </div>
    )
  }

  let delay = 0

  return (
    <div className="space-y-14">
      {categories.map((category) => (
        <div key={category}>
          <h2 className="mb-6 text-xl font-semibold text-gray-900 sm:text-2xl">{category}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grouped[category].map((service) => {
              const currentDelay = delay
              delay += 0.05
              return (
                <AnimateOnScroll key={service._id} delay={currentDelay} className="w-full">
                  <ServiceListingCard
                    title={service.title}
                    description={service.shortDescription ?? ''}
                    icon={service.icon ?? 'Circle'}
                    slug={service.slug?.current ?? service._id}
                  />
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
