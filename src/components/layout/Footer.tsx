import Link from 'next/link'

import { SocialLinks } from '@/components/social/SocialLinks'
import { cn } from '@/lib/cn'
import { resolveHashHref } from '@/lib/resolveHashHref'
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

const footerLinkClassName =
  'block text-base leading-normal text-foreground-inverse-muted no-underline transition-colors duration-150 hover:text-foreground-inverse'

export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear()
  const hasContactInNav = site.navigation.some((item) => item.href === routes.contact)

  return (
    <footer className="bg-foreground py-20 text-foreground-inverse-muted">
      <Container>
        <div className={stackBlockClassName}>
          <Logo variant="white" href={undefined} className="mb-6 max-h-11" />
          <p className="font-serif text-base text-foreground-inverse">{site.name}</p>
        </div>

        <div
          className={cn(
            stackBlockClassName,
            'grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-16',
          )}
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
              Navigation
            </h2>
            <nav aria-label="Pages du site">
              <ul className={cn(stackListClassName, 'list-none')}>
                {site.navigation.map((item) => (
                  <li key={item.href}>
                    <a href={resolveHashHref(item.href)} className={footerLinkClassName}>
                      {item.label}
                    </a>
                  </li>
                ))}
                {!hasContactInNav ? (
                  <li>
                    <Link href={routes.contact} className={footerLinkClassName}>
                      Contact
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className={cn(sectionLabelInverseClassName, stackColumnLabelClassName)}>
              Ressources
            </h2>
            <Link href={routes.leTrainMetronome} className={footerLinkClassName}>
              Le Train – Métronome
            </Link>
          </div>

          {(site.social.instagram || site.social.facebook) && (
            <div>
              <h2 className={cn(sectionLabelInverseClassName, stackColumnLabelClassName)}>
                Réseaux sociaux
              </h2>
              <SocialLinks site={site} variant="footer" />
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
