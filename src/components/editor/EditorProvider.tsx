'use client'

/**
 * Visual editor context — holds live CMS store and active field state.
 * @module components/editor/EditorProvider
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { FieldType } from '@/lib/cms/editor/types'
import { resolveFieldValue } from '@/lib/cms/editor/field-path'
import type { CmsStore } from '@/lib/cms/types'

export interface ActiveField {
  path: string
  type: FieldType
  label: string
}

export interface PreviewDraft {
  path: string
  value: unknown
  arPath?: string
  arValue?: string
}

interface EditorContextValue {
  store: CmsStore
  isEditing: boolean
  activeField: ActiveField | null
  isSaving: boolean
  previewDraft: PreviewDraft | null
  setActiveField: (field: ActiveField | null) => void
  setPreviewDraft: (draft: PreviewDraft | null) => void
  updateField: (path: string, value: unknown) => Promise<void>
  refreshStore: () => Promise<void>
  getFieldValue: (path: string) => unknown
}

const EditorContext = createContext<EditorContextValue | null>(null)

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) {
    throw new Error('useEditor must be used within EditorProvider')
  }
  return ctx
}

export function useEditorOptional() {
  return useContext(EditorContext)
}

interface EditorProviderProps {
  children: ReactNode
  initialStore: CmsStore
  isEditing?: boolean
}

export default function EditorProvider({
  children,
  initialStore,
  isEditing = false,
}: EditorProviderProps) {
  const [store, setStore] = useState(initialStore)
  const [activeField, setActiveFieldState] = useState<ActiveField | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [previewDraft, setPreviewDraft] = useState<PreviewDraft | null>(null)

  const setActiveField = useCallback((field: ActiveField | null) => {
    setActiveFieldState(field)
    if (!field) setPreviewDraft(null)
  }, [])

  const refreshStore = useCallback(async () => {
    const res = await fetch('/api/cms/editor/store', { credentials: 'include' })
    if (res.ok) {
      const data = (await res.json()) as { store: CmsStore }
      setStore(data.store)
    }
  }, [])

  const updateField = useCallback(async (path: string, value: unknown) => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/cms/editor/field', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ path, value }),
      })
      const data = (await res.json()) as { store?: CmsStore; error?: string }
      if (!res.ok || !data.store) {
        throw new Error(data.error ?? 'Failed to save field')
      }
      setStore(data.store)
    } finally {
      setIsSaving(false)
    }
  }, [])

  const getFieldValue = useCallback(
    (path: string) => {
      if (previewDraft?.path === path) return previewDraft.value
      if (previewDraft?.arPath === path) return previewDraft.arValue
      return resolveFieldValue(store, path)
    },
    [previewDraft, store],
  )

  const value = useMemo(
    () => ({
      store,
      isEditing,
      activeField,
      isSaving,
      previewDraft,
      setActiveField,
      setPreviewDraft,
      updateField,
      refreshStore,
      getFieldValue,
    }),
    [
      store,
      isEditing,
      activeField,
      isSaving,
      previewDraft,
      setActiveField,
      updateField,
      refreshStore,
      getFieldValue,
    ],
  )

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}
