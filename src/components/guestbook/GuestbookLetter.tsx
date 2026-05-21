import { CmsRichText } from '@/components/cms/CmsRichText'
import type { GuestbookPageData } from '@/lib/cms/types'

type GuestbookLetterProps = {
  letter: GuestbookPageData['letter']
}

export function GuestbookLetter({ letter }: GuestbookLetterProps) {
  return (
    <article className="mb-20 max-w-2xl">
      {letter.title && (
        <h2 className="mb-8 font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.2] font-light text-foreground">
          {letter.title}
        </h2>
      )}
      <CmsRichText data={letter.content} />
      {letter.signature && (
        <p className="mt-8 font-serif text-base text-foreground italic">{letter.signature}</p>
      )}
    </article>
  )
}
