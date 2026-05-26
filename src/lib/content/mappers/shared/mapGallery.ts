import type { Media } from '@/payload-types'
import { mapMedia } from '../shared/mapMedia'
import type { GalleryItem } from '@/lib/content/types'

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
      image: mapMedia(item.image, ''),
    }))
    .filter((item): item is GalleryItem => item.image !== null)
}
