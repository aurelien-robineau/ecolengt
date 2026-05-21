import type { GuestbookPage as GuestbookPageDoc } from '@/payload-types'
import { defaultGuestbookPage } from '@/lib/cms/defaults'
import { splitParagraphs } from '@/lib/splitParagraphs'
import type { GuestbookPageData } from '@/lib/cms/types'

export function mapGuestbookPage(
  data: GuestbookPageDoc | null | undefined,
): GuestbookPageData {
  if (!data) {
    return defaultGuestbookPage
  }

  const letterContent = data.letterContent || defaultGuestbookPage.letter.content.join('\n\n')
  const letterParagraphs = splitParagraphs(letterContent)

  const testimonials =
    data.testimonials?.length ?
      data.testimonials.map((item) => ({
        content: item.content || '',
        author: item.author || '',
      }))
    : defaultGuestbookPage.testimonials

  return {
    letter: {
      title: data.letterTitle || defaultGuestbookPage.letter.title,
      content: letterParagraphs.length ? letterParagraphs : defaultGuestbookPage.letter.content,
      signature: data.letterSignature || defaultGuestbookPage.letter.signature,
    },
    testimonials: testimonials.filter((item) => item.content && item.author),
  }
}
