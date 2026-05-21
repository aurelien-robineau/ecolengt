import { landingContent } from '@/content/landing'
import { Container } from '@/components/ui/Container'

export function QuoteBand() {
  const { quote } = landingContent

  return (
    <section className="bg-brand py-20">
      <Container>
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] leading-relaxed font-light text-foreground italic">
            « {quote.text} »
          </p>
          <cite className="mt-6 block text-xs tracking-[0.15em] text-foreground/45 uppercase not-italic">
            — {quote.cite}
          </cite>
        </blockquote>
      </Container>
    </section>
  )
}
