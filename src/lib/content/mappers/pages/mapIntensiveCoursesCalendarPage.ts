import type { IntensiveCoursesCalendarPage as IntensiveCoursesCalendarPageDoc } from '@/payload-types'
import { defaultIntensiveCoursesCalendarPage } from '../../defaults'
import { mapRichText } from '../shared/mapRichText'
import type { IntensiveCoursesCalendarPageData } from '@/lib/content/types'

export function mapIntensiveCoursesCalendarPage(
  data: IntensiveCoursesCalendarPageDoc | null | undefined,
): IntensiveCoursesCalendarPageData {
  if (!data) {
    return defaultIntensiveCoursesCalendarPage
  }

  return {
    intro: mapRichText(data.introContent),
    schoolYears: (data.schoolYears ?? []).map((year) => ({
      title: year.title?.trim() ?? '',
      content: mapRichText(year.content),
    })),
  }
}
