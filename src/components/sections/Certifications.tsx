import CmsImage from '@/components/ui/CmsImage'
import { getCertifications, getSectionContent } from '@/lib/content'

export default async function Certifications() {
  const [certifications, header] = await Promise.all([
    getCertifications(),
    getSectionContent('certifications'),
  ])

  if (!certifications.length) return null

  return (
    <section className="section-pad bg-[#f6f7fb]">
      <div className="site-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            {header?.title ?? 'Cybersecurity Expertise & Certifications'}
          </h2>
          {header?.description ? (
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
              {header.description}
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {certifications.map((cert) => (
            <div
              key={cert._id}
              className="flex aspect-[5/4] items-center justify-center rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-gray-100 transition-shadow hover:shadow-[0_8px_28px_rgba(15,23,42,0.10)]"
            >
              {cert.logoUrl ? (
                <div className="relative h-full w-full">
                  <CmsImage
                    src={cert.logoUrl}
                    alt={cert.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 220px"
                  />
                </div>
              ) : (
                <span className="text-center text-sm font-semibold text-primary-700">
                  {cert.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
