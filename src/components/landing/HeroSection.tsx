import { CmsImage } from '@/components/cms/CmsImage'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { formatFoundedSince } from '@/lib/content'
import { sectionLabelClassName } from '@/lib/ui/typography'
import type { LandingPageData, SiteSettingsData } from '@/lib/content/types'

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
      className="relative flex flex-col overflow-hidden bg-surface-muted pt-28 pb-16 md:min-h-[92vh] md:justify-end md:pb-24 lg:pb-32"
    >
      {hero.backgroundImage ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <CmsImage
            image={hero.backgroundImage}
            className="absolute inset-0 object-[center_35%] md:object-center"
            sizes="100vw"
            priority
            decorative
          />
        </div>
      ) : null}
      {hero.backgroundImage ? (
        <div
          className="pointer-events-none absolute inset-0 bg-surface-muted"
          style={{ opacity: hero.overlayOpacity / 100 }}
          aria-hidden
        />
      ) : null}

      <Container className="relative">
        <p className="animate-fade-up type-lead mb-8 flex items-center gap-4 font-serif italic text-foreground-muted">
          <span className="block h-px w-10 bg-foreground-subtle" aria-hidden />
          {hero.tagline}
        </p>

        <h1 className="animate-fade-up-delay-1 type-display mb-4 text-foreground">
          <span className="block max-md:whitespace-nowrap max-md:text-[clamp(2.25rem,9vw,3rem)] md:text-[clamp(3rem,7vw,5.5rem)]">
            {hero.name}
          </span>
          <em className="block font-normal text-foreground-muted max-md:whitespace-nowrap max-md:text-[clamp(1.75rem,6.5vw,2.5rem)] md:text-[clamp(2rem,4.5vw,3.5rem)]">
            {hero.subtitle}
          </em>
        </h1>

        {cityLabel || founded ? (
          <p className={cn('animate-fade-up-delay-2 mb-14', sectionLabelClassName)}>
            {cityLabel}
            {cityLabel && founded ? <span className="mx-3 text-foreground-subtle">·</span> : null}
            {founded}
          </p>
        ) : (
          <div className="mb-14" />
        )}

        {hero.cta && hero.ctaHref ? (
          <div className="animate-fade-up-delay-3">
            <Button href={hero.ctaHref}>{hero.cta}</Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
