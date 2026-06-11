import type { Metadata } from 'next'

/** Public path to the site favicon (SVG). */
export const siteFaviconPath = '/favicon.svg'

/** Web app manifest. */
export const siteManifestPath = '/manifest.json'

export const siteFaviconMetadata: Pick<Metadata, 'icons' | 'manifest' | 'appleWebApp'> = {
  manifest: siteManifestPath,
  icons: {
    icon: [{ url: siteFaviconPath, type: 'image/svg+xml' }],
    shortcut: siteFaviconPath,
    apple: siteFaviconPath,
  },
  appleWebApp: {
    capable: true,
  },
}
