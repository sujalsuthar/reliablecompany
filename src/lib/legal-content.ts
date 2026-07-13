import type { PortableTextBlock } from '@portabletext/types'

function block(text: string, key: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
  }
}

function blocks(...paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, i) => block(text, `b${i}`))
}

export const PRIVACY_POLICY_EN = blocks(
  'Reliable Company ("we", "our", or "us") is committed to protecting your personal data in accordance with the Kingdom of Saudi Arabia Personal Data Protection Law (PDPL) and its implementing regulations.',
  'Data Controller: Reliable Company, 8648 Prince Muteb Street, Al Aziziyah District, Jeddah, Saudi Arabia. Contact: info@reliablecompany.sa | +966 56 391 3902.',
  'Personal Data We Collect: When you use our website or submit forms, we may collect your name, work email, phone number, company name, city, job application details, resume files, company domain, and any message you provide. We also collect technical data such as IP address, browser type, and cookies necessary for site functionality.',
  'Lawful Basis & Purpose: We process personal data based on your consent, to respond to enquiries, deliver cybersecurity services, manage job applications, fulfil campaign requests (such as free dark web assessments), comply with legal obligations, and protect our legitimate business interests.',
  'Data Retention: Enquiry and application data is retained only as long as needed to respond, deliver services, or meet legal requirements — typically up to 24 months unless a longer period is required by law or you request deletion sooner.',
  'Your Rights Under PDPL: You have the right to access, correct, update, or request deletion of your personal data, withdraw consent, and lodge a complaint with the Saudi Data & AI Authority (SDAIA). To exercise these rights, contact us at info@reliablecompany.sa.',
  'Data Sharing: We do not sell personal data. We may share data with trusted service providers (hosting, email, WhatsApp notifications) solely to operate our website and respond to you, or when required by Saudi law or competent authorities.',
  'Cross-Border Transfers: If data is transferred outside Saudi Arabia, we ensure appropriate safeguards consistent with PDPL requirements.',
  'Security: We apply technical and organisational measures including access controls, encrypted connections (HTTPS), and secure storage to protect personal data.',
  'Cookies: We use essential cookies for language preference and site functionality. See our cookie notice for details. Non-essential cookies require your consent.',
  'Children: Our services are directed at businesses and professionals. We do not knowingly collect data from children under 18.',
  'Updates: We may update this policy to reflect legal or operational changes. The latest version is always published on this page. Last updated: March 2026.',
)

export const PRIVACY_POLICY_AR = blocks(
  'تلتزم شركة ريلايبل ("نحن" أو "لنا") بحماية بياناتك الشخصية وفقًا لنظام حماية البيانات الشخصية في المملكة العربية السعودية (PDPL) ولائحته التنفيذية.',
  'مسؤول البيانات: شركة ريلايبل، 8648 شارع الأمير متعب، حي العزيزية، جدة، المملكة العربية السعودية. للتواصل: info@reliablecompany.sa | +966 56 391 3902.',
  'البيانات الشخصية التي نجمعها: عند استخدام موقعنا أو إرسال النماذج، قد نجمع اسمك وبريدك الإلكتروني ورقم هاتفك واسم الشركة والمدينة وتفاصيل طلبات التوظيف والسيرة الذاتية ونطاق الشركة وأي رسالة تقدمها. كما نجمع بيانات تقنية مثل عنوان IP ونوع المتصفح وملفات تعريف الارتباط الضرورية لتشغيل الموقع.',
  'الأساس النظامي والغرض: نعالج البيانات الشخصية بناءً على موافقتك، للرد على الاستفسارات، وتقديم خدمات الأمن السيبراني، وإدارة طلبات التوظيف، وتنفيذ طلبات الحملات (مثل تقييم الويب المظلم المجاني)، والامتثال للالتزامات القانونية، وحماية مصالحنا التجارية المشروعة.',
  'الاحتفاظ بالبيانات: نحتفظ ببيانات الاستفسارات والطلبات فقط للمدة اللازمة للرد أو تقديم الخدمات أو الوفاء بالمتطلبات القانونية — عادةً حتى 24 شهرًا ما لم يتطلب النظام فترة أطول أو تطلب الحذف قبل ذلك.',
  'حقوقك بموجب PDPL: يحق لك الوصول إلى بياناتك الشخصية وتصحيحها وتحديثها أو طلب حذفها، وسحب الموافقة، وتقديم شكوى إلى الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا). لممارسة هذه الحقوق، تواصل معنا على info@reliablecompany.sa.',
  'مشاركة البيانات: لا نبيع البيانات الشخصية. قد نشارك البيانات مع مزودي خدمات موثوقين (الاستضافة، البريد الإلكتروني، إشعارات واتساب) لتشغيل الموقع والرد عليك، أو عندما يتطلب النظام السعودي ذلك.',
  'النقل عبر الحدود: إذا نُقلت البيانات خارج المملكة، نضمن ضمانات مناسبة وفق متطلبات PDPL.',
  'الأمن: نطبق إجراءات تقنية وتنظيمية تشمل ضوابط الوصول والاتصالات المشفرة (HTTPS) والتخزين الآمن.',
  'ملفات تعريف الارتباط: نستخدم ملفات تعريف ارتباط أساسية لتفضيل اللغة وتشغيل الموقع. راجع إشعار ملفات تعريف الارتباط للتفاصيل.',
  'الأطفال: خدماتنا موجهة للشركات والمهنيين. لا نجمع عن قصد بيانات من دون سن 18.',
  'التحديثات: قد نحدّث هذه السياسة لتعكس التغييرات القانونية أو التشغيلية. تُنشر أحدث نسخة دائمًا على هذه الصفحة. آخر تحديث: مارس 2026.',
)

