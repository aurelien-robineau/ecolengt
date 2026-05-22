import type { SiteSettingsData } from '@/lib/cms/types'
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
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          Instagram
        </a>
      )}
      {site.social.facebook && (
        <a
          href={site.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm leading-8 text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          Facebook
        </a>
      )}
    </div>
  )
}
