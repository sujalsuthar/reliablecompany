import type { CmsCollection } from '@/lib/cms/types'
import { SERVICE_CATEGORY_OPTIONS } from '@/lib/service-detail'

export interface FieldConfig {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'image' | 'tags'
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
  rows?: number
  helpText?: string
}

export interface CollectionConfig {
  key: CmsCollection
  label: string
  singular: string
  adminPath: string
  description?: string
  readOnly?: boolean
  listColumns: { key: string; label: string }[]
  fields: FieldConfig[]
}

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const publishOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
]

const seoFields: FieldConfig[] = [
  { key: 'seoTitle', label: 'Meta Title (English)', type: 'text' },
  { key: 'seoTitleAr', label: 'Meta Title (Arabic)', type: 'text' },
  {
    key: 'seoTitleAlt',
    label: 'Alternate Meta Title / Social (English)',
    type: 'text',
    helpText: 'Optional second title for Open Graph and social sharing',
  },
  { key: 'seoTitleAltAr', label: 'Alternate Meta Title (Arabic)', type: 'text' },
  { key: 'seoDescription', label: 'Meta Description (English)', type: 'textarea', rows: 2 },
  { key: 'seoDescriptionAr', label: 'Meta Description (Arabic)', type: 'textarea', rows: 2 },
  {
    key: 'seoDescriptionAlt',
    label: 'Alternate Meta Description / Social (English)',
    type: 'textarea',
    rows: 2,
    helpText: 'Optional second description for Open Graph and social sharing',
  },
  { key: 'seoDescriptionAltAr', label: 'Alternate Meta Description (Arabic)', type: 'textarea', rows: 2 },
  {
    key: 'seoKeywords',
    label: 'Meta Keywords (English)',
    type: 'textarea',
    rows: 2,
    helpText: 'Comma-separated keywords for search engines',
  },
  { key: 'seoKeywordsAr', label: 'Meta Keywords (Arabic)', type: 'textarea', rows: 2 },
]

const divisionTypeOptions = [
  { label: 'Civil', value: 'civil' },
  { label: 'Electrical', value: 'electrical' },
  { label: 'Mechanical', value: 'mechanical' },
  { label: 'IT', value: 'it' },
]

