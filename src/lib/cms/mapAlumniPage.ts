import type { AlumniPage as AlumniPageDoc } from '@/payload-types'
import { defaultAlumniPage } from '@/lib/cms/defaults'
import { mapRichText } from '@/lib/cms/mapRichText'
import { resolveListedPerson } from '@/lib/cms/studentPageHref'
import type { AlumniPageData } from '@/lib/cms/types'

type AlumniListEntry = NonNullable<AlumniPageDoc['alumniList']>[number]

function mapAlumniProjects(projects: AlumniListEntry['projects']): string | null {
  if (typeof projects === 'string') {
    const trimmed = projects.trim()
    return trimmed || null
  }

  if (Array.isArray(projects)) {
    const lines = projects
      .map((item) => (typeof item === 'object' && item && 'label' in item ? item.label : null))
      .filter((label): label is string => Boolean(label?.trim()))

    return lines.length > 0 ? lines.join('\n') : null
  }

  return null
}

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
          projects: mapAlumniProjects(entry.projects),
        }
      })
      .filter((entry) => entry.name) ?? []

  return {
    intro: mapRichText(data.introContent),
    students,
  }
}
