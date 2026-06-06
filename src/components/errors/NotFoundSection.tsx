import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'
import type { SiteSettingsData } from '@/lib/content/types'

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

      <Container className="relative text-center">
        <p className="animate-fade-up type-display mb-4 text-[clamp(5rem,18vw,9rem)] text-foreground">
          404
        </p>

        <h1 className="type-section-title animate-fade-up-delay-1 mb-4 text-[clamp(1.75rem,4vw,2.75rem)] text-balance">
          Page introuvable
        </h1>

        <p className="type-body animate-fade-up-delay-2 mx-auto mb-10 max-w-md text-foreground-muted">
          La page que vous cherchez n’existe pas, a été déplacée ou l’adresse est incorrecte.
        </p>

        <div className="animate-fade-up-delay-3 mx-auto grid w-full max-w-xs gap-4 sm:max-w-sm">
          <Button href={routes.home} className="w-full">
            Retour à l’accueil
          </Button>
          <Button href={routes.contact} variant="ghost" className="w-full">
            Nous contacter
          </Button>
        </div>

        <p className="animate-fade-up-delay-3 type-eyebrow mt-16">{site.name}</p>
      </Container>
    </section>
  )
}
