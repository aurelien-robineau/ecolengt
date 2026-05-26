import type { Media } from '@/payload-types'
import { toNextImageSrc } from '@/lib/media/imageSrc'
import type { CmsImageData } from '@/lib/content/types'

export const DEFAULT_MEDIA_ALT =
  'Image probablement liée à la batterie (cours, instruments, scène ou activités de l’école).'

export function mapMedia(
  media: Media | string | null | undefined,
  fallbackAlt: string,
): CmsImageData {
  if (!media || typeof media === 'string') {
    return null
  }

  if (!media.url) {
    return null
  }

  return {
    src: toNextImageSrc(media.url),
    alt: media.alt?.trim() || fallbackAlt.trim() || DEFAULT_MEDIA_ALT,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}
