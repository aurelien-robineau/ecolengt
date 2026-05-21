import type { Media } from '@/payload-types'
import { mapMedia } from '@/lib/cms/mapMedia'
import type { GalleryItem } from '@/lib/cms/types'

type GalleryEntry = {
  image?: Media | string | null
  caption?: string | null
  wide?: boolean | null
  id?: string | null
}

export function mapGallery(
  entries: GalleryEntry[] | null | undefined,
  fallback: GalleryItem[],
): GalleryItem[] {
  if (!entries?.length) {
    return fallback
  }

  return entries.map((item, index) => {
    const fallbackItem = fallback[index]

    return {
      caption: item.caption || fallbackItem?.caption || '',
      wide: item.wide ?? false,
      image: mapMedia(item.image, item.caption || fallbackItem?.caption || 'Photo'),
    }
  })
}
