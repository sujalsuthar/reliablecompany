import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Compass } from 'lucide-react'

import HeroBackground from '@/components/sections/HeroBackground'
import HeroFloatingCircles from '@/components/sections/HeroFloatingCircles'
import { getHeroContent } from '@/lib/content'
import { getImageUrl } from '@/lib/images'

function parseHeadline(headline: string, highlightedWord?: string) {
  if (highlightedWord && headline.includes(highlightedWord)) {
    const prefix = headline.slice(0, headline.indexOf(highlightedWord)).trim()
    return { prefix: prefix || headline, highlight: highlightedWord }
  }

  const colonIndex = headline.indexOf(':')
  if (colonIndex !== -1) {
    return {
      prefix: headline.slice(0, colonIndex + 1).trim(),
      highlight: headline.slice(colonIndex + 1).trim(),
    }
  }

  return { prefix: headline, highlight: '' }
}

export default async function Hero() {
  const hero = await getHeroContent()

  if (!hero) {
    return null
  }

  const parsed = parseHeadline(hero.headline, hero.highlightedWord)

  const backgroundImageUrl = getImageUrl(hero.backgroundImage)

  return (
    <section className="relative flex min-h-[calc(100vh-88px)] w-full items-center overflow-hidden bg-primary-900 lg:min-h-[640px]">
      <HeroBackground />

      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt={hero.backgroundImage?.alt ?? ''}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/80 to-primary-900/40"
        aria-hidden
      />

      <HeroFloatingCircles />

      <div className="site-container relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl text-left">
          {hero.eyebrow && (
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-primary-800/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-accent-400 backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {hero.eyebrow}
            </span>
          )}

          <h1 className="text-[32px] font-semibold leading-[1.15] tracking-tight text-white sm:text-[42px] lg:text-[52px]">
            <span className="block">{parsed.prefix}</span>
            {parsed.highlight && (
              <span className="mt-1 block text-accent-400">{parsed.highlight}</span>
            )}
          </h1>

          {hero.subheadline && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-[17px] sm:leading-7">
              {hero.subheadline}
            </p>
          )}

          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            {hero.primaryButtonText && hero.primaryButtonLink && (
              <Link
                href={hero.primaryButtonLink}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-100 sm:w-auto"
              >
                {hero.primaryButtonText}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
            {hero.secondaryButtonText && hero.secondaryButtonLink && (
              hero.secondaryButtonLink.startsWith('http') ? (
                <a
                  href={hero.secondaryButtonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-accent-400/50 bg-transparent px-8 py-3 text-[15px] font-medium text-white transition-colors hover:border-accent-400 hover:bg-white/5 sm:w-auto"
                >
                  {hero.secondaryButtonText}
                </a>
              ) : (
                <Link
                  href={hero.secondaryButtonLink}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-accent-400/50 bg-transparent px-8 py-3 text-[15px] font-medium text-white transition-colors hover:border-accent-400 hover:bg-white/5 sm:w-auto"
                >
                  {hero.secondaryButtonText}
                </Link>
              )
            )}
          </div>

          {hero.stats && hero.stats.length > 0 && (
            <div className="mt-16 hidden grid-cols-2 gap-8 sm:grid md:flex md:gap-14">
              {hero.stats.map((stat) => (
                <div key={stat._key ?? `${stat.number}-${stat.label}`}>
                  {stat.number && (
                    <p className="text-2xl font-bold text-accent-400 md:text-3xl">
                      {stat.number}
                    </p>
                  )}
                  {stat.label && (
                    <p className="mt-1 text-sm text-white/55">{stat.label}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
