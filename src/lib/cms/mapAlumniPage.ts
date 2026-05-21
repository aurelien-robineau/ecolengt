import type { AlumniPage as AlumniPageDoc } from '@/payload-types'
import { defaultAlumniPage } from '@/lib/cms/defaults'
import { splitParagraphs } from '@/lib/splitParagraphs'
import type { AlumniPageData } from '@/lib/cms/types'

export function mapAlumniPage(data: AlumniPageDoc | null | undefined): AlumniPageData {
  if (!data) {
    return defaultAlumniPage
  }

  const introText = data.introText || defaultAlumniPage.intro.join('\n\n')
  const intro = splitParagraphs(introText)

  const students =
    data.students?.length ?
      data.students
        .map((student) => ({
          name: student.name || '',
          projects:
            student.projects
              ?.map((entry) => entry.label)
              .filter((label): label is string => Boolean(label)) ?? [],
        }))
        .filter((student) => student.name)
    : defaultAlumniPage.students

  return {
    intro: intro.length ? intro : defaultAlumniPage.intro,
    students,
  }
}
