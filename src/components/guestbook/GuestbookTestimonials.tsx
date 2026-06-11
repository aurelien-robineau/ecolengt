import { CmsRichText } from '@/components/cms/CmsRichText'
import { PersonName } from '@/components/ui/PersonName'
import { cn } from '@/lib/cn'
import type { GuestbookTestimonial } from '@/lib/content/types'
import { pageSectionTitleClassName, stackSectionClassName } from '@/lib/ui/typography'

type GuestbookTestimonialsProps = {
  items: GuestbookTestimonial[]
}

export function GuestbookTestimonials({ items }: GuestbookTestimonialsProps) {
  if (!items.length) {
    return null
  }

  return (
    <section>
      <h2 className={cn(pageSectionTitleClassName, stackSectionClassName)}>Témoignages</h2>
      <ul className="flex list-none flex-col gap-8">
        {items.map((item, index) => (
          <li key={`${item.author}-${index}`}>
            <blockquote className="max-w-3xl rounded-r-md border-l border-brand bg-surface-card py-8 pl-6 pr-6 md:py-8 md:pl-8 md:pr-6">
              <CmsRichText data={item.content} />
              <footer className="mt-6 text-sm font-medium tracking-[var(--tracking-wide)] text-foreground-subtle uppercase">
                —{' '}
                <PersonName
                  name={item.author}
                  href={item.pageHref}
                  className="text-sm font-medium tracking-[var(--tracking-wide)] uppercase"
                />
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  )
}
