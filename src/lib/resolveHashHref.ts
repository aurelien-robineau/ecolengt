import { routes } from '@/config/routes'

/** Turn `#section` into `/#section` so anchors work from any page. */
export function resolveHashHref(href: string): string {
  if (href.startsWith('#')) {
    return `${routes.home}${href}`
  }

  return href
}