export const COLLECTION_CONFIGS: Record<CmsCollection, CollectionConfig> = {
  services: {
    key: 'services',
    label: 'Services',
    singular: 'Service',
    adminPath: '/admin/services',
    listColumns: [
      { key: 'title', label: 'Service' },
      { key: 'category', label: 'Category' },
      { key: 'order', label: 'Order' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { key: 'title', label: 'Title (English)', type: 'text', required: true },
      { key: 'titleAr', label: 'Title (Arabic)', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text', placeholder: 'auto-generated-from-title' },
      { key: 'icon', label: 'Icon (Lucide name)', type: 'text', placeholder: 'Building2' },
      {
        key: 'category',
        label: 'Category (breadcrumb group)',
        type: 'select',
        options: [...SERVICE_CATEGORY_OPTIONS],
      },
      { key: 'categoryAr', label: 'Category (Arabic)', type: 'text' },
      {
        key: 'heroImageSrc',
        label: 'Page Hero Image (top banner)',
        type: 'image',
        helpText: 'Background image for the page header on this service detail page',
      },
      {
        key: 'overviewImageSrc',
        label: 'Overview Section Image',
        type: 'image',
        helpText: 'Large image shown beside the overview text (separate from the top hero)',
      },
      { key: 'shortDescription', label: 'Short Description (English)', type: 'textarea', rows: 3 },
      { key: 'shortDescriptionAr', label: 'Short Description (Arabic)', type: 'textarea', rows: 3 },
      {
        key: 'overviewTitle',
        label: 'Overview Section Title (English)',
        type: 'text',
        placeholder: 'Our [Service] Services',
      },
      { key: 'overviewTitleAr', label: 'Overview Section Title (Arabic)', type: 'text' },
      { key: 'overviewDescription', label: 'Overview Description (English)', type: 'textarea', rows: 3 },
      { key: 'overviewDescriptionAr', label: 'Overview Description (Arabic)', type: 'textarea', rows: 3 },
      {
        key: 'overviewBulletPoints',
        label: 'Overview Bullet Points (English)',
        type: 'tags',
        helpText: 'Comma-separated highlights shown under the overview',
      },
      {
        key: 'overviewBulletPointsAr',
        label: 'Overview Bullet Points (Arabic)',
        type: 'tags',
      },
      {
        key: 'subServices',
        label: 'Sub-Services / Capabilities (English)',
        type: 'tags',
        helpText: 'Comma-separated list shown as linked-style cards',
      },
      { key: 'subServicesAr', label: 'Sub-Services (Arabic)', type: 'tags' },
      { key: 'contentTitle', label: 'Service Content Title (English)', type: 'text' },
      { key: 'contentTitleAr', label: 'Service Content Title (Arabic)', type: 'text' },
      { key: 'fullDescriptionText', label: 'Service Content Body (English)', type: 'textarea', rows: 8, helpText: 'Separate paragraphs with a blank line' },
      { key: 'fullDescriptionTextAr', label: 'Service Content Body (Arabic)', type: 'textarea', rows: 8 },
      { key: 'benefitsTitle', label: 'Benefits Section Title (English)', type: 'text', placeholder: 'Why Choose [Service]' },
      { key: 'benefitsTitleAr', label: 'Benefits Section Title (Arabic)', type: 'text' },
      {
        key: 'benefitsText',
        label: 'Benefits (English)',
        type: 'textarea',
        rows: 6,
        helpText: 'One per line: Title | Description',
      },
      {
        key: 'benefitsTextAr',
        label: 'Benefits (Arabic)',
        type: 'textarea',
        rows: 6,
        helpText: 'One per line: Title | Description (same order as English)',
      },
      { key: 'processTitle', label: 'Process Section Title (English)', type: 'text', placeholder: 'Our Process' },
      { key: 'processTitleAr', label: 'Process Section Title (Arabic)', type: 'text' },
      {
        key: 'processStepsText',
        label: 'Process Steps (English)',
        type: 'textarea',
        rows: 6,
        helpText: 'One step per line',
      },
      {
        key: 'processStepsTextAr',
        label: 'Process Steps (Arabic)',
        type: 'textarea',
        rows: 6,
      },
      { key: 'faqsTitle', label: 'FAQs Section Title (English)', type: 'text', placeholder: 'Frequently Asked Questions' },
      { key: 'faqsTitleAr', label: 'FAQs Section Title (Arabic)', type: 'text' },
      {
        key: 'faqsText',
        label: 'FAQs (English)',
        type: 'textarea',
        rows: 6,
        helpText: 'One per line: Question | Answer',
      },
      {
        key: 'faqsTextAr',
        label: 'FAQs (Arabic)',
        type: 'textarea',
        rows: 6,
      },
      { key: 'keyBenefitsTitle', label: 'Key Benefits Title (English)', type: 'text' },
      { key: 'keyBenefitsTitleAr', label: 'Key Benefits Title (Arabic)', type: 'text' },
      {
        key: 'keyBenefitsText',
        label: 'Key Benefits (English)',
        type: 'textarea',
        rows: 4,
        helpText: 'One per line: Title | Description',
      },
      {
        key: 'keyBenefitsTextAr',
        label: 'Key Benefits (Arabic)',
        type: 'textarea',
        rows: 4,
      },
      { key: 'ctaTitle', label: 'Bottom CTA Title (English)', type: 'text' },
      { key: 'ctaTitleAr', label: 'Bottom CTA Title (Arabic)', type: 'text' },
      { key: 'ctaDescription', label: 'Bottom CTA Description (English)', type: 'textarea', rows: 2 },
      { key: 'ctaDescriptionAr', label: 'Bottom CTA Description (Arabic)', type: 'textarea', rows: 2 },
      { key: 'ctaButtonText', label: 'Bottom CTA Button (English)', type: 'text', placeholder: 'Schedule Assessment' },
      { key: 'ctaButtonTextAr', label: 'Bottom CTA Button (Arabic)', type: 'text' },
      { key: 'ctaButtonLink', label: 'Bottom CTA Link', type: 'text', placeholder: '/contact' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: statusOptions },
      ...seoFields,
    ],
  },
  projects: {
    key: 'projects',
    label: 'Case Studies',
    singular: 'Case Study',
    adminPath: '/admin/case-studies',
    listColumns: [
      { key: 'title', label: 'Project' },
      { key: 'completedYear', label: 'Year' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { key: 'title', label: 'Title (English)', type: 'text', required: true },
      { key: 'titleAr', label: 'Title (Arabic)', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'shortDescription', label: 'Short Description (English)', type: 'textarea', rows: 3 },
      { key: 'shortDescriptionAr', label: 'Short Description (Arabic)', type: 'textarea', rows: 3 },
      { key: 'fullDescriptionText', label: 'Full Description (English)', type: 'textarea', rows: 8 },
      { key: 'fullDescriptionTextAr', label: 'Full Description (Arabic)', type: 'textarea', rows: 8 },
      { key: 'divisionName', label: 'Division Name', type: 'text' },
      { key: 'divisionType', label: 'Division Type', type: 'select', options: divisionTypeOptions },
      { key: 'tags', label: 'Tags', type: 'tags' },
      { key: 'completedYear', label: 'Completed Year', type: 'number' },
      { key: 'featured', label: 'Featured on Homepage', type: 'checkbox' },
      { key: 'thumbnailSrc', label: 'Thumbnail Image', type: 'image' },
      { key: 'status', label: 'Status', type: 'select', options: statusOptions },
      ...seoFields,
    ],
  },
  blogPosts: {
    key: 'blogPosts',
    label: 'Blog Posts',
    singular: 'Blog Post',
    adminPath: '/admin/blog-posts',
    listColumns: [
      { key: 'title', label: 'Title' },
      { key: 'status', label: 'Status' },
      { key: 'updatedAt', label: 'Updated' },
    ],
    fields: [
      { key: 'title', label: 'Title (English)', type: 'text', required: true },
      { key: 'titleAr', label: 'Title (Arabic)', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'excerpt', label: 'Excerpt (English)', type: 'textarea', rows: 2 },
      { key: 'excerptAr', label: 'Excerpt (Arabic)', type: 'textarea', rows: 2 },
      { key: 'content', label: 'Content (English)', type: 'textarea', rows: 12 },
      { key: 'contentAr', label: 'Content (Arabic)', type: 'textarea', rows: 12 },
      { key: 'coverImageSrc', label: 'Cover Image', type: 'image', helpText: 'Shown on blog listing cards and the article page.' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: publishOptions },
      ...seoFields,
    ],
  },
  careers: {
    key: 'careers',
    label: 'Careers',
    singular: 'Career',
    adminPath: '/admin/careers',
    listColumns: [
      { key: 'title', label: 'Position' },
      { key: 'department', label: 'Department' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { key: 'title', label: 'Job Title', type: 'text', required: true },
      { key: 'titleAr', label: 'Title (Arabic)', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 6 },
      {
        key: 'responsibilities',
        label: 'Key Responsibilities',
        type: 'tags',
        helpText: 'Shown on the apply page (comma-separated bullet points)',
      },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: statusOptions },
    ],
  },
  careerApplications: {
    key: 'careerApplications',
    label: 'Career Applications',
    singular: 'Application',
    adminPath: '/admin/career-applications',
    readOnly: true,
    listColumns: [
      { key: 'fullName', label: 'Applicant' },
      { key: 'position', label: 'Position' },
      { key: 'status', label: 'Status' },
      { key: 'submittedAt', label: 'Submitted' },
    ],
    fields: [
      { key: 'fullName', label: 'Full Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'position', label: 'Position', type: 'text' },
      { key: 'careerId', label: 'Job ID', type: 'text' },
      { key: 'resumeFileName', label: 'Resume File Name', type: 'text' },
      { key: 'resumeUrl', label: 'Resume Download URL', type: 'text' },
      { key: 'message', label: 'Cover Letter', type: 'textarea', rows: 6 },
      { key: 'status', label: 'Status', type: 'select', options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Archived', value: 'archived' },
      ]},
    ],
  },
  enquiries: {
    key: 'enquiries',
    label: 'New Enquiries',
    singular: 'Enquiry',
    adminPath: '/admin/enquiries',
    readOnly: true,
    listColumns: [
      { key: 'fullName', label: 'Name' },
      { key: 'city', label: 'City' },
      { key: 'division', label: 'Service' },
      { key: 'status', label: 'Status' },
      { key: 'submittedAt', label: 'Submitted' },
    ],
    fields: [
      { key: 'fullName', label: 'Full Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'companyName', label: 'Company Name', type: 'text' },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'service', label: 'Service Key', type: 'text' },
      { key: 'division', label: 'Service', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea', rows: 4 },
      { key: 'status', label: 'Status', type: 'select', options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Archived', value: 'archived' },
      ]},
    ],
  },
  industries: {
    key: 'industries',
    label: 'Industries',
    singular: 'Industry',
    adminPath: '/admin/industries',
    listColumns: [
      { key: 'title', label: 'Industry' },
      { key: 'order', label: 'Order' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { key: 'title', label: 'Title (English)', type: 'text', required: true },
      { key: 'titleAr', label: 'Title (Arabic)', type: 'text' },
      { key: 'icon', label: 'Icon (Lucide name)', type: 'text', placeholder: 'Building2' },
      {
        key: 'imageSrc',
        label: 'Card Image (optional)',
        type: 'image',
        helpText: 'Optional image for the industry card. If empty, the icon is shown.',
      },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: statusOptions },
    ],
  },
  divisions: {
    key: 'divisions',
    label: 'Divisions',
    singular: 'Division',
    adminPath: '/admin/divisions',
    listColumns: [
      { key: 'name', label: 'Division' },
      { key: 'type', label: 'Type' },
      { key: 'order', label: 'Order' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: divisionTypeOptions },
      { key: 'tagLabel', label: 'Tag Label', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'bulletPoints', label: 'Bullet Points', type: 'tags' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
  },
  team: {
    key: 'team',
    label: 'Team Members',
    singular: 'Team Member',
    adminPath: '/admin/team',
    listColumns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'division', label: 'Division' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'division', label: 'Division', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'textarea', rows: 4 },
      { key: 'linkedIn', label: 'LinkedIn URL', type: 'text' },
      { key: 'photoSrc', label: 'Photo', type: 'image' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
  },
  certifications: {
    key: 'certifications',
    label: 'Certifications',
    singular: 'Certification',
    adminPath: '/admin/certifications',
    listColumns: [
      { key: 'name', label: 'Name' },
      { key: 'order', label: 'Order' },
    ],
    fields: [
      { key: 'name', label: 'Name (English)', type: 'text', required: true },
      { key: 'nameAr', label: 'Name (Arabic)', type: 'text' },
      {
        key: 'logoUrl',
        label: 'Logo / Badge Image',
        type: 'image',
        helpText: 'Optional certificate or badge logo. If empty, the name is shown as a text badge.',
      },
      { key: 'order', label: 'Order', type: 'number' },
    ],
  },
  values: {
    key: 'values',
    label: 'Company Values',
    singular: 'Value',
    adminPath: '/admin/values',
    listColumns: [
      { key: 'title', label: 'Value' },
      { key: 'order', label: 'Order' },
    ],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { key: 'icon', label: 'Icon (Lucide name)', type: 'text', placeholder: 'Target' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
  },
  whyStats: {
    key: 'whyStats',
    label: 'Why Us Stats',
    singular: 'Stat',
    adminPath: '/admin/why-stats',
    listColumns: [
      { key: 'value', label: 'Value' },
      { key: 'label', label: 'Label' },
      { key: 'order', label: 'Order' },
    ],
    fields: [
      { key: 'value', label: 'Value', type: 'text', required: true, placeholder: '25+' },
      { key: 'label', label: 'Label (English)', type: 'text', required: true },
      { key: 'labelAr', label: 'Label (Arabic)', type: 'text' },
      { key: 'description', label: 'Description (English)', type: 'textarea', rows: 2 },
      { key: 'descriptionAr', label: 'Description (Arabic)', type: 'textarea', rows: 2 },
      { key: 'order', label: 'Order', type: 'number' },
    ],
  },
  campaigns: {
    key: 'campaigns',
    label: 'Campaigns',
    singular: 'Campaign',
    adminPath: '/admin/campaigns',
    description: 'Site popup and floating campaign widgets (e.g. free dark web assessment)',
    listColumns: [
      { key: 'name', label: 'Campaign' },
      { key: 'status', label: 'Status' },
      { key: 'order', label: 'Order' },
    ],
    fields: [
      { key: 'name', label: 'Internal Name', type: 'text', required: true },
      { key: 'status', label: 'Status', type: 'select', options: statusOptions },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'showDelayMs', label: 'Popup Delay (ms)', type: 'number', placeholder: '2500' },
      { key: 'badge', label: 'Popup Badge (English)', type: 'text', placeholder: 'Limited-Time Offer' },
      { key: 'badgeAr', label: 'Popup Badge (Arabic)', type: 'text' },
      { key: 'title', label: 'Popup Title (English)', type: 'text', required: true },
      { key: 'titleAr', label: 'Popup Title (Arabic)', type: 'text' },
      { key: 'subtitle', label: 'Popup Subtitle (English)', type: 'text' },
      { key: 'subtitleAr', label: 'Popup Subtitle (Arabic)', type: 'text' },
      { key: 'body', label: 'Popup Body (English)', type: 'textarea', rows: 3 },
      { key: 'bodyAr', label: 'Popup Body (Arabic)', type: 'textarea', rows: 3 },
      { key: 'ctaText', label: 'Popup Button Text (English)', type: 'text' },
      { key: 'ctaTextAr', label: 'Popup Button Text (Arabic)', type: 'text' },
      {
        key: 'applyPagePath',
        label: 'Application Page Path',
        type: 'text',
        placeholder: '/dark-web-assessment',
        helpText: 'Where users go when they click the popup or floating widget',
      },
      { key: 'floatingLabel', label: 'Floating Widget Label (English)', type: 'text', placeholder: 'FREE CAMPAIGN' },
      { key: 'floatingLabelAr', label: 'Floating Widget Label (Arabic)', type: 'text' },
      { key: 'floatingText', label: 'Floating Widget Text (English)', type: 'textarea', rows: 2 },
      { key: 'floatingTextAr', label: 'Floating Widget Text (Arabic)', type: 'textarea', rows: 2 },
    ],
  },
  campaignApplications: {
    key: 'campaignApplications',
    label: 'Campaign Applications',
    singular: 'Application',
    adminPath: '/admin/campaign-applications',
    readOnly: true,
    listColumns: [
      { key: 'fullName', label: 'Applicant' },
      { key: 'campaignName', label: 'Campaign' },
      { key: 'companyName', label: 'Company' },
      { key: 'domain', label: 'Domain' },
      { key: 'status', label: 'Status' },
      { key: 'submittedAt', label: 'Submitted' },
    ],
    fields: [
      { key: 'campaignName', label: 'Campaign', type: 'text' },
      { key: 'fullName', label: 'Full Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'companyName', label: 'Company Name', type: 'text' },
      { key: 'domain', label: 'Company Domain', type: 'text' },
      { key: 'message', label: 'Additional Context', type: 'textarea', rows: 4 },
      { key: 'status', label: 'Status', type: 'select', options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Archived', value: 'archived' },
      ]},
    ],
  },
}

export function getCollectionConfig(collection: string): CollectionConfig | null {
  return COLLECTION_CONFIGS[collection as CmsCollection] ?? null
}

export const CMS_COLLECTION_KEYS = Object.keys(COLLECTION_CONFIGS) as CmsCollection[]
