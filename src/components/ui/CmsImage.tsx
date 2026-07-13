import Image, { type ImageProps } from 'next/image'
import { clsx } from 'clsx'

type CmsImageProps = Omit<ImageProps, 'src'> & {
  src: string
}

/** Renders CMS-managed images — supports local paths, Vercel Blob, and any external HTTPS URL. */
function useNativeImg(src: string): boolean {
  if (src.startsWith('/')) return false
  if (src.includes('.public.blob.vercel-storage.com')) return false
  return src.startsWith('http://') || src.startsWith('https://')
}

export default function CmsImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
  quality = 75,
  loading,
  ...rest
}: CmsImageProps) {
  const resolvedLoading = priority ? undefined : loading ?? 'lazy'
  const fetchPriority = priority ? 'high' : 'auto'

  if (useNativeImg(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ''}
        className={clsx(fill && 'absolute inset-0 h-full w-full object-cover', className)}
        sizes={sizes}
        loading={resolvedLoading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt ?? ''}
      fill={fill}
      className={className}
      sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
      priority={priority}
      quality={quality}
      loading={resolvedLoading}
      decoding="async"
      {...rest}
    />
  )
}
