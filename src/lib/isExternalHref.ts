import { getServerURL } from '@/lib/site/serverUrl'

function getSiteOrigin(): string {
  return getServerURL() ?? 'http://localhost:3000'
}

/**
 * True when href points to another host (absolute http(s) URL with a different host).
 * Relative paths, hash-only links, and mailto/tel links are treated as internal.
 */
export function isExternalHref(href: string): boolean {
  const trimmed = href.trim()

  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return false
  }

  if (/^(mailto:|tel:|sms:)/i.test(trimmed)) {
    return false
  }

  try {
    const siteOrigin = getSiteOrigin()
    const url = new URL(trimmed, siteOrigin)
    const siteUrl = new URL(siteOrigin)
    return url.host !== siteUrl.host
  } catch {
    return false
  }
}
