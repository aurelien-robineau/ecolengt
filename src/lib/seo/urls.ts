import { getServerURL } from '@/lib/site/serverUrl'

/** Canonical origin for absolute URLs (metadata, JSON-LD, sitemap). */
export function getSiteOrigin(): string {
  return getServerURL() ?? 'http://localhost:3000'
}

export function absoluteUrl(pathname: string): string {
  const origin = getSiteOrigin()
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${origin}${path}`
}
