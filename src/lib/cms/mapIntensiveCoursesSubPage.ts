import { mapRichText } from '@/lib/cms/mapRichText'
import type { IntensiveCoursesSubPageData } from '@/lib/cms/types'

type IntensiveCoursesSubPageDoc = {
  content?: Parameters<typeof mapRichText>[0]
}

export function mapIntensiveCoursesSubPage(
  data: IntensiveCoursesSubPageDoc | null | undefined,
): IntensiveCoursesSubPageData {
  return {
    content: mapRichText(data?.content),
  }
}
