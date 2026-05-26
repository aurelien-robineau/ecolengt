import type { ServerProps } from 'payload'

import { siteFaviconPath } from '@/lib/site/favicon'

/** Compact logo for the admin breadcrumb home link (replaces the Payload icon). */
export function AdminIcon(_props: ServerProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Payload admin icon; static SVG path, not a page LCP asset
    <img
      src={siteFaviconPath}
      alt="École de Batterie NGT"
      width={18}
      height={18}
      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
    />
  )
}
