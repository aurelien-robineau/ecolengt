import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { HeroCircles } from '@/components/landing/HeroCircles'
import type { LandingPageData } from '@/lib/cms/types'

type HeroSectionProps = {
  hero: LandingPageData['hero']
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-surface-muted pb-32 pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_72%_38%,rgba(255,221,0,0.06)_0%,transparent_70%),radial-gradient(ellipse_40%_50%_at_15%_65%,rgba(255,221,0,0.03)_0%,transparent_60%),linear-gradient(160deg,#f4f4f4_0%,#f0f0f0_100%)]"
        aria-hidden
      />
      <HeroCircles />

      <Container className="relative">
        <p className="animate-fade-up mb-6 flex items-center gap-4 font-serif text-lg text-foreground-muted italic md:text-xl">
          <span className="block h-px w-10 bg-foreground-muted" aria-hidden />
          {hero.tagline}
        </p>

        <h1 className="animate-fade-up-delay-1 mb-3 font-serif leading-[1.05] font-light text-foreground">
          <span className="block max-md:whitespace-nowrap max-md:text-[clamp(2.25rem,9vw,3rem)] md:text-[clamp(3.25rem,7vw,6rem)]">
            {hero.name}
          </span>
          <em className="block text-foreground-muted max-md:whitespace-nowrap max-md:text-[clamp(2rem,8vw,2.625rem)] md:text-[clamp(3.25rem,7vw,6rem)]">
            {hero.subtitle}
          </em>
        </h1>

        <p className="animate-fade-up-delay-2 mb-12 text-[13px] tracking-[0.2em] text-foreground-subtle uppercase">
          {hero.location}
          {hero.founded ?
            <>
              <span className="mx-3 opacity-50">·</span>
              {hero.founded}
            </>
          : null}
        </p>

        <div className="animate-fade-up-delay-3">
          <Button href={hero.ctaHref}>{hero.cta}</Button>
        </div>
      </Container>
    </section>
  )
}
