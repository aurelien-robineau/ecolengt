import type { SiteSettingsData } from '@/lib/cms/types'
import { contactLinkClassName, sectionLabelClassName } from '@/lib/ui/typography'

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
      <h2 className={sectionLabelClassName}>Réseaux sociaux</h2>
      <ul className="mt-4 list-none space-y-2">
        {site.social.instagram && (
          <li>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={contactLinkClassName}
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
              className={contactLinkClassName}
            >
              Facebook
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
