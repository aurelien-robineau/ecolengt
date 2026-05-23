import type { IntensiveCoursesCalendarPage as IntensiveCoursesCalendarPageDoc } from '@/payload-types'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { IntensiveCoursesCalendarPageData } from '@/lib/cms/types'

const emptyCalendarPage: IntensiveCoursesCalendarPageData = {
  schoolYears: [],
}

export function mapIntensiveCoursesCalendarPage(
  data: IntensiveCoursesCalendarPageDoc | null | undefined,
): IntensiveCoursesCalendarPageData {
  if (!data) {
    return emptyCalendarPage
  }

  return {
    schoolYears: (data.schoolYears ?? []).map((year) => ({
      title: year.title?.trim() ?? '',
      content: mapRichText(year.content),
    })),
  }
}
