import type { ContactPageData, SiteSettingsData } from '@/lib/cms/types'
import {
  contactAddressClassName,
  contactLinkClassName,
  sectionLabelClassName,
} from '@/lib/ui/typography'

type ContactLocationProps = {
  site: SiteSettingsData
  mapsEmbedSrc: ContactPageData['mapsEmbedSrc']
}

export function ContactLocation({ site, mapsEmbedSrc }: ContactLocationProps) {
  return (
    <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12 lg:items-start">
      <div className="space-y-12">
        <div>
          <h2 className={sectionLabelClassName}>Téléphone</h2>
          <ul className="mt-4 list-none space-y-2">
            {site.contact.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className={contactLinkClassName}>
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={sectionLabelClassName}>E-mail</h2>
          <ul className="mt-4 list-none space-y-2">
            {site.contact.emails.map((email) => (
              <li key={email.href}>
                <a href={email.href} className={contactLinkClassName}>
                  {email.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={sectionLabelClassName}>Adresse</h2>
          <address className={`mt-4 ${contactAddressClassName}`}>
            {site.address.street}
            <br />
            {site.address.city}
          </address>
        </div>
      </div>

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
