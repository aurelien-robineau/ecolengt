import type { GuestbookPage as GuestbookPageDoc } from '@/payload-types'
import { defaultGuestbookPage } from '../../defaults'
import { mapRichText } from '../shared/mapRichText'
import { studentPageHref } from '@/lib/content/utils/studentPageHref'
import type { GuestbookPageData } from '@/lib/content/types'
import type { Eleve } from '@/payload-types'

function testimonialPageHref(student: Eleve | string | null | undefined): string | null {
  if (!student || typeof student === 'string') {
    return null
  }

  return studentPageHref(student.slug)
}

export function mapGuestbookPage(data: GuestbookPageDoc | null | undefined): GuestbookPageData {
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
    introduction: mapRichText(data.introduction),
    testimonials,
  }
}
