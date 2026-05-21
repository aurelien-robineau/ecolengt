import Image from 'next/image'

import type { CmsImageData } from '@/lib/cms/types'
import { cn } from '@/lib/cn'

type CmsImageProps = {
  image: CmsImageData
  className?: string
  sizes?: string
  priority?: boolean
  /** cover fills a fixed frame; contain keeps the full image visible (no crop). */
  fit?: 'cover' | 'contain'
}

export function CmsImage({ image, className, sizes = '100vw', priority, fit = 'cover' }: CmsImageProps) {
  if (!image) {
    return null
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 1200}
      height={image.height ?? 800}
      className={cn(
        fit === 'contain' ? 'h-auto w-auto max-w-full object-contain' : 'h-full w-full object-cover',
        className,
      )}
      sizes={sizes}
      priority={priority}
    />
  )
}
