import type { IntensiveCoursesPage as IntensiveCoursesPageDoc } from '@/payload-types'
import { extractMapsEmbedSrc } from '@/lib/cms/extractMapsEmbedSrc'
import { mapGallery } from '@/lib/cms/mapGallery'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { IntensiveCoursesPageData } from '@/lib/cms/types'

const emptyIntensiveCoursesPage: IntensiveCoursesPageData = {
  intro: null,
  gallery: [],
  blocks: [],
  access: {
    address: { street: '', postalCode: '', city: '', mapsUrl: '' },
    mapsEmbedSrc: '',
    directions: null,
    gallery: [],
  },
}

export function mapIntensiveCoursesPage(
  data: IntensiveCoursesPageDoc | null | undefined,
): IntensiveCoursesPageData {
  if (!data) {
    return emptyIntensiveCoursesPage
  }

  return {
    intro: mapRichText(data.introContent),
    gallery: mapGallery(data.gallery),
    blocks: (data.blocks ?? []).map((block) => ({
      title: block.title?.trim() ?? '',
      content: mapRichText(block.content),
    })),
    access: {
      address: {
        street: data.accessAddressStreet?.trim() ?? '',
        postalCode: '',
        city: data.accessAddressCity?.trim() ?? '',
        mapsUrl: data.accessMapsUrl?.trim() ?? '',
      },
      mapsEmbedSrc: extractMapsEmbedSrc(data.accessMapsEmbed) ?? '',
      directions: mapRichText(data.accessDirectionsContent),
      gallery: mapGallery(data.accessGallery),
    },
  }
}
