import { landingContent } from '@/content/landing'
import { Container } from '@/components/ui/Container'
import { PortraitPlaceholder } from '@/components/landing/PortraitPlaceholder'

export function QuoteBand() {
  const { quote } = landingContent

  return (
    <section className="bg-brand py-20">
      <Container>
        <div className="mx-auto grid max-w-4xl items-center gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
          <PortraitPlaceholder
            alt={quote.imageAlt}
            className="mx-auto w-full max-w-[14rem] lg:mx-0 lg:max-w-none"
            variant="onBrand"
          />

          <blockquote className="text-center lg:text-left">
            <p className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] leading-relaxed font-light text-foreground italic">
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
