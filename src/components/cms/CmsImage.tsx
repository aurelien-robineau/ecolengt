import Image from 'next/image'

import type { CmsImageData } from '@/lib/cms/types'
import { cn } from '@/lib/cn'

type CmsImageProps = {
  image: CmsImageData
  className?: string
  sizes?: string
  priority?: boolean
}

export function CmsImage({ image, className, sizes = '100vw', priority }: CmsImageProps) {
  if (!image) {
    return null
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 1200}
      height={image.height ?? 800}
      className={cn('h-full w-full object-cover', className)}
      sizes={sizes}
      priority={priority}
    />
  )
}
