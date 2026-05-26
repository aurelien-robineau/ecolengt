import { ExternalLink } from '@/lib/a11y/externalLink'
import type { SiteSettingsData } from '@/lib/content'
import { pageSectionTitleClassName } from '@/lib/ui/typography'

type ContactDetailsProps = {
  site: SiteSettingsData
}

export function ContactDetails({ site }: ContactDetailsProps) {
  const hasSocial = Boolean(site.social.instagram || site.social.facebook)

  if (!hasSocial) {
    return null
  }

  return (
    <div>
      <h2 className={`mb-8 ${pageSectionTitleClassName}`}>Réseaux sociaux</h2>
      {site.social.instagram && (
        <ExternalLink
          href={site.social.instagram}
          className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          Instagram
        </ExternalLink>
      )}
      {site.social.facebook && (
        <ExternalLink
          href={site.social.facebook}
          className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          Facebook
        </ExternalLink>
      )}
    </div>
  )
}
