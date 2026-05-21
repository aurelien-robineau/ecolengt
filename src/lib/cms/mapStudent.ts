import type { Eleve } from '@/payload-types'
import { mapMedia } from '@/lib/cms/mapMedia'
import { splitParagraphs } from '@/lib/splitParagraphs'
import { studentPageHref } from '@/lib/cms/studentPageHref'
import type { StudentProfileData } from '@/lib/cms/types'

export function mapStudent(doc: Eleve): StudentProfileData | null {
  const href = studentPageHref(doc.slug)

  if (!href) {
    return null
  }

  const photos =
    doc.photos
      ?.map((entry) => mapMedia(entry.image, doc.name))
      .filter((image): image is NonNullable<typeof image> => image !== null) ?? []

  const description = doc.description ? splitParagraphs(doc.description) : []

  return {
    slug: doc.slug!,
    name: doc.name,
    quote: doc.quote?.trim() || null,
    photos,
    jobTitle: doc.jobTitle?.trim() || null,
    description,
    pageHref: href,
  }
}
