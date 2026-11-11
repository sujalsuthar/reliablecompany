/** Google Analytics 4 measurement ID for reliablecompany.sa */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || 'G-8VMZM5VG82'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackGaPageView(pagePath: string) {
  if (typeof window.gtag !== 'function') return
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: pagePath,
    anonymize_ip: true,
  })
}
