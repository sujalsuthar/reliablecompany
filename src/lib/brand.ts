export const LOGO_PATH = '/logo.png'
export const LOGO_ALT = 'Reliable Company — شركة ريلايبل'

export const COMPANY_PHONE = '+966 56 391 3902'
export const COMPANY_EMAIL = 'info@reliablecompany.sa'
export const COMPANY_WEBSITE = 'https://reliablecompany.sa'
export const COMPANY_FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=61591194992498&sk=about'
export const COMPANY_ADDRESS =
  'B64B, Prince Muteb Street, Al Aziziyah District, Jeddah, Saudi Arabia'
export const COMPANY_ADDRESS_AR =
  'B64B، شارع الأمير متعب، حي العزيزية، جدة، المملكة العربية السعودية'
export const DIVISION_TAGLINE = 'A division of Reliable Company'
export const DIVISION_TAGLINE_AR = 'قسم من شركة ريلايبل'
export const CERTIFICATIONS_FOOTER_IMAGE = '/certifications-footer.png'
export const COPYRIGHT_TEXT = '© 2026 Reliable Company. All rights reserved.'

export function phoneTelHref(phone: string = COMPANY_PHONE): string {
  return `tel:${phone.replace(/\s/g, '')}`
}

export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.6953010221246!2d39.210085074728774!3d21.558766369365106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e51c81d1a76b71%3A0x2482b35fae751738!2sReliable%20company!5e0!3m2!1sen!2sin!4v1781274807482!5m2!1sen!2sin'

export const GOOGLE_MAPS_LINK =
  'https://www.google.com/maps/place/Reliable+company/@21.5587664,39.2126601,17z'

export const DEFAULT_HERO = {
  eyebrow: 'CYBER SECURITY & VAPT',
  headlinePrefix: 'Professional Cyber Security &',
  headlineHighlight: 'Penetration Testing Services in Saudi Arabia',
  subheadline:
    'Reliable Company provides professional Vulnerability Assessment and Penetration Testing (VAPT), web application security testing, network security assessment, and cybersecurity consulting services for businesses across Saudi Arabia.',
  primaryButtonText: 'Explore Our Services',
  primaryButtonLink: '/services',
  secondaryButtonText: 'Chat on WhatsApp',
  secondaryButtonLink: 'https://wa.me/966563913902',
  stats: [
    { _key: '1', number: '100+', label: 'Years Combined Experience' },
    { _key: '2', number: '500+', label: 'Industrial Projects Managed' },
    { _key: '3', number: '300+', label: 'Clients Secured' },
    { _key: '4', number: '30,000+', label: 'Vulnerabilities Remediated' },
  ],
} as const

import { buildServiceMenu } from '@/lib/service-catalog'

export const SERVICE_MENU = buildServiceMenu('en')
