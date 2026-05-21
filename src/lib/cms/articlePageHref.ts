import { routes } from '@/config/routes'

export function articlePageHref(slug: string | null | undefined): string | null {
  if (!slug?.trim()) {
    return null
  }

  return `${routes.news}/${slug.trim()}`
}
