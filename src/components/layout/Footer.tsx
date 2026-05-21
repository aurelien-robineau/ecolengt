import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import type { SiteSettingsData } from '@/lib/cms/types'

type FooterProps = {
  site: SiteSettingsData
}

export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-foreground py-20 text-foreground-subtle">
      <Container>
        <div className="mb-14">
          <Logo variant="white" href={undefined} className="mb-5 max-h-11" />
          <p className="font-serif text-base text-surface-muted">{site.name}</p>
          <p className="font-serif text-base text-surface-muted">{site.subtitle}</p>
        </div>

        <div className="mb-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <h4 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">Adresse</h4>
            <address className="text-sm not-italic leading-8">
              {site.address.street}
              <br />
              {site.address.city}
            </address>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">Contact</h4>
            {site.contact.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="block text-sm leading-8 text-foreground-subtle no-underline transition-colors hover:text-brand"
              >
                {phone.display}
              </a>
            ))}
            {site.contact.emails.map((email) => (
              <a
                key={email.href}
                href={email.href}
                className="block text-sm leading-8 text-foreground-subtle no-underline transition-colors hover:text-brand"
              >
                {email.display}
              </a>
            ))}
          </div>

          <div>
            <h4 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">
              Réseaux sociaux
            </h4>
            <a
              href={site.social.instagram}
              className="block text-sm leading-8 no-underline transition-colors hover:text-brand"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              className="block text-sm leading-8 no-underline transition-colors hover:text-brand"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="border-t border-[#222] pt-8">
          <p className="text-xs text-[#606060]">
            © {year} {site.name} — {site.subtitle}
          </p>
        </div>
      </Container>
    </footer>
  )
}
