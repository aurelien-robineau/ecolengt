import type { SiteSettingsData } from '@/lib/cms/types'

type ContactDetailsProps = {
  site: SiteSettingsData
}

export function ContactDetails({ site }: ContactDetailsProps) {
  const hasSocial = site.social.instagram !== '#' || site.social.facebook !== '#'

  if (!hasSocial) {
    return null
  }

  return (
    <div>
      <h2 className="mb-6 text-[11px] tracking-[0.2em] text-foreground uppercase">
        Réseaux sociaux
      </h2>
      {site.social.instagram !== '#' && (
        <a
          href={site.social.instagram}
          className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          Instagram
        </a>
      )}
      {site.social.facebook !== '#' && (
        <a
          href={site.social.facebook}
          className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          Facebook
        </a>
      )}
    </div>
  )
}
