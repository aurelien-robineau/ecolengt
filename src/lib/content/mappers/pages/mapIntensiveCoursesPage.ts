import type { IntensiveCoursesPage as IntensiveCoursesPageDoc } from '@/payload-types'
import { mapGallery } from '../shared/mapGallery'
import { mapRichText } from '../shared/mapRichText'
import type { IntensiveCoursesPageData } from '@/lib/content/types'

const emptyIntensiveCoursesPage: IntensiveCoursesPageData = {
  intro: null,
  gallery: [],
  blocks: [],
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
  }
}
