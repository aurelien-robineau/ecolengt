'use client'

import { PhotoGallery } from '@/components/ui/PhotoGallery'
import type { CmsImageData } from '@/lib/cms/types'

type StudentPhotosProps = {
  photos: CmsImageData[]
}

export function StudentPhotos({ photos }: StudentPhotosProps) {
  const items = photos
    .filter((photo): photo is NonNullable<CmsImageData> => photo !== null)
    .map((image) => ({
      caption: '',
      wide: false,
      image,
    }))

  if (!items.length) {
    return null
  }

  const isSingle = items.length === 1

  return (
    <PhotoGallery
      items={items}
      columns={2}
      naturalSingle
      singleLightbox={!isSingle}
      singleFigureClassName="max-w-lg"
      singleImageClassName="max-h-96"
    />
  )
}
