import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { routes } from '@/config/routes'
import type { SiteSettingsData } from '@/lib/cms/types'
import {
  contactAddressOnDarkClassName,
  contactLinkOnDarkClassName,
  sectionLabelClassName,
} from '@/lib/ui/typography'

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
            <h4 className={`mb-4 ${sectionLabelClassName} text-brand`}>Adresse</h4>
            <address className={contactAddressOnDarkClassName}>
              {site.address.street}
              <br />
              {site.address.city}
            </address>
          </div>

          <div>
            <h4 className={`mb-4 ${sectionLabelClassName} text-brand`}>Contact</h4>
            <ul className="list-none space-y-2">
              {site.contact.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className={contactLinkOnDarkClassName}>
                    {phone.display}
                  </a>
                </li>
              ))}
              {site.contact.emails.map((email) => (
                <li key={email.href}>
                  <a href={email.href} className={contactLinkOnDarkClassName}>
                    {email.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {(site.social.instagram || site.social.facebook) && (
            <div>
              <h4 className={`mb-4 ${sectionLabelClassName} text-brand`}>Réseaux sociaux</h4>
              <ul className="list-none space-y-2">
                {site.social.instagram && (
                  <li>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkOnDarkClassName}
                    >
                      Instagram
                    </a>
                  </li>
                )}
                {site.social.facebook && (
                  <li>
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkOnDarkClassName}
                    >
                      Facebook
                    </a>
                  </li>
                )}
              </ul>
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
            Mentions légales
          </Link>
        </div>
      </Container>
    </footer>
  )
}
