import type { Metadata } from 'next'

/** Public path to the site favicon (SVG). */
export const siteFaviconPath = '/assets/favicon.svg'

export const siteFaviconMetadata: Pick<Metadata, 'icons'> = {
  icons: {
    icon: [{ url: siteFaviconPath, type: 'image/svg+xml' }],
    shortcut: siteFaviconPath,
  },
}
