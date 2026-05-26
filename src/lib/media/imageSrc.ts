import { getServerURL } from '@/lib/site/serverUrl'

/**
 * next/image `localPatterns` only apply to path-only `src` values.
 * Payload prefixes `media.url` with `serverURL` — strip same-origin URLs.
 */
export function toNextImageSrc(url: string): string {
  if (url.startsWith('/')) {
    return url
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return url
  }

  const serverURL = getServerURL()
  if (serverURL) {
    try {
      const serverOrigin = new URL(serverURL).origin
      if (parsed.origin === serverOrigin) {
        return `${parsed.pathname}${parsed.search}`
      }
    } catch {
      // ignore invalid server URL
    }
  }

  if (
    (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') &&
    parsed.pathname.startsWith('/api/media/')
  ) {
    return `${parsed.pathname}${parsed.search}`
  }

  return url
}
