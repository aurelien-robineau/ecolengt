'use client'

import { Gallery } from '@/components/ui/Gallery'
import type { CmsImageData } from '@/lib/content/types'

type StudentPhotosProps = {
  photos: CmsImageData[]
}

export function StudentPhotos({ photos }: StudentPhotosProps) {
  const items = photos
    .filter((photo): photo is NonNullable<CmsImageData> => photo !== null)
    .map((image) => ({ image }))

  if (!items.length) {
    return null
  }

  const isSingle = items.length === 1

  return (
    <Gallery
      items={items}
      columns={2}
      naturalSingle
      singleLightbox={!isSingle}
      singleFigureClassName="max-w-lg"
      singleImageClassName="max-h-96"
    />
  )
}
