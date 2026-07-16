import CTABanner from '@/components/sections/CTABanner'
import { getCtaBanner, getGlobalContent } from '@/lib/content'
import { getLocale } from '@/lib/i18n/locale'
import { getMessages } from '@/lib/i18n/messages'

export default async function CTABannerSection({ source }: { source?: string } = {}) {
  const locale = await getLocale()
  const ui = getMessages(locale)
  const [cta, global] = await Promise.all([getCtaBanner(), getGlobalContent()])
  return (
    <CTABanner
      cta={cta}
      phone={global.phone}
      source={source}
      formMessages={ui.ctaForm}
    />
  )
}