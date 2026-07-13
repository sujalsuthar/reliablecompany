import type { Service } from '@/lib/types'

import {
  SERVICE_CATEGORIES,
  type ServiceCategoryName,
} from '@/lib/service-catalog'

type ServiceDetailExtras = Pick<
  Service,
  | 'category'
  | 'overviewDescription'
  | 'overviewBulletPoints'
  | 'subServices'
  | 'contentTitle'
  | 'benefitsTitle'
  | 'benefits'
  | 'processTitle'
  | 'processSteps'
  | 'faqsTitle'
  | 'faqs'
  | 'keyBenefitsTitle'
  | 'keyBenefits'
  | 'ctaTitle'
  | 'ctaDescription'
  | 'ctaButtonText'
  | 'ctaButtonLink'
>

function serviceDetail(
  title: string,
  category: ServiceCategoryName,
  overview: string,
  bullets: string[],
): ServiceDetailExtras {
  return {
    category,
    overviewDescription: overview,
    overviewBulletPoints: bullets,
    subServices: bullets,
    contentTitle: title,
    benefitsTitle: `Why Choose ${title}`,
    benefits: [
      {
        title: 'Real-World Expertise',
        description: 'Practitioners with hands-on experience across Saudi industrial and enterprise sectors.',
      },
      {
        title: 'Actionable Reports',
        description: 'Prioritized findings with clear remediation guidance and executive summaries.',
      },
      {
        title: 'Certified Professionals',
        description: 'Industry-certified security experts with deep technical domain knowledge.',
      },
      {
        title: 'Regulatory Alignment',
        description: 'Assessments aligned with NCA, ISO 27001, and international frameworks.',
      },
    ],
    processTitle: 'Our Process',
    processSteps: [
      'Scoping and rules of engagement',
      'Assessment and testing execution',
      'Finding validation and impact analysis',
      'Reporting and remediation guidance',
      'Retest and closure verification',
    ],
    faqsTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: `What does ${title} include?`,
        answer: `${title} helps organizations identify security weaknesses and receive practical remediation guidance from certified professionals.`,
      },
      {
        question: 'How long does an engagement take?',
        answer: 'Duration depends on scope — typically 1–4 weeks from kickoff to final report delivery.',
      },
      {
        question: 'Will testing disrupt operations?',
        answer: 'We coordinate closely with your team and work within agreed rules of engagement to minimize impact.',
      },
      {
        question: 'Why choose Reliable Company?',
        answer: 'We combine deep technical expertise with practical guidance tailored to Saudi regulatory and industry requirements.',
      },
    ],
    keyBenefitsTitle: 'Key Benefits',
    keyBenefits: [
      { title: 'Reduce Risk', description: 'Identify vulnerabilities before attackers exploit them.' },
      { title: 'Meet Compliance', description: 'Support regulatory and framework requirements.' },
      { title: 'Protect Reputation', description: 'Prevent breaches that damage customer trust.' },
      { title: 'Expert Support', description: 'Guidance from certified cybersecurity professionals.' },
    ],
    ctaTitle: 'Secure Your Environment',
    ctaDescription: 'Speak with our cybersecurity team about protecting your applications and infrastructure.',
    ctaButtonText: 'Request Consultation',
    ctaButtonLink: '/contact',
  }
}

export const SERVICE_DETAIL_BY_SLUG: Record<string, ServiceDetailExtras> = {}

for (const cat of SERVICE_CATEGORIES) {
  for (const svc of cat.services) {
    SERVICE_DETAIL_BY_SLUG[svc.slug] = serviceDetail(
      svc.title,
      cat.name,
      svc.paragraphs[0],
      cat.bulletPoints.slice(0, 4),
    )
  }
}

export function applyServiceDetailExtras<T extends { slug?: { current?: string } }>(
  service: T,
): T & ServiceDetailExtras {
  const slug = service.slug?.current
  const extras = slug ? SERVICE_DETAIL_BY_SLUG[slug] : undefined
  return { ...service, ...extras }
}
