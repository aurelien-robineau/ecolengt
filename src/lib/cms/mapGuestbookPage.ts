import type { GuestbookPage as GuestbookPageDoc } from '@/payload-types'
import { defaultGuestbookPage } from '@/lib/cms/defaults'
import { mapRichText } from '@/lib/cms/mapRichText'
import { studentPageHref } from '@/lib/cms/studentPageHref'
import type { GuestbookPageData } from '@/lib/cms/types'
import type { Eleve } from '@/payload-types'

function testimonialPageHref(student: Eleve | string | null | undefined): string | null {
  if (!student || typeof student === 'string') {
    return null
  }

  return studentPageHref(student.slug)
}

export function mapGuestbookPage(
  data: GuestbookPageDoc | null | undefined,
): GuestbookPageData {
  if (!data) {
    return defaultGuestbookPage
  }

  const testimonials =
    data.testimonials
      ?.map((item) => {
        const content = mapRichText(item.content)
        if (!content || !item.author) {
          return null
        }

        return {
          content,
          author: item.author,
          pageHref: testimonialPageHref(item.student),
        }
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? []

  return {
    letter: {
      title: data.letterTitle ?? '',
      content: mapRichText(data.letterContent),
      signature: data.letterSignature ?? '',
    },
    testimonials,
  }
}
