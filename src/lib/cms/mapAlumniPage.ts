import type { AlumniPage as AlumniPageDoc } from '@/payload-types'
import { defaultAlumniPage } from '@/lib/cms/defaults'
import { mapRichText } from '@/lib/cms/mapRichText'
import { resolveListedPerson } from '@/lib/cms/studentPageHref'
import type { AlumniPageData } from '@/lib/cms/types'

export function mapAlumniPage(data: AlumniPageDoc | null | undefined): AlumniPageData {
  if (!data) {
    return defaultAlumniPage
  }

  const alumniEntries =
    data.alumniList ??
    (data as AlumniPageDoc & { students?: AlumniPageDoc['alumniList'] }).students

  const students =
    alumniEntries
      ?.map((entry) => {
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
      .filter((entry) => entry.name) ?? []

  return {
    intro: mapRichText(data.introContent),
    students,
  }
}
