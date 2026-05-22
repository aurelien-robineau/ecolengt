import { HeroCircles } from '@/components/landing/HeroCircles'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'
import type { SiteSettingsData } from '@/lib/cms/types'

type NotFoundSectionProps = {
  site: SiteSettingsData
}

export function NotFoundSection({ site }: NotFoundSectionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-12rem)] flex-col justify-center overflow-hidden bg-surface-muted py-(--spacing-section-mobile) pt-28 md:min-h-[calc(100vh-10rem)] md:py-(--spacing-section)">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_72%_38%,rgba(255,221,0,0.06)_0%,transparent_70%),radial-gradient(ellipse_40%_50%_at_15%_65%,rgba(255,221,0,0.03)_0%,transparent_60%),linear-gradient(160deg,#f4f4f4_0%,#f0f0f0_100%)]"
        aria-hidden
      />
      <HeroCircles />

      <Container className="relative text-center">
        <p className="animate-fade-up mb-4 font-serif text-[clamp(5rem,18vw,9rem)] leading-none font-light text-brand">
          404
        </p>

        <h1 className="animate-fade-up-delay-1 mb-4 font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] font-light text-foreground">
          Page introuvable
        </h1>

        <p className="animate-fade-up-delay-2 mx-auto mb-10 max-w-md text-sm leading-[1.9] text-foreground-muted lg:max-w-none lg:whitespace-nowrap">
          La page que vous cherchez n’existe pas, a été déplacée ou l’adresse est incorrecte.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-wrap items-center justify-center gap-4">
          <Button href={routes.home}>Retour à l’accueil</Button>
          <Button href={routes.contact} variant="ghost" className="px-9 text-xs tracking-[0.15em]">
            Nous contacter
          </Button>
        </div>

        <p className="animate-fade-up-delay-3 mt-16 text-xs tracking-[0.2em] text-foreground-subtle uppercase">
          {site.name}
        </p>
      </Container>
    </section>
  )
}
