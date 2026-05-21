import type { ContactPage as ContactPageDoc } from '@/payload-types'
import { defaultContactPage } from '@/lib/cms/defaults'
import { extractMapsEmbedSrc } from '@/lib/cms/extractMapsEmbedSrc'
import { mapGallery } from '@/lib/cms/mapGallery'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { ContactPageData } from '@/lib/cms/types'

export function mapContactPage(data: ContactPageDoc | null | undefined): ContactPageData {
  if (!data) {
    return defaultContactPage
  }

  const mapsEmbedSrc = extractMapsEmbedSrc(data.mapsEmbed) ?? defaultContactPage.mapsEmbedSrc

  return {
    intro: mapRichText(data.introContent),
    accessGallery: mapGallery(data.accessGallery),
    mapsEmbedSrc,
  }
}
