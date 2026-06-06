import { CmsImage } from '@/components/cms/CmsImage'
import { Container } from '@/components/ui/Container'
import { PortraitPlaceholder } from '@/components/landing/PortraitPlaceholder'
import type { LandingPageData } from '@/lib/content/types'

type QuoteBandProps = {
  quote: LandingPageData['quote']
}

const portraitFrameClassName =
  'relative mx-auto aspect-4/5 w-full max-w-[18rem] overflow-hidden bg-foreground/8 ring-1 ring-foreground/10 sm:max-w-[20rem] lg:mx-0 lg:max-w-none'

export function QuoteBand({ quote }: QuoteBandProps) {
  return (
    <section className="bg-brand py-16 md:py-20">
      <Container>
        <div className="grid max-w-2xl items-center gap-8 md:gap-12 lg:max-w-4xl lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
          <div className={portraitFrameClassName}>
            {quote.portrait ? (
              <CmsImage
                image={quote.portrait}
                fill
                sizes="(max-width: 640px) 20rem, 14rem"
                priority
              />
            ) : (
              <PortraitPlaceholder alt={quote.imageAlt} />
            )}
          </div>

          <blockquote className="text-start">
            <p className="type-section-title text-[clamp(1.375rem,3vw,2rem)] text-foreground italic">
              « {quote.text} »
            </p>
            <cite className="mt-6 block text-xs tracking-[var(--tracking-widest)] text-foreground-subtle uppercase not-italic">
              — {quote.cite}
            </cite>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}
