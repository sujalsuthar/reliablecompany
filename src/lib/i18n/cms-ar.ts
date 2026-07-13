/** Arabic fallbacks for CMS content — aligned with Reliable Company cybersecurity profile */

export const NAVBAR_AR = {
  consultationText: 'احصل على استشارة',
  mainLinks: [
    { label: 'الرئيسية' },
    { label: 'من نحن' },
    { label: 'الوظائف' },
    { label: 'اتصل بنا' },
  ],
  resourcesLinks: [
    { label: 'المدونة' },
    { label: 'دراسات الحالة' },
  ],
} as const

export const FOOTER_AR = {
  description:
    'خدمات أمن سيبراني متخصصة — تقييم الثغرات واختبار الاختراق (VAPT) وحماية التطبيقات والبنية التحتية في المملكة العربية السعودية.',
  serviceLinks: [
    { label: 'Web App Pen Testing' },
    { label: 'Dark Web Assessment' },
    { label: 'Dark Web Monitoring' },
    { label: 'Ransomware IR' },
  ],
  companyLinks: [
    { label: 'من نحن' },
    { label: 'مشاريعنا' },
    { label: 'الأقسام' },
    { label: 'الوظائف' },
    { label: 'اتصل بنا' },
  ],
  privacyLabel: 'سياسة الخصوصية',
  termsLabel: 'الشروط',
} as const

export const HERO_AR = {
  eyebrow: 'الأمن السيبراني واختبار الاختراق',
  headline: 'خدمات أمن سيبراني واختبار اختراق احترافية',
  highlightedWord: 'في المملكة العربية السعودية',
  subheadline:
    'تقدم شركة ريلايبل خدمات تقييم الثغرات واختبار الاختراق (VAPT) واختبار أمان تطبيقات الويب وتقييم أمن الشبكات واستشارات الأمن السيبراني للشركات في المملكة.',
  primaryButtonText: 'استكشف خدماتنا',
  secondaryButtonText: 'تواصل عبر واتساب',
  stats: [
    { label: 'سنوات خبرة مجتمعة' },
    { label: 'مشروع صناعي' },
    { label: 'عميل محمي' },
    { label: 'ثغرة تم معالجتها' },
  ],
} as const

export const SECTION_CONTENT_AR: Record<
  string,
  { label: string; title: string; description: string }
> = {
  blog: {
    label: 'المدونة',
    title: 'أحدث المقالات',
    description: 'أخبار الأمن السيبراني وتحليل التهديدات ورؤى من فريقنا.',
  },
  services: {
    label: 'خبراتنا',
    title: 'التميز في الأمن السيبراني واختبار الاختراق',
    description:
      'حماية تطبيقاتك وبنيتك التحتية من خلال اختبارات أمنية واقعية في المملكة العربية السعودية.',
  },
  campaigns: {
    label: 'الحملات',
    title: 'الحملات الأمنية الحالية',
    description: 'اكتشف الحملات النشطة مثل التقييم المجاني للويب المظلم وقدّم طلبك فورًا.',
  },
  whyUs: {
    label: 'لماذا ريلايبل',
    title: 'لماذا تختار شركة ريلايبل',
    description:
      'أكثر من 100 سنة خبرة مجتمعة، وأكثر من 300 عميل محمي، وأكثر من 30,000 ثغرة تم معالجتها.',
  },
  industries: {
    label: 'القطاعات',
    title: 'القطاعات التي نخدمها',
    description:
      'خدمات الأمن السيبراني واختبار الاختراق عبر التحلية والنفط والغاز والإنشاءات والتصنيع والمرافق.',
  },
  divisions: {
    label: 'الأقسام',
    title: 'قدراتنا الأساسية',
    description:
      'اختبار الاختراق (VAPT) واستشارات الأمن السيبراني — فريق أمني متكامل.',
  },
  projects: {
    label: 'المشاريع',
    title: 'دراسات حالة مميزة',
    description:
      'مجموعة مختارة من مشاريع الأمن السيبراني واختبار الاختراق في القطاعات المالية والصناعية.',
  },
  certifications: {
    label: 'الشهادات',
    title: 'خبرات وشهادات الأمن السيبراني',
    description:
      'مؤهلات معتمدة تعزز صرامتنا الأمنية ومعايير التسليم الموثوقة.',
  },
}

export const CTA_AR = {
  title: 'احمِ أعمالك اليوم',
  description: 'اطلب استشارة وسيرد فريق الأمن السيبراني خلال يوم عمل واحد.',
  emailPlaceholder: 'أدخل بريدك الإلكتروني',
  buttonText: 'طلب استشارة',
  secondaryButtonText: 'تواصل عبر واتساب',
} as const

