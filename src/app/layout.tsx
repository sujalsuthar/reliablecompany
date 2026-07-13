import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Cairo, Inter, Tajawal } from 'next/font/google'

import CookieBanner from '@/components/layout/CookieBanner'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { LocaleProvider } from '@/components/providers/LocaleProvider'
import { NavOverlayProvider } from '@/components/providers/NavOverlayProvider'
import PageTransition from '@/components/ui/PageTransition'
import { isRtl } from '@/lib/i18n/config'
import { getLocale } from '@/lib/i18n/locale'
import { PUBLIC_REVALIDATE_SECONDS } from '@/lib/public-revalidate'
import { BASE_URL } from '@/lib/seo'

import '@/styles/globals.css'

const CampaignWidget = dynamic(
  () => import('@/components/layout/CampaignWidget'),
  { ssr: false, loading: () => null },
)

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cairo',
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-tajawal',
})

export const revalidate = PUBLIC_REVALIDATE_SECONDS

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Reliable Company',
    default: 'Reliable Company',
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const rtl = isRtl(locale)

  return (
    <html
      lang={locale}
      dir={rtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${cairo.variable} ${tajawal.variable}`}
    >
      <body
        className={`flex min-h-screen flex-col bg-white text-gray-900 antialiased ${
          rtl ? 'font-arabic' : 'font-sans'
        }`}
        data-locale={locale}
      >
        <LocaleProvider locale={locale}>
          <NavOverlayProvider>
            <Navbar />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <CookieBanner />
            <CampaignWidget />
            <WhatsAppButton />
          </NavOverlayProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
