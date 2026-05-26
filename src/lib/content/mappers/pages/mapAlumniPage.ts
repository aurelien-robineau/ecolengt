import type { AlumniPage as AlumniPageDoc } from '@/payload-types'
import { defaultAlumniPage } from '../../defaults'
import { mapRichText } from '../shared/mapRichText'
import { resolveListedPerson } from '@/lib/content/utils/studentPageHref'
import type { AlumniPageData } from '@/lib/content/types'

export function mapAlumniPage(data: AlumniPageDoc | null | undefined): AlumniPageData {
  if (!data) {
    return defaultAlumniPage
  }

  const alumniEntries =
    data.alumniList ?? (data as AlumniPageDoc & { students?: AlumniPageDoc['alumniList'] }).students

  const students =
    alumniEntries
      ?.map((entry) => {
        const { name, pageHref } = resolveListedPerson(entry.student, entry.name || '')

        return {
          name,
          pageHref,
          projects: typeof entry.projects === 'string' ? entry.projects.trim() || null : null,
        }
      })
      .filter((entry) => entry.name) ?? []

  return {
    intro: mapRichText(data.introContent),
    students,
  }
}
