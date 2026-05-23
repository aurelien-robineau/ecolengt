import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { isExternalHref } from '@/lib/isExternalHref'

export const opensInNewTabLabel = '(ouvre dans un nouvel onglet)'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  className?: string
}

/** Anchor for off-site URLs with rel, target, and a screen-reader hint. */
export function ExternalLink({ href, children, className, ...rest }: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
      <span className="sr-only"> {opensInNewTabLabel}</span>
    </a>
  )
}

export function externalLinkProps(href: string): Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel' | 'aria-label'
> & { external: boolean } {
  const external = isExternalHref(href)

  if (!external) {
    return { external: false }
  }

  return {
    external: true,
    target: '_blank',
    rel: 'noopener noreferrer',
  }
}

export function externalLinkAriaLabel(label: string, href: string): string | undefined {
  if (!isExternalHref(href)) {
    return undefined
  }

  return `${label} ${opensInNewTabLabel}`
}
