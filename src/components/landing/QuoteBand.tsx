import { CmsImage } from '@/components/cms/CmsImage'
import { Container } from '@/components/ui/Container'
import { PortraitPlaceholder } from '@/components/landing/PortraitPlaceholder'
import type { LandingPageData } from '@/lib/cms/types'

type QuoteBandProps = {
  quote: LandingPageData['quote']
}

const portraitFrameClassName =
  'relative mx-auto aspect-4/5 w-full max-w-[14rem] overflow-hidden bg-foreground/8 ring-1 ring-foreground/10 lg:mx-0 lg:max-w-none'

export function QuoteBand({ quote }: QuoteBandProps) {
  return (
    <section className="bg-brand py-20">
      <Container>
        <div className="mx-auto grid max-w-4xl items-center gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
          <div className={portraitFrameClassName}>
            {quote.portrait ?
              <CmsImage image={quote.portrait} fill sizes="14rem" priority />
            : <PortraitPlaceholder alt={quote.imageAlt} embedded />}
          </div>

          <blockquote className="text-center lg:text-left">
            <p className="font-serif text-[clamp(1.375rem,3vw,2rem)] leading-relaxed font-light text-foreground italic">
              « {quote.text} »
            </p>
            <cite className="mt-6 block text-xs tracking-[0.15em] text-foreground/45 uppercase not-italic">
              — {quote.cite}
            </cite>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}
