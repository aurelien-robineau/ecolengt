import type { Media } from '@/payload-types'
import { mapMedia } from '@/lib/cms/mapMedia'
import type { GalleryItem } from '@/lib/cms/types'

type GalleryEntry = {
  image?: Media | string | null
  caption?: string | null
  wide?: boolean | null
  id?: string | null
}

export function mapGallery(entries: GalleryEntry[] | null | undefined): GalleryItem[] {
  if (!entries?.length) {
    return []
  }

  return entries
    .map((item) => ({
      caption: item.caption ?? '',
      wide: item.wide ?? false,
      image: mapMedia(item.image, item.caption ?? 'Photo'),
    }))
    .filter((item) => item.image)
}
