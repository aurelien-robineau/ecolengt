import { CmsImage } from '@/components/cms/CmsImage'
import { Container } from '@/components/ui/Container'
import { PortraitPlaceholder } from '@/components/landing/PortraitPlaceholder'
import { cn } from '@/lib/cn'
import type { LandingPageData } from '@/lib/content/types'

type QuoteBandProps = {
  quote: LandingPageData['quote']
}

const portraitBleedClassName = cn(
  'max-lg:-mx-8 max-lg:w-[calc(100%+4rem)] max-lg:max-w-[100vw]',
  'md:max-lg:-mx-16 md:max-lg:w-[calc(100%+8rem)]',
)

export function QuoteBand({ quote }: QuoteBandProps) {
  return (
    <section className="bg-brand max-lg:pt-0 pb-16 md:pb-24 lg:py-24">
      <Container>
        {/*
         * Below lg: full-bleed portrait, quote in container below.
         * lg+: portrait column + quote (original desktop layout).
         */}
        <div className="max-w-2xl lg:grid lg:max-w-4xl lg:grid-cols-[minmax(0,14rem)_1fr] lg:items-center lg:gap-16 xl:gap-20">
          <div
            className={cn(
              'relative overflow-hidden bg-foreground/8',
              portraitBleedClassName,
              'aspect-4/3 max-lg:mb-10',
              'lg:aspect-4/5 lg:w-full lg:rounded-md lg:border lg:border-foreground/10',
            )}
          >
            {quote.portrait ? (
              <CmsImage
                image={quote.portrait}
                fill
                sizes="(max-width: 1024px) 100vw, 14rem"
                priority
              />
            ) : (
              <PortraitPlaceholder alt={quote.imageAlt} />
            )}
          </div>

          <blockquote className="text-start lg:py-4">
            <p className="type-section-title text-[clamp(1.375rem,3vw,2.125rem)] leading-snug text-foreground italic">
              « {quote.text} »
            </p>
            <cite className="mt-8 block text-xs tracking-[var(--tracking-widest)] text-foreground-subtle uppercase not-italic">
              — {quote.cite}
            </cite>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}
