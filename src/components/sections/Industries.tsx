import SectionHeader from '@/components/ui/SectionHeader'
import CmsImage from '@/components/ui/CmsImage'
import { getIndustries, getSectionContent } from '@/lib/content'
import { getLucideIcon } from '@/lib/icons'

export default async function Industries() {
  const [industries, header] = await Promise.all([
    getIndustries(),
    getSectionContent('industries'),
  ])

  return (
    <section className="section-pad bg-primary-50">
      <div className="site-container">
        <SectionHeader
          label={header?.label ?? 'Industries'}
          title={header?.title ?? 'Industries We Serve'}
          description={
            header?.description ??
            "Delivering cybersecurity and VAPT expertise across the Kingdom's most demanding industrial and enterprise sectors."
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = getLucideIcon(industry.icon)
            return (
              <article
                key={industry._id}
                className="card-base overflow-hidden p-0 sm:p-0"
              >
                {industry.imageSrc ? (
                  <div className="relative h-36 w-full">
                    <CmsImage
                      src={industry.imageSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="flex items-center gap-4 p-5 sm:p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {industry.title}
                  </h3>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
