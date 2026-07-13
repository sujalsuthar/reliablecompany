const MAX_UPLOAD_BYTES = 5 * 1024 * 1024 // 5 MB
const MAX_RESUME_BYTES = 10 * 1024 * 1024 // 10 MB

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
])

const SIGNATURES: { mime: string; bytes: number[] }[] = [
  { mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: 'image/gif', bytes: [0x47, 0x49, 0x46] },
  { mime: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46] },
]

function matchesSignature(buffer: Buffer, bytes: number[]): boolean {
  if (buffer.length < bytes.length) return false
  return bytes.every((byte, index) => buffer[index] === byte)
}

function detectImageMime(buffer: Buffer): string | null {
  for (const { mime, bytes } of SIGNATURES) {
    if (matchesSignature(buffer, bytes)) {
      if (mime === 'image/webp') {
        const webp = buffer.subarray(8, 12).toString('ascii')
        if (webp !== 'WEBP') return null
      }
      return mime
    }
  }

  // AVIF: ....ftypavif / ftypavis
  if (buffer.length >= 12 && buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buffer.subarray(8, 12).toString('ascii')
    if (brand.startsWith('avif') || brand.startsWith('avis')) {
      return 'image/avif'
    }
  }

  return null
}

export interface UploadValidationResult {
  ok: true
  mime: string
}

export interface UploadValidationError {
  ok: false
  error: string
}

export function validateImageUpload(
  file: File,
  buffer: Buffer,
): UploadValidationResult | UploadValidationError {
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: 'File exceeds the 5 MB size limit.' }
  }

  if (file.size === 0) {
    return { ok: false, error: 'Empty file.' }
  }

  const declaredType = file.type.toLowerCase()
  if (declaredType && !ALLOWED_IMAGE_TYPES.has(declaredType)) {
    return { ok: false, error: 'Only image files are allowed.' }
  }

  const detectedMime = detectImageMime(buffer)
  if (!detectedMime || !ALLOWED_IMAGE_TYPES.has(detectedMime)) {
    return { ok: false, error: 'Invalid or unsupported image file.' }
  }

  return { ok: true, mime: detectedMime }
}

const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function detectResumeMime(buffer: Buffer): string | null {
  const head = buffer.subarray(0, Math.min(buffer.length, 1024)).toString('latin1')
  const pdfIndex = head.indexOf('%PDF')
  if (pdfIndex >= 0 && pdfIndex < 1024) {
    return 'application/pdf'
  }
  if (buffer.length >= 4 && buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0) {
    return 'application/msword'
  }
  if (buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4b) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  return null
}

export function validateResumeUpload(
  file: File,
  buffer: Buffer,
): UploadValidationResult | UploadValidationError {
  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, error: 'Resume exceeds the 10 MB size limit.' }
  }

  if (file.size === 0) {
    return { ok: false, error: 'Empty file.' }
  }

  const name = file.name.toLowerCase()
  if (!/\.(pdf|doc|docx)$/.test(name)) {
    return { ok: false, error: 'Only PDF, DOC, or DOCX files are allowed.' }
  }

  const detectedMime = detectResumeMime(buffer)
  if (!detectedMime || !ALLOWED_RESUME_TYPES.has(detectedMime)) {
    return { ok: false, error: 'Invalid resume file. Upload PDF, DOC, or DOCX only.' }
  }

  return { ok: true, mime: detectedMime }
}

export { MAX_UPLOAD_BYTES, MAX_RESUME_BYTES }
