import { FormattedParagraph } from '@/components/ui/FormattedParagraph'
import { PersonName } from '@/components/ui/PersonName'
import type { GuestbookTestimonial } from '@/lib/cms/types'
import { splitParagraphs } from '@/lib/splitParagraphs'

type GuestbookTestimonialsProps = {
  items: GuestbookTestimonial[]
}

export function GuestbookTestimonials({ items }: GuestbookTestimonialsProps) {
  if (!items.length) {
    return null
  }

  return (
    <section aria-label="Témoignages">
      <h2 className="mb-10 text-[11px] tracking-[0.2em] text-foreground uppercase">Témoignages</h2>
      <ul className="flex list-none flex-col gap-14 md:gap-16">
        {items.map((item, index) => {
          const paragraphs = splitParagraphs(item.content)

          return (
            <li key={`${item.author}-${index}`}>
              <blockquote className="max-w-3xl border-l-2 border-brand pl-6 md:pl-8">
                <div className="space-y-2">
                  {paragraphs.map((paragraph, pIndex) => (
                    <FormattedParagraph
                      key={`${pIndex}-${paragraph.slice(0, 16)}`}
                      className="text-sm leading-[1.9] text-foreground-muted md:text-[0.9375rem]"
                    >
                      {paragraph}
                    </FormattedParagraph>
                  ))}
                </div>
                <footer className="mt-6 text-xs tracking-[0.12em] text-foreground-subtle uppercase">
                  —{' '}
                  <PersonName
                    name={item.author}
                    href={item.pageHref}
                    className="text-xs tracking-[0.12em] uppercase"
                  />
                </footer>
              </blockquote>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
