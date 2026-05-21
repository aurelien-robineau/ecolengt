import type { GuestbookPageData } from '@/lib/cms/types'

type GuestbookLetterProps = {
  letter: GuestbookPageData['letter']
}

export function GuestbookLetter({ letter }: GuestbookLetterProps) {
  return (
    <article className="mb-20 max-w-2xl">
      <h2 className="mb-8 font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.2] font-light text-foreground">
        {letter.title}
      </h2>
      <div className="space-y-2 text-sm leading-[1.9] text-foreground-muted">
        {letter.content.map((paragraph, index) => (
          <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-8 font-serif text-base text-foreground italic">{letter.signature}</p>
    </article>
  )
}
