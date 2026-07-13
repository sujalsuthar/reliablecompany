import type { CmsStore } from '@/lib/cms/types'
import {
  createSectionInstance,
  DEFAULT_HOMEPAGE_SECTIONS,
} from '@/lib/cms/editor/sections'
import { blocks, blocksToText } from '@/lib/cms/text'
import {
  CERTIFICATIONS_FOOTER_IMAGE,
  COMPANY_ADDRESS,
  COPYRIGHT_TEXT,
  DIVISION_TAGLINE,
  DIVISION_TAGLINE_AR,
  LOGO_PATH,
} from '@/lib/brand'
import {
  DEFAULT_MEGA_MENU_IMAGE,
  DEFAULT_PAGE_HERO_IMAGES,
} from '@/lib/page-heroes'
import {
  CTA_AR,
  FOOTER_AR,
  FOOTER_CONTACT_AR,
  GLOBAL_AR,
  NAVBAR_AR,
  SECTION_CONTENT_AR,
} from '@/lib/i18n/cms-ar'
import { createDefaultPageSeo } from '@/lib/cms/page-seo'
import { applyServiceDetailExtras } from '@/lib/service-seed-detail'
import {
  SEED_ABOUT_PAGE,
  SEED_DIVISIONS,
  SEED_HERO,
  SEED_PRIVACY_PAGE,
  SEED_PROJECTS,
  SEED_SERVICES,
  SEED_SITE_SETTINGS,
  SEED_TEAM,
  SEED_TERMS_PAGE,
  SEED_WHY_STATS,
} from '@/lib/seed-data'

