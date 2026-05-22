import type { ContactPageData, SiteSettingsData } from '@/lib/cms/types'

type ContactLocationProps = {
  site: SiteSettingsData
  mapsEmbedSrc: ContactPageData['mapsEmbedSrc']
}

export function ContactLocation({ site, mapsEmbedSrc }: ContactLocationProps) {
  return (
    <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12 lg:items-start">
      <div className="space-y-10">
        <div>
          <h2 className="mb-6 text-[11px] tracking-[0.2em] text-foreground uppercase">Téléphone</h2>
          {site.contact.phones.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
            >
              {phone.display}
            </a>
          ))}
        </div>

        <div>
          <h2 className="mb-6 text-[11px] tracking-[0.2em] text-foreground uppercase">E-mail</h2>
          {site.contact.emails.map((email) => (
            <a
              key={email.href}
              href={email.href}
              className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
            >
              {email.display}
            </a>
          ))}
        </div>

        <div>
          <h2 className="mb-6 text-[11px] tracking-[0.2em] text-foreground uppercase">Adresse</h2>
          <address className="text-sm not-italic leading-8 text-foreground-muted">
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
