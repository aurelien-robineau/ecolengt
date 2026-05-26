import type { Eleve } from '@/payload-types'
import { buildLexicalContent } from '@/lib/content/richtext/buildLexicalContent'
import { hasLexicalContent } from '@/lib/content/richtext/hasLexicalContent'
import { mapMedia } from '../shared/mapMedia'
import { studentPageHref } from '@/lib/content/utils/studentPageHref'
import type { StudentProfileData } from '@/lib/content/types'
import { splitParagraphs } from '@/lib/splitParagraphs'

type StudentDescription = NonNullable<Eleve['description']>

function mapDescription(raw: Eleve['description']): StudentDescription | null {
  if (!raw) {
    return null
  }

  if (typeof raw === 'string') {
    const paragraphs = splitParagraphs(raw)

    if (!paragraphs.length) {
      return null
    }

    return buildLexicalContent(paragraphs.map((text) => ({ type: 'paragraph', text })))
  }

  return hasLexicalContent(raw) ? raw : null
}

export function mapStudent(doc: Eleve): StudentProfileData | null {
  const href = studentPageHref(doc.slug)

  if (!href) {
    return null
  }

  const photos =
    doc.photos
      ?.map((entry) => mapMedia(entry.image, doc.name))
      .filter((image): image is NonNullable<typeof image> => image !== null) ?? []

  return {
    slug: doc.slug!,
    name: doc.name,
    quote: doc.quote?.trim() || null,
    photos,
    jobTitle: doc.jobTitle?.trim() || null,
    description: mapDescription(doc.description),
    pageHref: href,
  }
}
