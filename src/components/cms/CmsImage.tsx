import Image from 'next/image'

import type { CmsImageData } from '@/lib/content/types'
import { cn } from '@/lib/cn'

type CmsImageProps = {
  image: CmsImageData
  className?: string
  sizes?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** cover fills a fixed frame; contain keeps the full image visible (no crop). */
  fit?: 'cover' | 'contain'
  /** Mark purely decorative images (empty alt). */
  decorative?: boolean
  /** Fill a positioned parent container (requires relative + sized ancestor). */
  fill?: boolean
}

export function CmsImage({
  image,
  className,
  sizes = '100vw',
  priority,
  loading,
  fetchPriority,
  fit = 'cover',
  decorative = false,
  fill = false,
}: CmsImageProps) {
  if (!image) {
    return null
  }

  const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  return (
    <Image
      src={image.src}
      alt={decorative ? '' : image.alt}
      {...(decorative ? { role: 'presentation' } : {})}
      {...(fill
        ? { fill: true }
        : {
            width: image.width ?? 1200,
            height: image.height ?? 800,
          })}
      className={cn(
        fill
          ? objectFitClass
          : fit === 'contain'
            ? 'h-auto w-auto max-w-full object-contain'
            : 'h-full w-full object-cover',
        className,
      )}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      fetchPriority={fetchPriority}
    />
  )
}
