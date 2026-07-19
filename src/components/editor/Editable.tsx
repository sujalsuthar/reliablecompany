'use client'

/**
 * Wraps any content with inline edit affordance (hover outline + pencil).
 * @module components/editor/Editable
 */

import { clsx } from 'clsx'
import { Pencil } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'

import { useEditorOptional } from '@/components/editor/EditorProvider'
import { fieldStyleToCss, getFieldStyle } from '@/lib/cms/editor/field-path'
import type { FieldType } from '@/lib/cms/editor/types'

interface EditableProps {
  path: string
  type: FieldType
  label: string
  children: ReactNode
  className?: string
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3'
  style?: CSSProperties
}

export default function Editable({
  path,
  type,
  label,
  children,
  className,
  as: Tag = 'div',
  style,
}: EditableProps) {
  const editor = useEditorOptional()

  const fieldStyle = editor ? getFieldStyle(editor.store, path) : {}
  const mergedStyle = { ...fieldStyleToCss(fieldStyle), ...style }

  const draftValue =
    editor?.previewDraft?.path === path ? editor.previewDraft.value : undefined
  const displayContent =
    typeof draftValue === 'string' || typeof draftValue === 'number'
      ? String(draftValue)
      : children

  if (!editor?.isEditing) {
    return (
      <Tag className={className} style={mergedStyle}>
        {children}
      </Tag>
    )
  }

  const isActive = editor.activeField?.path === path

  return (
    <Tag
      className={clsx(
        'editable-field group relative cursor-pointer transition-all',
        isActive
          ? 'ring-2 ring-[#2563eb] ring-offset-2'
          : 'hover:ring-2 hover:ring-[#2563eb]/50 hover:ring-offset-1',
        className,
      )}
      style={mergedStyle}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        editor.setActiveField({ path, type, label })
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          editor.setActiveField({ path, type, label })
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Edit ${label}`}
    >
      {displayContent}
      <span
        className={clsx(
          'absolute -right-2 -top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg transition-opacity',
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden />
      </span>
    </Tag>
  )
}
