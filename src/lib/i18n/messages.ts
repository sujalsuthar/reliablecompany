import type { Locale } from '@/lib/i18n/config'
import { buildServiceMenu, CONTACT_SERVICE_OPTIONS } from '@/lib/service-catalog'

export type Messages = typeof en

const en = {
  nav: {
    services: 'Services',
    resources: 'Resources',
    switchToArabic: 'عربي',
    switchToEnglish: 'English',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    viewAllServices: 'View all services',
    megaTitle: 'CYBER SECURITY',
    megaEyebrow: 'Reliable Company',
    megaTagline: 'DATA SAFETY • PRIVACY • PROTECTION • ENCRYPTION',
  },
  footer: {
    services: 'Services',
    company: 'Company',
    offices: 'Offices',
    contact: 'Contact',
    legalNotice:
      'Registered in the Kingdom of Saudi Arabia. Personal data processed in accordance with the Saudi Personal Data Protection Law (PDPL).',
  },
  legal: {
    pdplConsent:
      'I agree to the collection and processing of my personal data in accordance with the',
    privacyLink: 'Privacy Policy',
    pdplSuffix: 'and the Saudi Personal Data Protection Law (PDPL).',
    consentRequired: 'You must agree to data processing to continue.',
  },
  cookie: {
    text: 'We use essential cookies for language preference and site functionality, in accordance with the Saudi Personal Data Protection Law (PDPL). Please review our',
    privacy: 'Privacy Policy',
    and: 'and',
    terms: 'Terms of Service',
    accept: 'Accept',
    reject: 'Reject',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Reach out to discuss your cybersecurity needs. Our team is ready to help.',
    home: 'Home',
    heading: 'Secure Your Business',
    subheading:
      'Share your security requirements and our cybersecurity team will respond within one business day.',
    officesTitle: 'Our Offices',
    officesIntro:
      'Visit one of our offices across the Kingdom or send us a message — we typically respond within one business day.',
    sendMessage: 'Send Us a Message',
    mapTitle: 'Our Location',
    openInMaps: 'Open in Google Maps',
    mapFallback: 'View location on Google Maps',
    businessHours: {
      title: 'Business Hours',
      weekday: 'Sunday - Thursday: 8:00 AM - 5:00 PM',
      weekend: 'Friday - Saturday: Closed',
    },
    form: {
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      companyName: 'Company Name',
      city: 'City',
      service: 'Service of Interest',
      message: 'Message',
      selectCity: 'Select a city',
      selectService: 'Select a service',
      optional: 'optional',
      placeholders: {
        fullName: 'Enter your full name',
        email: 'Enter your email',
        phone: 'Enter your phone number',
        companyName: 'Your company name (optional)',
        message: 'Write your message here...',
      },
      cities: {
        Jeddah: 'Jeddah',
        Riyadh: 'Riyadh',
        Dammam: 'Dammam',
        Mecca: 'Mecca',
        Medina: 'Medina',
        Khobar: 'Khobar',
        Other: 'Other',
      },
      services: Object.fromEntries(
        CONTACT_SERVICE_OPTIONS.map((opt) => [opt.key, opt.label]),
      ) as {
        offensive: string
        grc: string
        incident: string
        assessments: string
        other: string
      },
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent successfully.',
      error: 'Something went wrong. Please try again.',
      errors: {
        fullName: 'Full name is required.',
        emailRequired: 'Email is required.',
        emailInvalid: 'Please enter a valid email address.',
        phone: 'Phone number is required.',
        city: 'Please select a city.',
        service: 'Please select a service.',
        messageRequired: 'Message is required.',
      messageShort: 'Message must be at least 10 characters.',
      consent: 'You must agree to data processing.',
    },
  },
  },
  pages: {
    about: {
      title: 'About Us',
      description: 'Learn about Reliable Company — cybersecurity and VAPT specialists.',
      home: 'Home',
    },
    blog: {
      title: 'Blog',
      description: 'Cybersecurity insights and company updates.',
      home: 'Home',
      readMore: 'Read more',
    },
    careers: {
      title: 'Careers',
      description: 'Join Reliable Company across Saudi Arabia.',
      home: 'Home',
      apply: 'Apply now',
    },
    projects: {
      title: 'Projects',
      description: 'Explore our portfolio of cybersecurity case studies.',
      home: 'Home',
    },
    services: {
      title: 'Services',
      description: 'Professional VAPT and cybersecurity consulting services.',
      home: 'Home',
    },
    divisions: {
      title: 'Divisions',
      description: 'Our three core capability pillars.',
      home: 'Home',
    },
    privacy: { title: 'Privacy Policy', home: 'Home' },
    terms: { title: 'Terms of Service', home: 'Home' },
  },
  common: {
    home: 'Home',
    learnMore: 'Learn more',
    viewProject: 'View project',
    viewAll: 'View all',
    services: 'Services',
    projects: 'Projects',
    blog: 'Blog',
    careers: 'Careers',
    about: 'About',
    divisions: 'Divisions',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    comingSoon: 'Full description coming soon.',
    backHome: 'Back to home',
  },
  pageHero: {
    badge: 'Reliable Company',
  },
  aboutPage: {
    heroTitle: 'Who We Are',
    heroDescription:
      'A specialized cybersecurity services group providing VAPT, web application security testing, and consulting across Saudi Arabia since 2016.',
    team: 'Our Team',
    values: 'Our Values',
    certifications: 'Certifications & Qualifications',
    imageAlt: 'Reliable Company projects and expertise',
    fallback:
      'Reliable Company is your trusted partner for cybersecurity and VAPT across industrial and enterprise sectors in Saudi Arabia.',
  },
  sections: {
    viewAllServices: 'View all services',
    viewAllProjects: 'View all projects',
    viewAllPosts: 'View all posts',
  },
  servicePage: {
    heroTitle: 'Our Expertise',
    heroDescription:
      'Offensive Security, GRC & Compliance, Incident Response, and Security Assessments — comprehensive cybersecurity services across Saudi Arabia.',
    empty: 'Services will appear here once added in the CMS.',
  },
  serviceDetail: {
    ctaTitle: 'Ready to secure your environment?',
    ctaDescription:
      'Speak with our cybersecurity team about protecting your applications and infrastructure.',
    ctaButton: 'Request a Consultation',
    viewAllServices: 'View All Services',
    related: 'Related Services',
    servicesLabel: 'Services',
    serviceContentLabel: 'Service Content',
    benefitsLabel: 'Benefits',
    processLabel: 'Process',
    faqsLabel: 'FAQs',
    keyBenefitsLabel: 'Key Benefits',
    defaultOverviewTitle: 'Our {service} Services',
    defaultBenefitsTitle: 'Why Choose {service}',
    defaultProcessTitle: 'Our Process',
    defaultFaqsTitle: 'Frequently Asked Questions',
  },
  projectPage: {
    heroTitle: 'Our Projects',
    heroDescription:
      'A portfolio of cybersecurity and VAPT engagements across financial, oil & gas, and enterprise sectors.',
    empty: 'Projects will appear here once added in the CMS.',
    noResults: 'No projects found',
    noResultsHint: 'Try adjusting your filters or search query.',
  },
  projectDetail: {
    details: 'Project Details',
    location: 'Location',
    completed: 'Completed',
    division: 'Division',
    tags: 'Tags',
  },
  divisionsPage: {
    heroTitle: 'Our Core Capabilities',
    heroDescription:
      'VAPT & Penetration Testing and Cybersecurity Consulting — two integrated pillars for comprehensive security.',
    expertise: 'Four core cybersecurity pillars',
    expertiseDesc: 'Offensive Security, GRC, Incident Response, and Security Assessments under one team.',
  },
  blogPage: {
    heroTitle: 'Blog',
    heroDescription: 'Insights and updates from our cybersecurity teams across Saudi Arabia.',
    empty: 'No blog posts published yet.',
  },
  careersPage: {
    heroTitle: 'Careers',
    heroDescription:
      'Build your career with Reliable Company — cybersecurity and penetration testing teams across the Kingdom.',
    empty: 'No open positions at the moment. Check back soon.',
    apply: 'Apply now',
  },
  careerApply: {
    submitFor: 'Submit your application for',
    responsibilities: 'Key responsibilities',
    timeline: 'Timeline',
    timelineHint: 'Quick review after submission',
    emailLabel: 'Email',
    locationLabel: 'Location',
    formLabel: 'Application form',
    formTitle: 'Fill in your details and share your CV',
    fullName: 'Full name',
    fullNamePlaceholder: 'Enter your full name',
    email: 'Email',
    emailPlaceholder: 'your.email@example.com',
    phone: 'Phone',
    phonePlaceholder: '+966 XX XXX XXXX',
    city: 'City',
    cityPlaceholder: 'Current city',
    coverLetter: 'Cover letter',
    coverLetterPlaceholder: 'Tell us why you are the right fit for this opportunity',
    resume: 'Upload CV / Resume',
    resumeHint: 'Choose PDF, DOC, or DOCX file',
    resumeTypes: 'PDF, DOC, or DOCX only — max 10 MB',
    browse: 'Browse',
    consent:
      'I agree to the storage and processing of my data for hiring purposes in accordance with the Privacy Policy and Saudi PDPL.',
    submit: 'Submit application',
    backToCareers: 'Back to careers',
    successTitle: 'Application submitted',
    successMessage:
      'Thank you for applying. Our team will review your application and contact you if your profile matches the role.',
    errors: {
      fullName: 'Full name is required.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Please enter a valid email address.',
      phone: 'Phone is required.',
      coverLetter: 'Cover letter must be at least 10 characters.',
      resume: 'Please upload your resume (PDF, DOC, or DOCX).',
      consent: 'You must agree to data processing.',
      submitFailed: 'Could not submit application. Please try again.',
      fixFields: 'Please fix the highlighted fields below.',
    },
  },
  ctaForm: {
    emailInvalid: 'Please enter a valid email address.',
    success: "Thank you! We'll be in touch soon.",
  },
  projectFilter: {
    all: 'All',
    civil: 'Offensive',
    electrical: 'GRC',
    mechanical: 'Incident',
    search: 'Search by title...',
  },
  serviceMenu: buildServiceMenu('en'),
}

