import { compressImage } from '@/lib/cms/editor/image-utils'

export interface CmsUploadResult {
  url: string
}

export async function uploadCmsImage(
  file: File,
  options?: { maxWidth?: number },
): Promise<CmsUploadResult> {
  let fileToUpload = file
  try {
    fileToUpload = await compressImage(file, options?.maxWidth ?? 1920)
  } catch {
    fileToUpload = file
  }

  const formData = new FormData()
  formData.append('file', fileToUpload)

  const res = await fetch('/api/cms/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  const data = (await res.json()) as { url?: string; error?: string }

  if (!res.ok || !data.url) {
    throw new Error(data.error ?? 'Image upload failed')
  }

  return { url: data.url }
}
