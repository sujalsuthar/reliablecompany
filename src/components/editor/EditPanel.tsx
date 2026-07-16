'use client'

/**
 * Side panel for editing the active inline field.
 * @module components/editor/EditPanel
 */

import { clsx } from 'clsx'
import { AlignCenter, AlignLeft, AlignRight, Loader2, Save, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import BilingualField from '@/components/admin/BilingualField'
import ImageUploadField from '@/components/admin/ImageUploadField'
import { useEditor } from '@/components/editor/EditorProvider'
import type { ButtonFieldValue, FieldStyle, ImageFieldValue } from '@/lib/cms/editor/types'
import { getFieldStyle } from '@/lib/cms/editor/field-path'
import { toArPath } from '@/lib/i18n/bilingual'

export default function EditPanel() {
  const { activeField, setActiveField, getFieldValue, updateField, isSaving, store } =
    useEditor()
  const [draft, setDraft] = useState<unknown>('')
  const [draftAr, setDraftAr] = useState('')
  const [styleDraft, setStyleDraft] = useState<FieldStyle>({})
  const [uploadError, setUploadError] = useState('')

  const arPath = activeField ? toArPath(activeField.path) : ''

  useEffect(() => {
    if (!activeField) return
    setDraft(getFieldValue(activeField.path) ?? '')
    setDraftAr(String(getFieldValue(arPath) ?? ''))
    setStyleDraft(getFieldStyle(store, activeField.path))
    setUploadError('')
  }, [activeField, arPath, getFieldValue, store])

  if (!activeField) {
    return (
      <aside className="flex h-full w-[360px] shrink-0 flex-col border-l border-gray-200 bg-white">
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <p className="text-sm font-medium text-gray-900">Click any element to edit</p>
          <p className="mt-2 text-xs text-gray-500">
            Hover over text, images, or buttons on the preview and click the pencil icon.
          </p>
        </div>
      </aside>
    )
  }

  const save = async () => {
    await updateField(activeField.path, draft)
    if (activeField.type === 'text' || activeField.type === 'richtext') {
      await updateField(arPath, draftAr)
      await updateField(`fieldStyles.${activeField.path}`, styleDraft)
    }
    setActiveField(null)
  }

  const btn = (draft as ButtonFieldValue) ?? { text: '', href: '' }
  const img = (draft as ImageFieldValue) ?? { src: '', alt: '' }

  return (
    <aside className="flex h-full w-[360px] shrink-0 flex-col border-l border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Editing</p>
          <h2 className="text-sm font-semibold text-gray-900">{activeField.label}</h2>
        </div>
        <button
          type="button"
          onClick={() => setActiveField(null)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {(activeField.type === 'text' || activeField.type === 'richtext') && (
          <>
            <BilingualField
              label={activeField.label}
              enValue={String(draft ?? '')}
              arValue={draftAr}
              onEnChange={(v) => setDraft(v)}
              onArChange={setDraftAr}
              type={activeField.type === 'richtext' ? 'textarea' : 'text'}
              rows={activeField.type === 'richtext' ? 8 : 2}
            />

            <div className="space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase text-gray-500">Typography</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Font size</label>
                  <select
                    value={styleDraft.fontSize ?? ''}
                    onChange={(e) =>
                      setStyleDraft((s) => ({ ...s, fontSize: e.target.value || undefined }))
                    }
                    className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm"
                  >
                    <option value="">Default</option>
                    <option value="14px">Small</option>
                    <option value="16px">Medium</option>
                    <option value="20px">Large</option>
                    <option value="24px">XL</option>
                    <option value="32px">2XL</option>
                    <option value="48px">3XL</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Weight</label>
                  <select
                    value={styleDraft.fontWeight ?? ''}
                    onChange={(e) =>
                      setStyleDraft((s) => ({ ...s, fontWeight: e.target.value || undefined }))
                    }
                    className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm"
                  >
                    <option value="">Default</option>
                    <option value="400">Normal</option>
                    <option value="500">Medium</option>
                    <option value="600">Semibold</option>
                    <option value="700">Bold</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Color</label>
                <input
                  type="color"
                  value={styleDraft.color ?? '#0a1628'}
                  onChange={(e) => setStyleDraft((s) => ({ ...s, color: e.target.value }))}
                  className="h-9 w-full cursor-pointer rounded border border-gray-200"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Alignment</label>
                <div className="flex gap-1">
                  {(
                    [
                      ['left', AlignLeft],
                      ['center', AlignCenter],
                      ['right', AlignRight],
                    ] as const
                  ).map(([align, Icon]) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => setStyleDraft((s) => ({ ...s, textAlign: align }))}
                      className={clsx(
                        'flex h-9 flex-1 items-center justify-center rounded border',
                        styleDraft.textAlign === align
                          ? 'border-[#2563eb] bg-blue-50 text-[#2563eb]'
                          : 'border-gray-200 text-gray-500',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeField.type === 'image' && (
          <>
            <ImageUploadField
              compact
              label="Image"
              value={img.src ?? ''}
              onChange={(url) => setDraft({ ...img, src: url })}
              onError={setUploadError}
            />
            <input
              type="text"
              placeholder="Alt text"
              value={img.alt ?? ''}
              onChange={(e) => setDraft({ ...img, alt: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Caption (optional)"
              value={img.caption ?? ''}
              onChange={(e) => setDraft({ ...img, caption: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
          </>
        )}

        {activeField.type === 'button' && (
          <>
            <input
              type="text"
              placeholder="Button text"
              value={btn.text ?? ''}
              onChange={(e) => setDraft({ ...btn, text: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Link URL"
              value={btn.href ?? ''}
              onChange={(e) => setDraft({ ...btn, href: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(btn.openInNewTab)}
                onChange={(e) => setDraft({ ...btn, openInNewTab: e.target.checked })}
              />
              Open in new tab
            </label>
            <select
              value={btn.variant ?? 'primary'}
              onChange={(e) =>
                setDraft({
                  ...btn,
                  variant: e.target.value as ButtonFieldValue['variant'],
                })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
            </select>
          </>
        )}
      </div>

      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          onClick={save}
          disabled={isSaving}
          className="btn-primary flex w-full items-center justify-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save changes
        </button>
      </div>
    </aside>
  )
}
