import type { ReactNode } from 'react'

import { AddressContent } from '@/components/ui/AddressContent'
import type { ContactPageData, SiteSettingsData } from '@/lib/cms/types'
import { cn } from '@/lib/cn'
import {
  contactLinkValueClassName,
  contactValueClassName,
  sectionLabelClassName,
} from '@/lib/ui/typography'

type ContactLocationProps = {
  site: SiteSettingsData
  mapsEmbedSrc: ContactPageData['mapsEmbedSrc']
}

type ContactInfoBlockProps = {
  label: string
  children: ReactNode
  className?: string
}

function ContactInfoBlock({ label, children, className }: ContactInfoBlockProps) {
  return (
    <div className={cn('border-b border-brand-border/50 py-6 last:border-b-0 last:pb-0', className)}>
      <h2 className={cn(sectionLabelClassName, 'mb-4')}>{label}</h2>
      {children}
    </div>
  )
}

export function ContactLocation({ site, mapsEmbedSrc }: ContactLocationProps) {
  return (
    <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12 lg:items-start">
      <aside className="border border-brand-border bg-brand-dim p-6 md:p-8">
        <ContactInfoBlock label="Téléphone" className="pt-0">
          <ul className="list-none space-y-3">
            {site.contact.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className={contactLinkValueClassName}>
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </ContactInfoBlock>

        <ContactInfoBlock label="E-mail">
          <ul className="list-none space-y-3">
            {site.contact.emails.map((email) => (
              <li key={email.href}>
                <a href={email.href} className={contactLinkValueClassName}>
                  {email.display}
                </a>
              </li>
            ))}
          </ul>
        </ContactInfoBlock>

        <ContactInfoBlock label="Adresse">
          <AddressContent
            street={site.address.street}
            city={site.address.city}
            mapsUrl={site.address.mapsUrl}
            className={contactValueClassName}
            linkClassName={contactLinkValueClassName}
          />
        </ContactInfoBlock>
      </aside>

      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-muted lg:aspect-auto lg:min-h-[28rem]">
        <iframe
          src={mapsEmbedSrc}
          title={`Plan d’accès — ${site.name}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
