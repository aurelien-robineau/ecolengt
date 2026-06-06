import type { ReactNode } from 'react'

import { ExternalLink } from '@/lib/a11y/externalLink'
import { LocationMap } from '@/components/location/LocationMap'
import { AddressContent } from '@/components/ui/AddressContent'
import type { SiteSettingsData } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { hasMapCoordinates } from '@/lib/maps/hasMapCoordinates'
import { ContactChannelItem } from '@/components/contact/ContactChannelItem'
import {
  contactItemLabelClassName,
  contactLinkValueClassName,
  contactValueClassName,
  sectionLabelClassName,
  stackBlockClassName,
  stackTitleClassName,
  gridGapClassName,
} from '@/lib/ui/typography'

type ContactLocationProps = {
  site: SiteSettingsData
}

type ContactInfoBlockProps = {
  label: string
  children: ReactNode
  className?: string
}

function ContactInfoBlock({ label, children, className }: ContactInfoBlockProps) {
  return (
    <div
      className={cn('border-b border-brand-border/50 py-6 last:border-b-0 last:pb-0', className)}
    >
      <h2 className={cn(sectionLabelClassName, stackTitleClassName)}>{label}</h2>
      {children}
    </div>
  )
}

export function ContactLocation({ site }: ContactLocationProps) {
  const { address } = site
  const hasMap = hasMapCoordinates(address)

  return (
    <div
      className={cn(
        stackBlockClassName,
        'grid',
        gridGapClassName,
        hasMap && 'lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start',
      )}
    >
      <aside className="callout-surface bleed-x-sm bg-brand-dim card-pad">
        <ContactInfoBlock label="Téléphone" className="pt-0">
          <ul className="list-none space-y-4">
            {site.contact.phones.map((phone) => (
              <li key={phone.href}>
                <ContactChannelItem
                  href={phone.href}
                  display={phone.display}
                  label={phone.label}
                  linkClassName={contactLinkValueClassName}
                  labelClassName={contactItemLabelClassName}
                />
              </li>
            ))}
          </ul>
        </ContactInfoBlock>

        <ContactInfoBlock label="E-mail">
          <ul className="list-none space-y-4">
            {site.contact.emails.map((email) => (
              <li key={email.href}>
                <ContactChannelItem
                  href={email.href}
                  display={email.display}
                  label={email.label}
                  linkClassName={contactLinkValueClassName}
                  labelClassName={contactItemLabelClassName}
                />
              </li>
            ))}
          </ul>
        </ContactInfoBlock>

        <ContactInfoBlock label="Adresse">
          <AddressContent
            street={address.street}
            streetLine2={address.streetLine2}
            postalCode={address.postalCode}
            city={address.city}
            mapsUrl={address.mapsUrl}
            className={contactValueClassName}
            linkClassName={contactLinkValueClassName}
          />
        </ContactInfoBlock>

        {site.social.instagram || site.social.facebook ? (
          <ContactInfoBlock label="Réseaux sociaux">
            <div className="space-y-4">
              {site.social.instagram ? (
                <ExternalLink href={site.social.instagram} className={contactLinkValueClassName}>
                  Instagram
                </ExternalLink>
              ) : null}
              {site.social.facebook ? (
                <ExternalLink href={site.social.facebook} className={contactLinkValueClassName}>
                  Facebook
                </ExternalLink>
              ) : null}
            </div>
          </ContactInfoBlock>
        ) : null}
      </aside>

      {hasMap ? (
        <LocationMap
          title={`Plan d’accès — ${site.name}`}
          latitude={address.mapLatitude!}
          longitude={address.mapLongitude!}
          googleMapsUrl={address.mapsUrl || undefined}
        />
      ) : null}
    </div>
  )
}
