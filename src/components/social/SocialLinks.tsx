import { externalLinkAriaLabel } from '@/lib/a11y/externalLink'
import { cn } from '@/lib/cn'
import type { SiteSettingsData } from '@/lib/content/types'
import { iconPaths } from '@/lib/icons'
import { sectionLabelClassName, stackTitleClassName } from '@/lib/ui/typography'

type SocialNetwork = {
  id: 'instagram' | 'facebook'
  href: string
  label: string
}

type SocialLinksProps = {
  site: SiteSettingsData
  variant?: 'contact' | 'footer'
  className?: string
}

function getNetworks(site: SiteSettingsData): SocialNetwork[] {
  const networks: SocialNetwork[] = []

  if (site.social.instagram) {
    networks.push({ id: 'instagram', href: site.social.instagram, label: 'Instagram' })
  }

  if (site.social.facebook) {
    networks.push({ id: 'facebook', href: site.social.facebook, label: 'Facebook' })
  }

  return networks
}

const contactButtonClassName =
  'inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface no-underline transition-[background-color,border-color] duration-150 hover:border-foreground hover:bg-surface-muted'

const footerButtonClassName =
  'inline-flex size-11 items-center justify-center rounded-full border border-border-inverse bg-transparent no-underline transition-[background-color,border-color] duration-150 hover:border-foreground-inverse-muted hover:bg-white/5'

export function SocialLinks({ site, variant = 'contact', className }: SocialLinksProps) {
  const networks = getNetworks(site)

  if (!networks.length) {
    return null
  }

  const buttonClassName = variant === 'footer' ? footerButtonClassName : contactButtonClassName

  const list = (
    <ul className="flex list-none flex-wrap gap-3">
      {networks.map((network) => (
        <li key={network.id}>
          <a
            href={network.href}
            className={buttonClassName}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={externalLinkAriaLabel(network.label, network.href)}
          >
            <img src={iconPaths[network.id]} alt="" width={20} height={20} className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  )

  if (variant === 'footer') {
    return <div className={className}>{list}</div>
  }

  return (
    <div className={className}>
      <h2 className={cn(sectionLabelClassName, stackTitleClassName)}>Réseaux sociaux</h2>
      {list}
    </div>
  )
}