const ar: Messages = {
  nav: {
    services: 'الخدمات',
    resources: 'الموارد',
    switchToArabic: 'عربي',
    switchToEnglish: 'English',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    viewAllServices: 'عرض جميع الخدمات',
    megaTitle: 'الأمن السيبراني',
    megaEyebrow: 'شركة ريلايبل',
    megaTagline: 'سلامة البيانات • الخصوصية • الحماية • التشفير',
  },
  footer: {
    services: 'الخدمات',
    company: 'الشركة',
    offices: 'المكاتب',
    contact: 'اتصل بنا',
    legalNotice:
      'مسجلة في المملكة العربية السعودية. تُعالج البيانات الشخصية وفق نظام حماية البيانات الشخصية (PDPL).',
  },
  legal: {
    pdplConsent: 'أوافق على جمع ومعالجة بياناتي الشخصية وفق',
    privacyLink: 'سياسة الخصوصية',
    pdplSuffix: 'ونظام حماية البيانات الشخصية السعودي (PDPL).',
    consentRequired: 'يجب الموافقة على معالجة البيانات للمتابعة.',
  },
  cookie: {
    text: 'نستخدم ملفات تعريف ارتباط أساسية لتفضيل اللغة وتشغيل الموقع، وفق نظام حماية البيانات الشخصية (PDPL). يرجى مراجعة',
    privacy: 'سياسة الخصوصية',
    and: 'و',
    terms: 'شروط الخدمة',
    accept: 'موافق',
    reject: 'رفض',
  },
  contact: {
    title: 'اتصل بنا',
    description: 'تواصل معنا لمناقشة احتياجاتك الأمنية. فريقنا جاهز لمساعدتك.',
    home: 'الرئيسية',
    heading: 'احمِ أعمالك',
    subheading:
      'شاركنا متطلباتك الأمنية وسيرد فريق الأمن السيبراني خلال يوم عمل واحد.',
    officesTitle: 'مكاتبنا',
    officesIntro:
      'زر أحد مكاتبنا في المملكة أو أرسل لنا رسالة — نرد عادة خلال يوم عمل واحد.',
    sendMessage: 'أرسل لنا رسالة',
    mapTitle: 'موقعنا',
    openInMaps: 'فتح في خرائط Google',
    mapFallback: 'عرض الموقع على خرائط Google',
    businessHours: {
      title: 'ساعات العمل',
      weekday: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
      weekend: 'الجمعة - السبت: مغلق',
    },
    form: {
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      companyName: 'اسم الشركة',
      city: 'المدينة',
      service: 'الخدمة المطلوبة',
      message: 'الرسالة',
      selectCity: 'اختر المدينة',
      selectService: 'اختر الخدمة',
      optional: 'اختياري',
      placeholders: {
        fullName: 'أدخل اسمك الكامل',
        email: 'أدخل بريدك الإلكتروني',
        phone: 'أدخل رقم هاتفك',
        companyName: 'اسم شركتك (اختياري)',
        message: 'اكتب رسالتك هنا...',
      },
      cities: {
        Jeddah: 'جدة',
        Riyadh: 'الرياض',
        Dammam: 'الدمام',
        Mecca: 'مكة',
        Medina: 'المدينة',
        Khobar: 'الخبر',
        Other: 'أخرى',
      },
      services: Object.fromEntries(
        CONTACT_SERVICE_OPTIONS.map((opt) => [opt.key, opt.labelAr]),
      ) as {
        offensive: string
        grc: string
        incident: string
        assessments: string
        other: string
      },
      submit: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      success: 'شكراً لك! تم إرسال رسالتك بنجاح.',
      error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      errors: {
        fullName: 'الاسم الكامل مطلوب.',
        emailRequired: 'البريد الإلكتروني مطلوب.',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صالح.',
        phone: 'رقم الهاتف مطلوب.',
        city: 'يرجى اختيار المدينة.',
        service: 'يرجى اختيار الخدمة.',
        messageRequired: 'الرسالة مطلوبة.',
      messageShort: 'يجب أن تكون الرسالة 10 أحرف على الأقل.',
      consent: 'يجب الموافقة على معالجة البيانات.',
    },
  },
  },
  pages: {
    about: {
      title: 'من نحن',
      description: 'تعرف على شركة ريلايبل — إدارة المشاريع والهندسة والأمن السيبراني.',
      home: 'الرئيسية',
    },
    blog: {
      title: 'المدونة',
      description: 'رؤى هندسية وتحديثات الشركة.',
      home: 'الرئيسية',
      readMore: 'اقرأ المزيد',
    },
    careers: {
      title: 'الوظائف',
      description: 'انضم إلى شركة ريلايبل في جميع أنحاء المملكة.',
      home: 'الرئيسية',
      apply: 'قدّم الآن',
    },
    projects: {
      title: 'المشاريع',
      description: 'استكشف محفظة مشاريعنا الهندسية.',
      home: 'الرئيسية',
    },
    services: {
      title: 'الخدمات',
      description: 'خدمات PMC والهندسة والأمن السيبراني المتكاملة.',
      home: 'الرئيسية',
    },
    divisions: {
      title: 'الأقسام',
      description: 'ركائزنا الثلاث الأساسية للقدرات.',
      home: 'الرئيسية',
    },
    privacy: { title: 'سياسة الخصوصية', home: 'الرئيسية' },
    terms: { title: 'الشروط والأحكام', home: 'الرئيسية' },
  },
  common: {
    home: 'الرئيسية',
    learnMore: 'اعرف المزيد',
    viewProject: 'عرض المشروع',
    viewAll: 'عرض الكل',
    services: 'الخدمات',
    projects: 'المشاريع',
    blog: 'المدونة',
    careers: 'الوظائف',
    about: 'من نحن',
    divisions: 'الأقسام',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
    comingSoon: 'الوصف الكامل قريباً.',
    backHome: 'العودة للرئيسية',
  },
  pageHero: {
    badge: 'شركة ريلايبل',
  },
  aboutPage: {
    heroTitle: 'من نحن',
    heroDescription:
      'مجموعة متخصصة في استشارات إدارة المشاريع المتكاملة والهندسة وخدمات الأمن السيبراني، تعمل في الإمارات والسعودية منذ 2016.',
    team: 'فريقنا',
    values: 'قيمنا',
    certifications: 'الشهادات والمؤهلات',
    imageAlt: 'مشاريع وخبرات شركة ريلايبل',
    fallback:
      'شركة ريلايبل شريكك الموثوق في إدارة المشاريع والهندسة والأمن السيبراني عبر القطاعات الصناعية والبنية التحتية في المملكة.',
  },
  sections: {
    viewAllServices: 'عرض جميع الخدمات',
    viewAllProjects: 'عرض جميع المشاريع',
    viewAllPosts: 'عرض جميع المقالات',
  },
  servicePage: {
    heroTitle: 'خبراتنا',
    heroDescription:
      'استشارات إدارة المشاريع والهندسة والأمن السيبراني — من FEED وإدارة التصميم إلى الإنشاءات والتشغيل التجريبي والعمليات والأمن الرقمي.',
    empty: 'ستظهر الخدمات هنا عند إضافتها في نظام إدارة المحتوى.',
  },
  serviceDetail: {
    ctaTitle: 'هل أنت مستعد لبدء مشروعك؟',
    ctaDescription: 'تحدث مع فريقنا الهندسي حول كيفية دعم مشروعك القادم.',
    ctaButton: 'طلب استشارة',
    viewAllServices: 'عرض جميع الخدمات',
    related: 'خدمات ذات صلة',
    servicesLabel: 'الخدمات',
    serviceContentLabel: 'محتوى الخدمة',
    benefitsLabel: 'الفوائد',
    processLabel: 'المنهجية',
    faqsLabel: 'الأسئلة الشائعة',
    keyBenefitsLabel: 'الفوائد الرئيسية',
    defaultOverviewTitle: 'خدمات {service} لدينا',
    defaultBenefitsTitle: 'لماذا تختار {service}',
    defaultProcessTitle: 'منهجيتنا',
    defaultFaqsTitle: 'الأسئلة الشائعة',
  },
  projectPage: {
    heroTitle: 'مشاريعنا',
    heroDescription:
      'محفظة مشاريع في إدارة المشاريع والهندسة عبر التحلية والنفط والغاز والبنية التحتية المائية والقطاعات الصناعية.',
    empty: 'ستظهر المشاريع هنا عند إضافتها في نظام إدارة المحتوى.',
    noResults: 'لم يتم العثور على مشاريع',
    noResultsHint: 'جرّب تعديل عوامل التصفية أو استعلام البحث.',
  },
  projectDetail: {
    details: 'تفاصيل المشروع',
    location: 'الموقع',
    completed: 'تاريخ الإنجاز',
    division: 'القسم',
    tags: 'الوسوم',
  },
  divisionsPage: {
    heroTitle: 'قدراتنا الأساسية',
    heroDescription:
      'استشارات إدارة المشاريع، والخدمات الهندسية، والأمن السيبراني والرقمي — ثلاث ركائز متكاملة لتسليم المشاريع.',
    expertise: 'خبرة متعددة التخصصات',
    expertiseDesc: 'فرق متكاملة في PMC والهندسة والأمن السيبراني للمشاريع الصناعية المعقدة.',
  },
  blogPage: {
    heroTitle: 'المدونة',
    heroDescription: 'رؤى وتحديثات من فرقنا الهندسية في جميع أنحاء المملكة.',
    empty: 'لا توجد مقالات منشورة بعد.',
  },
  careersPage: {
    heroTitle: 'الوظائف',
    heroDescription:
      'ابنِ مسيرتك المهنية مع شركة ريلايبل — فرق إدارة المشاريع والهندسة في جميع أنحاء المملكة.',
    empty: 'لا توجد وظائف شاغرة حالياً. تحقق لاحقاً.',
    apply: 'قدّم الآن',
  },
  careerApply: {
    submitFor: 'قدّم طلبك لوظيفة',
    responsibilities: 'المسؤوليات الرئيسية',
    timeline: 'الجدول الزمني',
    timelineHint: 'مراجعة سريعة بعد التقديم',
    emailLabel: 'البريد الإلكتروني',
    locationLabel: 'الموقع',
    formLabel: 'نموذج التقديم',
    formTitle: 'أدخل بياناتك وارفع سيرتك الذاتية',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'your.email@example.com',
    phone: 'الهاتف',
    phonePlaceholder: '+966 XX XXX XXXX',
    city: 'المدينة',
    cityPlaceholder: 'مدينتك الحالية',
    coverLetter: 'خطاب التقديم',
    coverLetterPlaceholder: 'أخبرنا لماذا أنت المناسب لهذه الفرصة',
    resume: 'رفع السيرة الذاتية',
    resumeHint: 'اختر ملف PDF أو DOC أو DOCX',
    resumeTypes: 'PDF أو DOC أو DOCX فقط — بحد أقصى 10 ميجابايت',
    browse: 'تصفح',
    consent: 'أوافق على تخزين ومعالجة بياناتي لأغراض التوظيف وفق سياسة الخصوصية ونظام PDPL السعودي.',
    submit: 'إرسال الطلب',
    backToCareers: 'العودة للوظائف',
    successTitle: 'تم إرسال الطلب',
    successMessage:
      'شكراً لتقديمك. سيقوم فريقنا بمراجعة طلبك والتواصل معك إذا كان ملفك مناسباً للوظيفة.',
    errors: {
      fullName: 'الاسم الكامل مطلوب.',
      emailRequired: 'البريد الإلكتروني مطلوب.',
      emailInvalid: 'يرجى إدخال بريد إلكتروني صالح.',
      phone: 'رقم الهاتف مطلوب.',
      coverLetter: 'يجب أن يكون خطاب التقديم 10 أحرف على الأقل.',
      resume: 'يرجى رفع سيرتك الذاتية (PDF أو DOC أو DOCX).',
      consent: 'يجب الموافقة على معالجة البيانات.',
      submitFailed: 'تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.',
      fixFields: 'يرجى تصحيح الحقول المميزة أدناه.',
    },
  },
  ctaForm: {
    emailInvalid: 'يرجى إدخال بريد إلكتروني صالح.',
    success: 'شكراً لك! سنتواصل معك قريباً.',
  },
  projectFilter: {
    all: 'الكل',
    civil: 'هجومي',
    electrical: 'GRC',
    mechanical: 'حوادث',
    search: 'ابحث بالعنوان...',
  },
  serviceMenu: buildServiceMenu('ar'),
}

const catalog: Record<Locale, Messages> = { en, ar }

export function getMessages(locale: Locale): Messages {
  return catalog[locale] ?? en
}

export function formatDate(date: string | Date, locale: Locale): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return value.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
