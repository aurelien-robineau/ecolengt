import Image from 'next/image'

import type { CmsImageData } from '@/lib/cms/types'
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
}: CmsImageProps) {
  if (!image) {
    return null
  }

  return (
    <Image
      src={image.src}
      alt={decorative ? '' : image.alt}
      {...(decorative ? { role: 'presentation' } : {})}
      width={image.width ?? 1200}
      height={image.height ?? 800}
      className={cn(
        fit === 'contain' ? 'h-auto w-auto max-w-full object-contain' : 'h-full w-full object-cover',
        className,
      )}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      fetchPriority={fetchPriority}
    />
  )
}
