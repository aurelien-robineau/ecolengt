import type { IntensiveCoursesCalendarPage as IntensiveCoursesCalendarPageDoc } from '@/payload-types'
import { mapRichText } from '../shared/mapRichText'
import type { IntensiveCoursesCalendarPageData } from '@/lib/content/types'

const emptyCalendarPage: IntensiveCoursesCalendarPageData = {
  intro: null,
  schoolYears: [],
}

export function mapIntensiveCoursesCalendarPage(
  data: IntensiveCoursesCalendarPageDoc | null | undefined,
): IntensiveCoursesCalendarPageData {
  if (!data) {
    return emptyCalendarPage
  }

  return {
    intro: mapRichText(data.introContent),
    schoolYears: (data.schoolYears ?? []).map((year) => ({
      title: year.title?.trim() ?? '',
      content: mapRichText(year.content),
    })),
  }
}