export const TERMS_OF_SERVICE_EN = blocks(
  'By accessing and using the Reliable Company website (reliablecompany.sa), you agree to these Terms of Service. If you do not agree, please do not use this website.',
  'Services: Reliable Company provides cybersecurity services including VAPT, security assessments, compliance support, incident response, and related consulting in the Kingdom of Saudi Arabia. Specific scope, deliverables, and fees are defined in separate written agreements or statements of work.',
  'No Professional Guarantee via Website: Information on this website is for general reference only. It does not constitute legal, regulatory, or technical advice. Security assessments and reports are provided under formal engagement terms.',
  'Intellectual Property: All website content, branding, methodologies, and materials are owned by Reliable Company or its licensors and protected under applicable Saudi and international intellectual property laws. You may not copy, reproduce, or redistribute content without written permission.',
  'User Submissions: By submitting forms (contact, careers, campaigns), you confirm the information is accurate and you have authority to provide it. You grant us permission to process submitted data as described in our Privacy Policy.',
  'Prohibited Use: You must not use this website for unlawful purposes, attempt unauthorised access, transmit malware, scrape content without permission, or misuse our services in violation of Saudi cybercrime laws or National Cybersecurity Authority (NCA) requirements.',
  'Limitation of Liability: To the fullest extent permitted by Saudi law, Reliable Company is not liable for indirect, incidental, or consequential damages arising from use of this website. Our liability for direct damages is limited to the amount paid for the specific service giving rise to the claim, if any.',
  'Governing Law & Jurisdiction: These terms are governed by the laws of the Kingdom of Saudi Arabia. Disputes shall be subject to the exclusive jurisdiction of the competent courts in Jeddah, Saudi Arabia, unless mandatory law provides otherwise.',
  'Modifications: We may update these terms at any time. Continued use after changes constitutes acceptance. Material changes will be reflected on this page.',
  'Contact: Reliable Company, Jeddah, Saudi Arabia. Email: info@reliablecompany.sa | Phone: +966 56 391 3902.',
)

export const TERMS_OF_SERVICE_AR = blocks(
  'باستخدامك لموقع شركة ريلايبل (reliablecompany.sa)، فإنك توافق على شروط الخدمة هذه. إذا لم توافق، يرجى عدم استخدام الموقع.',
  'الخدمات: تقدم شركة ريلايبل خدمات الأمن السيبراني بما في ذلك اختبار الاختراق والتقييمات الأمنية ودعم الامتثال والاستجابة للحوادث والاستشارات ذات الصلة في المملكة العربية السعودية. يُحدد النطاق والمخرجات والرسوم في اتفاقيات مكتوبة منفصلة.',
  'لا ضمان مهني عبر الموقع: المعلومات على هذا الموقع للمرجع العام فقط ولا تشكل استشارة قانونية أو تنظيمية أو تقنية. تُقدم التقييمات والتقارير الأمنية بموجب شروط التعاقد الرسمية.',
  'الملكية الفكرية: جميع محتويات الموقع والعلامة التجارية والمنهجيات مملوكة لشركة ريلايبل أو مرخصيها ومحمية بموجب أنظمة الملكية الفكرية المعمول بها في المملكة.',
  'إرسالات المستخدم: بإرسال النماذج (اتصل بنا، الوظائف، الحملات)، تؤكد دقة المعلومات وصلاحيتك لتقديمها، وتمنحنا الإذن بمعالجة البيانات كما هو موضح في سياسة الخصوصية.',
  'الاستخدام المحظور: يُحظر استخدام الموقع لأغراض غير قانونية أو محاولة وصول غير مصرح به أو نقل برمجيات خبيثة أو إساءة استخدام الخدمات بما يخالف أنظمة الجرائم المعلوماتية أو متطلبات الهيئة الوطنية للأمن السيبراني (NCA).',
  'حدود المسؤولية: في الحدود التي يسمح بها النظام السعودي، لا تتحمل شركة ريلايبل المسؤولية عن الأضرار غير المباشرة الناشئة عن استخدام الموقع.',
  'القانون الحاكم والاختصاص: تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتختص المحاكم المختصة في جدة بالنزاعات ما لم ينص النظام على غير ذلك.',
  'التعديلات: قد نحدّث هذه الشروط في أي وقت. يُعد الاستمرار في الاستخدام موافقة على التحديثات.',
  'التواصل: شركة ريلايبل، جدة، المملكة العربية السعودية. البريد: info@reliablecompany.sa | الهاتف: +966 56 391 3902.',
)
