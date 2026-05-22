import type { Media } from '@/payload-types'
import { mapMedia } from '@/lib/cms/mapMedia'
import type { GalleryItem } from '@/lib/cms/types'

type GalleryEntry = {
  image?: Media | string | null
  id?: string | null
}

export function mapGallery(entries: GalleryEntry[] | null | undefined): GalleryItem[] {
  if (!entries?.length) {
    return []
  }

  return entries
    .map((item) => ({
      image: mapMedia(item.image, 'Photo'),
    }))
    .filter((item): item is GalleryItem => item.image !== null)
}
