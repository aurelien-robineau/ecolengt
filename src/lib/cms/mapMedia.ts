import type { Media } from '@/payload-types'
import type { CmsImageData } from '@/lib/cms/types'

export function mapMedia(media: Media | string | null | undefined, fallbackAlt: string): CmsImageData {
  if (!media || typeof media === 'string') {
    return null
  }

  if (!media.url) {
    return null
  }

  return {
    src: media.url,
    alt: media.alt || fallbackAlt,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}
