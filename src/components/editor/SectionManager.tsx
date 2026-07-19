'use client'

/**
 * Drag-and-drop section list for the page builder.
 * @module components/editor/SectionManager
 */

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import { Copy, Eye, EyeOff, GripVertical, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { useEditor } from '@/components/editor/EditorProvider'
import {
  SECTION_DEFINITIONS,
  getSectionLabel,
} from '@/lib/cms/editor/sections'
import type { HomepageSection, SectionType } from '@/lib/cms/editor/types'

function SortableSection({
  section,
  onToggle,
  onDuplicate,
  onDelete,
}: {
  section: HomepageSection
  onToggle: () => void
  onDuplicate: () => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={clsx(
        'flex items-center gap-2 rounded-lg border bg-white p-2.5',
        isDragging ? 'border-[#2563eb] shadow-md' : 'border-gray-200',
        !section.visible && 'opacity-50',
      )}
    >
      <button
        type="button"
        className="cursor-grab touch-none rounded p-1 text-gray-400 hover:text-gray-600"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="flex-1 text-sm font-medium text-gray-800">
        {getSectionLabel(section.type)}
      </span>
      <button type="button" onClick={onToggle} className="rounded p-1 text-gray-400 hover:text-gray-600" aria-label="Toggle visibility">
        {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
      <button type="button" onClick={onDuplicate} className="rounded p-1 text-gray-400 hover:text-[#2563eb]" aria-label="Duplicate">
        <Copy className="h-4 w-4" />
      </button>
      <button type="button" onClick={onDelete} className="rounded p-1 text-gray-400 hover:text-red-500" aria-label="Delete">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function SectionManager() {
  const { store, refreshStore } = useEditor()
  const [isAdding, setIsAdding] = useState(false)
  const sections = store.homepageSections

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const saveSections = async (next: HomepageSection[]) => {
    await fetch('/api/cms/editor/sections', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ sections: next }),
    })
    await refreshStore()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = sections.findIndex((s) => s.id === active.id)
    const newIndex = sections.findIndex((s) => s.id === over.id)
    saveSections(arrayMove(sections, oldIndex, newIndex))
  }

  const addSection = async (type: SectionType) => {
    await fetch('/api/cms/editor/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', type }),
    })
    setIsAdding(false)
    await refreshStore()
  }

  const duplicateSection = async (id: string) => {
    await fetch('/api/cms/editor/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'duplicate', id }),
    })
    await refreshStore()
  }

  const deleteSection = async (id: string) => {
    if (!confirm('Remove this section from the homepage?')) return
    await fetch(`/api/cms/editor/sections/${id}`, { method: 'DELETE' })
    await refreshStore()
  }

  const toggleVisibility = (id: string) => {
    const next = sections.map((s) =>
      s.id === id ? { ...s, visible: !s.visible } : s,
    )
    saveSections(next)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Page Sections
        </h3>
        <button
          type="button"
          onClick={() => setIsAdding((v) => !v)}
          className="inline-flex items-center gap-1 rounded-lg bg-[#2563eb] px-2.5 py-1 text-xs font-medium text-white"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {isAdding && (
        <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-2">
          {(Object.keys(SECTION_DEFINITIONS) as SectionType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => addSection(type)}
              className="block w-full rounded px-2 py-1.5 text-left text-xs text-gray-700 hover:bg-white"
            >
              {SECTION_DEFINITIONS[type].label}
            </button>
          ))}
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                onToggle={() => toggleVisibility(section.id)}
                onDuplicate={() => duplicateSection(section.id)}
                onDelete={() => deleteSection(section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
