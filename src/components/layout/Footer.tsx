import Link from 'next/link'

import { ExternalLink } from '@/lib/a11y/externalLink'
import { AddressContent } from '@/components/ui/AddressContent'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { routes } from '@/config/routes'
import type { SiteSettingsData } from '@/lib/content'

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
        </div>

        <div className="mb-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <h2 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">Adresse</h2>
            <AddressContent
              street={site.address.street}
              streetLine2={site.address.streetLine2}
              postalCode={site.address.postalCode}
              city={site.address.city}
              mapsUrl={site.address.mapsUrl}
              className="text-sm leading-8"
              linkClassName="text-foreground-subtle hover:text-brand"
            />
          </div>

          <div>
            <h2 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">Contact</h2>
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

          {(site.social.instagram || site.social.facebook) && (
            <div>
              <h2 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">
                Réseaux sociaux
              </h2>
              {site.social.instagram && (
                <ExternalLink
                  href={site.social.instagram}
                  className="block text-sm leading-8 no-underline transition-colors hover:text-brand"
                >
                  Instagram
                </ExternalLink>
              )}
              {site.social.facebook && (
                <ExternalLink
                  href={site.social.facebook}
                  className="block text-sm leading-8 no-underline transition-colors hover:text-brand"
                >
                  Facebook
                </ExternalLink>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#222] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#606060]">
            © {year} {site.name}
          </p>
          <Link
            href={routes.legalNotice}
            className="text-xs text-[#606060] no-underline transition-colors hover:text-brand"
          >
            Mentions Légales & Politique de Confidentialité
          </Link>
        </div>
      </Container>
    </footer>
  )
}