export function createInitialStore(): CmsStore {
  return {
    profileVersion: 4,
    siteSettings: SEED_SITE_SETTINGS,
    navbar: {
      consultationText: 'Get Consultation',
      consultationTextAr: NAVBAR_AR.consultationText,
      consultationLink: '/contact',
      arabicLabel: 'عربي',
      mainLinks: [
        { label: 'Home', labelAr: NAVBAR_AR.mainLinks[0].label, href: '/' },
        { label: 'About', labelAr: NAVBAR_AR.mainLinks[1].label, href: '/about' },
        { label: 'Career', labelAr: NAVBAR_AR.mainLinks[2].label, href: '/careers' },
        { label: 'Contact', labelAr: NAVBAR_AR.mainLinks[3].label, href: '/contact' },
      ],
      resourcesLinks: [
        { label: 'Blog', labelAr: NAVBAR_AR.resourcesLinks[0].label, href: '/blog' },
        { label: 'Case Studies', labelAr: NAVBAR_AR.resourcesLinks[1].label, href: '/projects' },
      ],
      megaMenuImageUrl: DEFAULT_MEGA_MENU_IMAGE,
    },
    pageHeroImages: { ...DEFAULT_PAGE_HERO_IMAGES },
    footer: {
      description:
        'Professional cybersecurity and VAPT services — protecting applications and infrastructure through real-world security testing across Saudi Arabia.',
      descriptionAr: FOOTER_AR.description,
      divisionTagline: DIVISION_TAGLINE,
      divisionTaglineAr: DIVISION_TAGLINE_AR,
      certificationImageUrl: CERTIFICATIONS_FOOTER_IMAGE,
      contactHeading: 'Contact',
      contactHeadingAr: FOOTER_CONTACT_AR,
      serviceLinks: [
        { label: 'Web App Pen Testing', labelAr: FOOTER_AR.serviceLinks[0].label, href: '/services/web-application-penetration-testing' },
        { label: 'Dark Web Assessment', labelAr: FOOTER_AR.serviceLinks[1].label, href: '/dark-web-assessment' },
        { label: 'Dark Web Monitoring', labelAr: FOOTER_AR.serviceLinks[2].label, href: '/services/dark-web-monitoring' },
        { label: 'Ransomware IR', labelAr: FOOTER_AR.serviceLinks[3].label, href: '/services/ransomware-incident-response' },
      ],
      companyLinks: [
        { label: 'About Us', labelAr: FOOTER_AR.companyLinks[0].label, href: '/about' },
        { label: 'Our Projects', labelAr: FOOTER_AR.companyLinks[1].label, href: '/projects' },
        { label: 'Divisions', labelAr: FOOTER_AR.companyLinks[2].label, href: '/divisions' },
        { label: 'Careers', labelAr: FOOTER_AR.companyLinks[3].label, href: '/careers' },
        { label: 'Contact', labelAr: FOOTER_AR.companyLinks[4].label, href: '/contact' },
      ],
      officeCities: ['Jeddah'],
      privacyLabel: 'Privacy Policy',
      privacyLabelAr: FOOTER_AR.privacyLabel,
      termsLabel: 'Terms',
      termsLabelAr: FOOTER_AR.termsLabel,
    },
    globalContent: {
      siteName: SEED_SITE_SETTINGS.siteName,
      siteNameAr: GLOBAL_AR.siteName,
      tagline: SEED_SITE_SETTINGS.tagline ?? '',
      taglineAr: GLOBAL_AR.tagline,
      phone: SEED_SITE_SETTINGS.phone ?? '',
      email: SEED_SITE_SETTINGS.email ?? '',
      address: COMPANY_ADDRESS,
      addressAr: GLOBAL_AR.address,
      linkedIn: SEED_SITE_SETTINGS.linkedIn ?? '',
      twitter: SEED_SITE_SETTINGS.twitter ?? '',
      facebook: SEED_SITE_SETTINGS.facebook ?? '',
      copyrightText: COPYRIGHT_TEXT,
      copyrightTextAr: GLOBAL_AR.copyrightText,
      logoUrl: LOGO_PATH,
    },
    homepageSections: DEFAULT_HOMEPAGE_SECTIONS.map((type) =>
      createSectionInstance(type),
    ),
    sectionContent: Object.fromEntries(
      Object.entries({
        blog: {
          label: 'Blog',
          title: 'Latest Insights',
          description: 'Cybersecurity news, threat intelligence, and security perspectives from our team.',
        },
        services: {
          label: 'Our Expertise',
          title: 'Cybersecurity and VAPT Excellence',
          description:
            'Protecting your applications and infrastructure through real-world security testing across Saudi Arabia.',
        },
        campaigns: {
          label: 'Campaigns',
          title: 'Running Security Campaigns',
          description:
            'Discover active campaigns like our free dark web assessment and apply instantly.',
        },
        whyUs: {
          label: 'Why Reliable',
          title: 'Why Choose Reliable Company',
          description:
            '100+ years of combined experience, 300+ clients secured, and 30,000+ vulnerabilities remediated.',
        },
        industries: {
          label: 'Industries',
          title: "Industries We Serve",
          description:
            'Cybersecurity and VAPT services across desalination, oil & gas, construction, manufacturing, utilities, and environmental sectors.',
        },
        divisions: {
          label: 'Divisions',
          title: 'Our Core Capabilities',
          description:
            'Offensive Security, GRC & Compliance, Incident Response, and Security Assessments — one integrated cybersecurity team.',
        },
        projects: {
          label: 'Projects',
          title: 'Featured Case Studies',
          description:
            'A selection of cybersecurity and VAPT engagements across financial, industrial, and enterprise sectors.',
        },
        certifications: {
          label: 'Certifications',
          title: 'Cybersecurity Expertise & Certifications',
          description:
            'Accredited qualifications that reinforce our security rigor and trusted delivery standards.',
        },
      }).map(([key, content]) => {
        const ar = SECTION_CONTENT_AR[key]
        return [
          key,
          {
            ...content,
            ...(ar
              ? {
                  labelAr: ar.label,
                  titleAr: ar.title,
                  descriptionAr: ar.description,
                }
              : {}),
          },
        ]
      }),
    ) as CmsStore['sectionContent'],
    ctaBanner: {
      title: 'Protect Your Business Today',
      titleAr: CTA_AR.title,
      description:
        'Request a consultation and our cybersecurity team will respond within one business day.',
      descriptionAr: CTA_AR.description,
      emailPlaceholder: 'Enter your email address',
      emailPlaceholderAr: CTA_AR.emailPlaceholder,
      buttonText: 'Request Consultation',
      buttonTextAr: CTA_AR.buttonText,
      secondaryButtonText: 'Chat on WhatsApp',
      secondaryButtonTextAr: CTA_AR.secondaryButtonText,
      secondaryButtonLink: 'https://wa.me/966563913902',
    },
    fieldStyles: {},
    hero: SEED_HERO,
    whyStats: SEED_WHY_STATS,
    divisions: SEED_DIVISIONS,
    services: SEED_SERVICES.map((service, index) =>
      applyServiceDetailExtras({
        ...service,
        status: 'active' as const,
        order: service.order ?? index + 1,
      }),
    ),
    projects: SEED_PROJECTS.map((project) => ({
      ...project,
      status: 'active' as const,
    })),
    team: SEED_TEAM,
    industries: [
      { _id: 'ind-1', title: 'Desalination & Water Treatment', icon: 'Droplets', order: 1, status: 'active' },
      { _id: 'ind-2', title: 'Oil & Gas', icon: 'Flame', order: 2, status: 'active' },
      { _id: 'ind-3', title: 'Construction & Infrastructure', icon: 'Building2', order: 3, status: 'active' },
      { _id: 'ind-4', title: 'Manufacturing & Smart Industries', icon: 'Factory', order: 4, status: 'active' },
      { _id: 'ind-5', title: 'Utilities & Energy', icon: 'Zap', order: 5, status: 'active' },
      { _id: 'ind-6', title: 'Environmental & Sustainability', icon: 'Leaf', order: 6, status: 'active' },
    ],
    certifications: [
      { _id: 'cert-1', name: 'Certified Ethical Hacker (CEH)', logoUrl: '/certifications/ceh.png', order: 1 },
      { _id: 'cert-2', name: 'Cisco Networking Academy', logoUrl: '/certifications/cisco-networking-academy.png', order: 2 },
      { _id: 'cert-3', name: 'Indian Cyber Crime Coordination Centre (I4C)', logoUrl: '/certifications/i4c.png', order: 3 },
      { _id: 'cert-4', name: 'IIFIS', logoUrl: '/certifications/iifis.png', order: 4 },
      { _id: 'cert-5', name: 'CQI | IRCA', logoUrl: '/certifications/cqi-irca.png', order: 5 },
      { _id: 'cert-6', name: 'Legal Desire', logoUrl: '/certifications/legal-desire.png', order: 6 },
      { _id: 'cert-7', name: 'Qualys', logoUrl: '/certifications/qualys.png', order: 7 },
      { _id: 'cert-8', name: 'TCM Security', logoUrl: '/certifications/tcm-security.png', order: 8 },
      { _id: 'cert-9', name: 'TÜV SÜD', logoUrl: '/certifications/tuv-sud.png', order: 9 },
      { _id: 'cert-10', name: 'UNDSS', logoUrl: '/certifications/undss.png', order: 10 },
      { _id: 'cert-11', name: 'U.S. Department of Homeland Security', logoUrl: '/certifications/dhs.png', order: 11 },
    ],
    values: [
      { _id: 'val-1', title: 'Real-World Testing', description: 'Simulated attacks that mirror actual threat actor techniques to find real vulnerabilities.', icon: 'Shield', order: 1 },
      { _id: 'val-2', title: 'Actionable Results', description: 'Prioritized findings with clear remediation guidance — not just theoretical reports.', icon: 'Target', order: 2 },
      { _id: 'val-3', title: 'Industry Expertise', description: 'Deep experience securing industrial, financial, and enterprise environments across Saudi Arabia.', icon: 'Award', order: 3 },
      { _id: 'val-4', title: 'Compliance Ready', description: 'Assessments aligned with NCA, ISO 27001, and international cybersecurity frameworks.', icon: 'CheckCircle2', order: 4 },
    ],
    pages: {
      about: SEED_ABOUT_PAGE,
      privacy: SEED_PRIVACY_PAGE,
      terms: SEED_TERMS_PAGE,
    },
    pageSeo: createDefaultPageSeo(),
    blogPosts: [
      {
        _id: 'blog-1',
        title: 'Cybersecurity Trends in Saudi Arabia 2026',
        slug: 'cybersecurity-trends-saudi-arabia-2026',
        excerpt: 'Key threats and security priorities for Saudi enterprises in the evolving threat landscape.',
        content: blocksToText(
          blocks(
            'Saudi Arabia continues to digitize rapidly across government, financial, and industrial sectors — making robust cybersecurity essential.',
            'Reliable Company helps organizations stay ahead with VAPT, cloud security assessments, and compliance support aligned with NCA requirements.',
          ),
        ),
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    careers: [
      {
        _id: 'career-1',
        title: 'Penetration Tester',
        department: 'VAPT',
        location: 'Riyadh',
        description: 'Conduct network and web application penetration tests for enterprise clients.',
        responsibilities: [
          'Perform VAPT assessments across network and web environments',
          'Document findings with proof-of-concept and remediation guidance',
          'Support retest and client reporting activities',
        ],
        status: 'active',
        order: 1,
      },
      {
        _id: 'career-2',
        title: 'Cloud Security Analyst',
        department: 'Cybersecurity Consulting',
        location: 'Jeddah',
        description: 'Assess AWS, Azure, and GCP environments for security misconfigurations.',
        status: 'active',
        order: 2,
      },
      {
        _id: 'career-3',
        title: 'ISO 27001 Consultant',
        department: 'Compliance',
        location: 'Dammam',
        description: 'Support ISO 27001 gap analysis, ISMS implementation, and audit readiness.',
        status: 'active',
        order: 3,
      },
    ],
    careerApplications: [],
    enquiries: [],
    campaigns: [
      {
        _id: 'campaign-darkweb',
        name: 'Free Dark Web Assessment',
        badge: 'Limited-Time Offer',
        badgeAr: 'عرض لفترة محدودة',
        title: 'Free Dark Web Assessment',
        titleAr: 'تقييم مجاني للويب المظلم',
        subtitle: 'For organizations in Saudi Arabia',
        subtitleAr: 'للمؤسسات في المملكة العربية السعودية',
        body: 'Find out if your credentials, customer data, or company records are already exposed on the dark web — before attackers use them. Claim your complimentary assessment today.',
        bodyAr:
          'اكتشف ما إذا كانت بيانات اعتمادك أو بيانات عملائك أو سجلات شركتك مكشوفة بالفعل على الويب المظلم — قبل أن يستغلها المهاجمون. احصل على تقييمك المجاني اليوم.',
        ctaText: 'Claim Free Assessment',
        ctaTextAr: 'احصل على التقييم المجاني',
        applyPagePath: '/dark-web-assessment',
        floatingLabel: 'FREE CAMPAIGN',
        floatingLabelAr: 'حملة مجانية',
        floatingText: 'Check if your domain appears in dark web assessment data',
        floatingTextAr: 'تحقق مما إذا كان نطاقك يظهر في بيانات تقييم الويب المظلم',
        showDelayMs: 2500,
        status: 'active',
        order: 1,
      },
    ],
    campaignApplications: [],
  }
}
