import type { IntensiveCoursesPage as IntensiveCoursesPageDoc } from '@/payload-types'
import { defaultIntensiveCoursesPage } from '../../defaults'
import { mapGallery } from '../shared/mapGallery'
import { mapRichText } from '../shared/mapRichText'
import type { IntensiveCoursesPageData } from '@/lib/content/types'

export function mapIntensiveCoursesPage(
  data: IntensiveCoursesPageDoc | null | undefined,
): IntensiveCoursesPageData {
  if (!data) {
    return defaultIntensiveCoursesPage
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
