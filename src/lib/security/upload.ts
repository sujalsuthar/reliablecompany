const MAX_UPLOAD_BYTES = 5 * 1024 * 1024 // 5 MB

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

export { MAX_UPLOAD_BYTES }
