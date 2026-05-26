import type { Eleve } from '@/payload-types'
import { buildLexicalContent } from '@/lib/content/richtext/buildLexicalContent'
import type { CmsRichTextContent } from '@/lib/content/richtext/types'
import { studentPageHref } from '@/lib/content/utils/studentPageHref'
import type { StudentProfileData } from '@/lib/content/types'
import { splitParagraphs } from '@/lib/splitParagraphs'
import { mapMedia } from '../shared/mapMedia'
import { mapRichText } from '../shared/mapRichText'

function mapDescription(raw: Eleve['description']): CmsRichTextContent | null {
  if (!raw) {
    return null
  }

  if (typeof raw === 'string') {
    const paragraphs = splitParagraphs(raw)

    if (!paragraphs.length) {
      return null
    }

    return mapRichText(buildLexicalContent(paragraphs.map((text) => ({ type: 'paragraph', text }))))
  }

  return mapRichText(raw)
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
