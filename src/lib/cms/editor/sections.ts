/**
 * Section registry — defines all page-builder section types.
 * @module cms/editor/sections
 */

import type { SectionDefinition, SectionType } from '@/lib/cms/editor/types'

export const SECTION_DEFINITIONS: Record<SectionType, SectionDefinition> = {
  hero: {
    type: 'hero',
    label: 'Hero',
    description: 'Full-width banner with headline and CTAs',
    icon: 'Layout',
    fields: [
      { path: 'hero.eyebrow', type: 'text', label: 'Eyebrow' },
      { path: 'hero.headline', type: 'text', label: 'Headline' },
      { path: 'hero.highlightedWord', type: 'text', label: 'Highlighted Word' },
      { path: 'hero.subheadline', type: 'richtext', label: 'Subheadline' },
      { path: 'hero.primaryButton', type: 'button', label: 'Primary Button' },
      { path: 'hero.secondaryButton', type: 'button', label: 'Secondary Button' },
      { path: 'hero.backgroundImage', type: 'image', label: 'Background Image' },
    ],
  },
  campaigns: {
    type: 'campaigns',
    label: 'Campaigns',
    description: 'Active marketing campaigns (manage items in Campaigns CMS)',
    icon: 'Megaphone',
    fields: [
      { path: 'sectionContent.campaigns.label', type: 'text', label: 'Section Label' },
      { path: 'sectionContent.campaigns.title', type: 'text', label: 'Section Title' },
      { path: 'sectionContent.campaigns.description', type: 'richtext', label: 'Description' },
    ],
  },
  customLine: {
    type: 'customLine',
    label: 'Custom Line',
    description: 'Repeatable text block for custom one-liners or short notes',
    icon: 'Text',
    fields: [
      { path: 'sectionContent.{sectionId}.label', type: 'text', label: 'Label' },
      { path: 'sectionContent.{sectionId}.title', type: 'text', label: 'Line Text' },
      { path: 'sectionContent.{sectionId}.description', type: 'richtext', label: 'Description (optional)' },
    ],
  },
  services: {
    type: 'services',
    label: 'Services',
    description: 'Service cards grid (manage items in Services CMS)',
    icon: 'Wrench',
    fields: [
      { path: 'sectionContent.services.label', type: 'text', label: 'Section Label' },
      { path: 'sectionContent.services.title', type: 'text', label: 'Section Title' },
      { path: 'sectionContent.services.description', type: 'richtext', label: 'Description' },
    ],
  },
  whyUs: {
    type: 'whyUs',
    label: 'Why Us',
    description: 'Statistics and value proposition',
    icon: 'Award',
    fields: [
      { path: 'sectionContent.whyUs.label', type: 'text', label: 'Section Label' },
      { path: 'sectionContent.whyUs.title', type: 'text', label: 'Section Title' },
      { path: 'sectionContent.whyUs.description', type: 'richtext', label: 'Description' },
    ],
  },
  industries: {
    type: 'industries',
    label: 'Industries',
    description: 'Industries we serve',
    icon: 'Factory',
    fields: [
      { path: 'sectionContent.industries.label', type: 'text', label: 'Section Label' },
      { path: 'sectionContent.industries.title', type: 'text', label: 'Section Title' },
      { path: 'sectionContent.industries.description', type: 'richtext', label: 'Description' },
    ],
  },
  divisions: {
    type: 'divisions',
    label: 'Divisions',
    description: 'Engineering divisions overview',
    icon: 'Layers',
    fields: [
      { path: 'sectionContent.divisions.label', type: 'text', label: 'Section Label' },
      { path: 'sectionContent.divisions.title', type: 'text', label: 'Section Title' },
      { path: 'sectionContent.divisions.description', type: 'richtext', label: 'Description' },
    ],
  },
  projects: {
    type: 'projects',
    label: 'Projects',
    description: 'Featured case studies',
    icon: 'FolderKanban',
    fields: [
      { path: 'sectionContent.projects.label', type: 'text', label: 'Section Label' },
      { path: 'sectionContent.projects.title', type: 'text', label: 'Section Title' },
      { path: 'sectionContent.projects.description', type: 'richtext', label: 'Description' },
    ],
  },
  cta: {
    type: 'cta',
    label: 'CTA',
    description: 'Call-to-action banner with email capture',
    icon: 'Megaphone',
    fields: [
      { path: 'ctaBanner.title', type: 'text', label: 'Title' },
      { path: 'ctaBanner.description', type: 'richtext', label: 'Description' },
      { path: 'ctaBanner.buttonText', type: 'text', label: 'Submit Button' },
      { path: 'ctaBanner.secondaryButton', type: 'button', label: 'Secondary Button' },
    ],
  },
  about: {
    type: 'about',
    label: 'About',
    description: 'Company overview section',
    icon: 'Building2',
    fields: [
      { path: 'sectionContent.about.title', type: 'text', label: 'Title' },
      { path: 'sectionContent.about.description', type: 'richtext', label: 'Description' },
    ],
  },
  features: {
    type: 'features',
    label: 'Features',
    description: 'Feature highlights grid',
    icon: 'Grid3x3',
    fields: [
      { path: 'sectionContent.features.title', type: 'text', label: 'Title' },
      { path: 'sectionContent.features.description', type: 'richtext', label: 'Description' },
    ],
  },
  testimonials: {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Client testimonials carousel',
    icon: 'Quote',
    fields: [
      { path: 'sectionContent.testimonials.title', type: 'text', label: 'Title' },
    ],
  },
  faqs: {
    type: 'faqs',
    label: 'FAQs',
    description: 'Frequently asked questions',
    icon: 'HelpCircle',
    fields: [
      { path: 'sectionContent.faqs.title', type: 'text', label: 'Title' },
    ],
  },
  contact: {
    type: 'contact',
    label: 'Contact',
    description: 'Contact form section',
    icon: 'Mail',
    fields: [
      { path: 'sectionContent.contact.title', type: 'text', label: 'Title' },
      { path: 'sectionContent.contact.description', type: 'richtext', label: 'Description' },
    ],
  },
  gallery: {
    type: 'gallery',
    label: 'Gallery',
    description: 'Image gallery grid',
    icon: 'Images',
    fields: [
      { path: 'sectionContent.gallery.title', type: 'text', label: 'Title' },
    ],
  },
  team: {
    type: 'team',
    label: 'Team',
    description: 'Team members grid',
    icon: 'Users',
    fields: [
      { path: 'sectionContent.team.title', type: 'text', label: 'Title' },
      { path: 'sectionContent.team.description', type: 'richtext', label: 'Description' },
    ],
  },
  pricing: {
    type: 'pricing',
    label: 'Pricing',
    description: 'Pricing plans',
    icon: 'CreditCard',
    fields: [
      { path: 'sectionContent.pricing.title', type: 'text', label: 'Title' },
    ],
  },
  blog: {
    type: 'blog',
    label: 'Blog',
    description: 'Latest blog posts',
    icon: 'FileText',
    fields: [
      { path: 'sectionContent.blog.title', type: 'text', label: 'Title' },
    ],
  },
  certifications: {
    type: 'certifications',
    label: 'Certifications',
    description: 'Certification & accreditation logos (manage items in Certifications CMS)',
    icon: 'BadgeCheck',
    fields: [
      { path: 'sectionContent.certifications.label', type: 'text', label: 'Section Label' },
      { path: 'sectionContent.certifications.title', type: 'text', label: 'Section Title' },
      { path: 'sectionContent.certifications.description', type: 'richtext', label: 'Description' },
    ],
  },
}

export const DEFAULT_HOMEPAGE_SECTIONS: SectionType[] = [
  'hero',
  'campaigns',
  'services',
  'whyUs',
  'industries',
  'divisions',
  'certifications',
  'projects',
  'cta',
]

export function createSectionInstance(type: SectionType) {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    visible: true,
  }
}

export function getSectionLabel(type: SectionType): string {
  return SECTION_DEFINITIONS[type]?.label ?? type
}