export const WHY_STAT_LABELS_AR: Record<string, string> = {
  'Years Combined Experience': 'سنوات خبرة مجتمعة',
  'Industrial Projects Managed': 'مشروع صناعي',
  'Clients Secured': 'عميل محمي',
  'Vulnerabilities Remediated': 'ثغرة تم معالجتها',
  'Projects Delivered': 'مشروع منجز',
  'Clients Served': 'عميل',
  'Engineering Divisions': 'أقسام هندسية',
  'Years Experience': 'سنوات الخبرة',
  'Plant Availability': 'توفر المنشآت',
  'Core Service Areas': 'مجالات خدمة أساسية',
  'Founded in UAE': 'تأسست في الإمارات',
  'Expanded to KSA': 'توسعنا في السعودية',
}

export {
  DIVISION_AR,
  SERVICE_SHORT_AR,
  SERVICE_TITLE_AR,
} from '@/lib/service-catalog'

export const INDUSTRY_AR: Record<string, string> = {
  'Desalination & Water Treatment': 'التحلية ومعالجة المياه',
  'Oil & Gas': 'النفط والغاز',
  'Construction & Infrastructure': 'الإنشاءات والبنية التحتية',
  'Manufacturing & Smart Industries': 'التصنيع والصناعات الذكية',
  'Utilities & Energy': 'المرافق والطاقة',
  'Environmental & Sustainability': 'البيئة والاستدامة',
  Desalination: 'التحلية',
  Construction: 'الإنشاءات',
  Engineering: 'الهندسة',
  Manufacturing: 'التصنيع',
}

export const CERT_AR: Record<string, string> = {
  'Certified Ethical Hacker (CEH)': 'القرصان الأخلاقي المعتمد (CEH)',
  'Cisco Networking Academy': 'أكاديمية سيسكو للشبكات',
  'Indian Cyber Crime Coordination Centre (I4C)': 'المركز الهندي لتنسيق الجرائم السيبرانية (I4C)',
  IIFIS: 'IIFIS',
  'CQI | IRCA': 'CQI | IRCA',
  'Legal Desire': 'Legal Desire',
  Qualys: 'Qualys',
  'TCM Security': 'TCM Security',
  'TÜV SÜD': 'TÜV SÜD',
  UNDSS: 'UNDSS',
  'U.S. Department of Homeland Security': 'وزارة الأمن الداخلي الأمريكية',
}

export const VALUE_AR: Record<string, { title: string; description: string }> = {
  'Real-World Testing': {
    title: 'اختبار واقعي',
    description: 'هجمات محاكاة تعكس تقنيات المهاجمين الفعلية لاكتشاف ثغرات حقيقية.',
  },
  'Actionable Results': {
    title: 'نتائج قابلة للتنفيذ',
    description: 'نتائج مرتبة حسب الأولوية مع إرشادات معالجة واضحة.',
  },
  'Industry Expertise': {
    title: 'خبرة صناعية',
    description: 'خبرة عميقة في تأمين البيئات الصناعية والمالية والمؤسسية في السعودية.',
  },
  'Compliance Ready': {
    title: 'جاهزية للامتثال',
    description: 'تقييمات متوافقة مع NCA وISO 27001 والأطر الدولية للأمن السيبراني.',
  },
}

export const GLOBAL_AR = {
  siteName: 'شركة ريلايبل',
  tagline:
    'خدمات أمن سيبراني واختبار اختراق احترافية — حماية التطبيقات والبنية التحتية في المملكة.',
  copyrightText: '© 2026 شركة ريلايبل. جميع الحقوق محفوظة.',
  address:
    '8648، شارع الأمير متعب، حي العزيزية، جدة، المملكة العربية السعودية. ص.ب: 23342',
} as const

export const FOOTER_DIVISION_AR = 'قسم من شركة ريلايبل'
export const FOOTER_CONTACT_AR = 'اتصل بنا'

export const ABOUT_PAGE_AR = {
  title: 'من نحن',
  content: [
    'شركة ريلايبل مجموعة متخصصة في خدمات الأمن السيبراني تقدم تقييم الثغرات واختبار الاختراق (VAPT) واختبار أمان تطبيقات الويب وتقييم أمن الشبكات واستشارات الأمن السيبراني في المملكة العربية السعودية. بدأنا عملياتنا في 2016 من الإمارات وفي 2023 وسّعنا أعمالنا في المملكة.',
    'يتمتع فريق الإدارة لدينا بأكثر من 100 سنة خبرة مجتمعة في تأمين البيئات الصناعية والمؤسسية عبر التحلية والنفط والغاز والبنية التحتية والتصنيع. الشغف بالجودة ومنهجيات الأمن المبتكرة والخبرة العملية في الاختبار هي ما يميز فريقنا.',
    'ملتزم محترفو الأمن السيبراني المعتمدون لدينا بتحديد الثغرات قبل استغلالها — حماية التطبيقات والشبكات وبيئات السحابة والأنظمة الصناعية باختبارات صارمة وإرشادات معالجة عملية.',
  ],
}
