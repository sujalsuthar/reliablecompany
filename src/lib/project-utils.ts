import type { PortableTextBlock } from '@portabletext/types'

import { textToBlocks } from '@/lib/cms/text'
import type { DivisionType, Project } from '@/lib/types'

const VALID_DIVISION_TYPES = new Set<DivisionType>([
  'civil',
  'electrical',
  'mechanical',
  'it',
])

export function normalizeDivisionType(value?: string): DivisionType {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (VALID_DIVISION_TYPES.has(normalized as DivisionType)) {
    return normalized as DivisionType
  }
  return 'it'
}

export function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }
  return []
}

export function normalizePortableTextBlocks(value: unknown): PortableTextBlock[] {
  if (!value) return []

  if (typeof value === 'string') {
    return textToBlocks(value)
  }

  if (!Array.isArray(value)) return []

  return value
    .filter(
      (block) =>
        block &&
        typeof block === 'object' &&
        (block as PortableTextBlock)._type === 'block' &&
        Array.isArray((block as PortableTextBlock).children) &&
        (block as PortableTextBlock).children!.length > 0,
    )
    .map((block) => block as PortableTextBlock)
}

export function normalizeProject(project: Project): Project {
  return {
    ...project,
    tags: normalizeTags(project.tags),
    division: project.division
      ? {
          name: String(project.division.name ?? '').trim(),
          type: normalizeDivisionType(project.division.type),
        }
      : undefined,
    fullDescription: normalizePortableTextBlocks(project.fullDescription),
    fullDescriptionAr: project.fullDescriptionAr
      ? normalizePortableTextBlocks(project.fullDescriptionAr)
      : undefined,
    completedYear:
      project.completedYear !== undefined && project.completedYear !== null
        ? Number(project.completedYear)
        : undefined,
  }
}
