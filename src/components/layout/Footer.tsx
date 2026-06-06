import Link from 'next/link'

import { ExternalLink } from '@/lib/a11y/externalLink'
import { cn } from '@/lib/cn'
import { ContactChannelItem } from '@/components/contact/ContactChannelItem'
import { AddressContent } from '@/components/ui/AddressContent'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { routes } from '@/config/routes'
import type { SiteSettingsData } from '@/lib/content/types'
import {
  contactGroupLabelInverseClassName,
  contactItemLabelInverseClassName,
  sectionLabelInverseClassName,
  stackBlockClassName,
  stackColumnLabelClassName,
  stackEyebrowClassName,
  stackListClassName,
} from '@/lib/ui/typography'

type FooterProps = {
  site: SiteSettingsData
}

export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-foreground py-20 text-foreground-inverse-muted">
      <Container>
        <div className={stackBlockClassName}>
          <Logo variant="white" href={undefined} className="mb-6 max-h-11" />
          <p className="font-serif text-base text-foreground-inverse">{site.name}</p>
        </div>

        <div
          className={cn(stackBlockClassName, 'grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16')}
        >
          <div>
            <h2 className={cn(sectionLabelInverseClassName, stackColumnLabelClassName)}>Adresse</h2>
            <AddressContent
              street={site.address.street}
              streetLine2={site.address.streetLine2}
              postalCode={site.address.postalCode}
              city={site.address.city}
              mapsUrl={site.address.mapsUrl}
              className="text-base leading-normal"
              linkClassName="text-foreground-inverse-muted transition-colors duration-150 hover:text-foreground-inverse"
            />
          </div>

          <div>
            <h2 className={cn(sectionLabelInverseClassName, stackColumnLabelClassName)}>Contact</h2>

            {site.contact.phones.length > 0 ? (
              <div>
                <p className={cn(contactGroupLabelInverseClassName, stackEyebrowClassName)}>
                  Téléphone
                </p>
                <div className={stackListClassName}>
                  {site.contact.phones.map((phone, index) => (
                    <ContactChannelItem
                      key={`${phone.href}-${index}`}
                      href={phone.href}
                      display={phone.display}
                      label={phone.label}
                      labelClassName={contactItemLabelInverseClassName}
                      linkClassName="text-base text-foreground-inverse-muted no-underline transition-colors duration-150 hover:text-foreground-inverse"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {site.contact.emails.length > 0 ? (
              <div
                className={cn(
                  site.contact.phones.length > 0 && 'mt-6 border-t border-border-inverse pt-6',
                )}
              >
                <p className={cn(contactGroupLabelInverseClassName, stackEyebrowClassName)}>
                  E-mail
                </p>
                <div className={stackListClassName}>
                  {site.contact.emails.map((email, index) => (
                    <ContactChannelItem
                      key={`${email.href}-${index}`}
                      href={email.href}
                      display={email.display}
                      label={email.label}
                      labelClassName={contactItemLabelInverseClassName}
                      linkClassName="text-base text-foreground-inverse-muted no-underline transition-colors duration-150 hover:text-foreground-inverse"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <h2 className={cn(sectionLabelInverseClassName, stackColumnLabelClassName)}>
              Ressources
            </h2>
            <Link
              href={routes.leTrainMetronome}
              className="block text-base leading-normal text-foreground-inverse-muted no-underline transition-colors duration-150 hover:text-foreground-inverse"
            >
              Le Train – Métronome
            </Link>
          </div>

          {(site.social.instagram || site.social.facebook) && (
            <div>
              <h2 className={cn(sectionLabelInverseClassName, stackColumnLabelClassName)}>
                Réseaux sociaux
              </h2>
              <div className={stackListClassName}>
                {site.social.instagram && (
                  <ExternalLink
                    href={site.social.instagram}
                    className="block text-base leading-normal text-foreground-inverse-muted no-underline transition-colors duration-150 hover:text-foreground-inverse"
                  >
                    Instagram
                  </ExternalLink>
                )}
                {site.social.facebook && (
                  <ExternalLink
                    href={site.social.facebook}
                    className="block text-base leading-normal text-foreground-inverse-muted no-underline transition-colors duration-150 hover:text-foreground-inverse"
                  >
                    Facebook
                  </ExternalLink>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-border-inverse pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground-inverse-muted">
            © {year} {site.name}
          </p>
          <Link
            href={routes.legalNotice}
            className="text-sm text-foreground-inverse-muted no-underline transition-colors duration-150 hover:text-foreground-inverse"
          >
            Mentions Légales & Politique de Confidentialité
          </Link>
        </div>
      </Container>
    </footer>
  )
}
