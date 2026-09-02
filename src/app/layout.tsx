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
import GoogleAnalytics from '@/components/seo/GoogleAnalytics'
import JsonLd from '@/components/seo/JsonLd'
import { localBusinessSchema, organizationSchema, websiteSchema } from '@/lib/structured-data'
import { BASE_URL, DEFAULT_DESCRIPTION } from '@/lib/seo'

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
    default: 'Reliable Company | Cyber Security & VAPT Saudi Arabia',
  },
  description: DEFAULT_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    siteName: 'Reliable Company',
    title: 'Reliable Company | Cyber Security & VAPT Saudi Arabia',
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Reliable Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reliable Company | Cyber Security & VAPT Saudi Arabia',
    description: DEFAULT_DESCRIPTION,
    images: ['/logo.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512' }],
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
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
        <GoogleAnalytics />
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
