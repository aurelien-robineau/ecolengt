import { CmsImage } from '@/components/cms/CmsImage'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { formatFoundedSince } from '@/lib/cms/formatAddress'
import { cn } from '@/lib/cn'
import type { LandingPageData, SiteSettingsData } from '@/lib/cms/types'

type HeroSectionProps = {
  hero: LandingPageData['hero']
  city: SiteSettingsData['address']['city']
  foundedYear: SiteSettingsData['foundedYear']
}

export function HeroSection({ hero, city, foundedYear }: HeroSectionProps) {
  const founded = formatFoundedSince(foundedYear)
  const cityLabel = city.trim()

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden bg-surface-muted pt-28 pb-12 md:min-h-screen md:justify-end md:pb-32"
    >
      {hero.backgroundImage ?
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <CmsImage
            image={hero.backgroundImage}
            className="absolute inset-0 object-[center_35%] md:object-center"
            sizes="100vw"
            priority
            decorative
          />
        </div>
      : null}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          hero.backgroundImage ?
            'bg-[radial-gradient(ellipse_55%_55%_at_72%_38%,rgba(255,221,0,0.08)_0%,transparent_70%),radial-gradient(ellipse_40%_50%_at_15%_65%,rgba(255,221,0,0.04)_0%,transparent_60%),linear-gradient(160deg,rgba(244,244,244,0.92)_0%,rgba(240,240,240,0.88)_100%)]'
          : 'bg-[radial-gradient(ellipse_55%_55%_at_72%_38%,rgba(255,221,0,0.06)_0%,transparent_70%),radial-gradient(ellipse_40%_50%_at_15%_65%,rgba(255,221,0,0.03)_0%,transparent_60%),linear-gradient(160deg,#f4f4f4_0%,#f0f0f0_100%)]',
        )}
        aria-hidden
      />

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

        {cityLabel || founded ?
          <p className="animate-fade-up-delay-2 mb-12 text-[13px] tracking-[0.2em] text-foreground-subtle uppercase">
            {cityLabel}
            {cityLabel && founded ?
              <span className="mx-3 opacity-50">·</span>
            : null}
            {founded}
          </p>
        : (
          <div className="mb-12" />
        )}

        {hero.cta && hero.ctaHref ?
          <div className="animate-fade-up-delay-3">
            <Button href={hero.ctaHref}>{hero.cta}</Button>
          </div>
        : null}
      </Container>
    </section>
  )
}
