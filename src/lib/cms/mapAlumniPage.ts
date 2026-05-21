import type { AlumniPage as AlumniPageDoc } from '@/payload-types'
import { defaultAlumniPage } from '@/lib/cms/defaults'
import { resolveListedPerson } from '@/lib/cms/studentPageHref'
import { splitParagraphs } from '@/lib/splitParagraphs'
import type { AlumniPageData } from '@/lib/cms/types'

export function mapAlumniPage(data: AlumniPageDoc | null | undefined): AlumniPageData {
  if (!data) {
    return defaultAlumniPage
  }

  const introText = data.introText || defaultAlumniPage.intro.join('\n\n')
  const intro = splitParagraphs(introText)

  const alumniEntries =
    data.alumniList ??
    (data as AlumniPageDoc & { students?: AlumniPageDoc['alumniList'] }).students

  const students =
    alumniEntries?.length ?
      alumniEntries
        .map((entry) => {
          const { name, pageHref } = resolveListedPerson(entry.student, entry.name || '')

          return {
            name,
            pageHref,
            projects:
              entry.projects
                ?.map((project) => project.label)
                .filter((label): label is string => Boolean(label)) ?? [],
          }
        })
        .filter((entry) => entry.name)
    : defaultAlumniPage.students

  return {
    intro: intro.length ? intro : defaultAlumniPage.intro,
    students,
  }
}
