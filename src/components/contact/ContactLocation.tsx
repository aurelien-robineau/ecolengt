import type { ReactNode } from 'react'

import { LocationMap } from '@/components/location/LocationMap'
import { AddressContent } from '@/components/ui/AddressContent'
import type { SiteSettingsData } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { hasMapCoordinates } from '@/lib/maps/hasMapCoordinates'
import {
  contactItemLabelClassName,
  contactLinkValueClassName,
  contactValueClassName,
  sectionLabelClassName,
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
      <h2 className={cn(sectionLabelClassName, 'mb-4')}>{label}</h2>
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
        'mb-16 grid gap-10',
        hasMap && 'lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12 lg:items-start',
      )}
    >
      <aside className="border border-brand-border bg-brand-dim p-6 md:p-8">
        <ContactInfoBlock label="Téléphone" className="pt-0">
          <ul className="list-none space-y-4">
            {site.contact.phones.map((phone) => (
              <li key={phone.href}>
                {phone.label ? (
                  <span className={contactItemLabelClassName}>{phone.label}</span>
                ) : null}
                <a href={phone.href} className={contactLinkValueClassName}>
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </ContactInfoBlock>

        <ContactInfoBlock label="E-mail">
          <ul className="list-none space-y-4">
            {site.contact.emails.map((email) => (
              <li key={email.href}>
                {email.label ? (
                  <span className={contactItemLabelClassName}>{email.label}</span>
                ) : null}
                <a href={email.href} className={contactLinkValueClassName}>
                  {email.display}
                </a>
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
      </aside>

      {hasMap ? (
        <LocationMap
          title={`Plan d’accès — ${site.name}`}
          latitude={address.mapLatitude!}
          longitude={address.mapLongitude!}
          googleMapsUrl={address.mapsUrl || undefined}
          embedClassName="lg:min-h-[28rem]"
        />
      ) : null}
    </div>
  )
}
