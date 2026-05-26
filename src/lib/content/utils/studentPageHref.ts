import { routes } from '@/config/routes'
import type { Eleve } from '@/payload-types'

export function studentPageHref(slug: string | null | undefined): string | null {
  if (!slug?.trim()) {
    return null
  }

  return `${routes.students}/${slug.trim()}`
}

export function resolveListedPerson(
  student: Eleve | string | null | undefined,
  fallbackName: string,
): { name: string; pageHref: string | null } {
  if (!student || typeof student === 'string') {
    return { name: fallbackName, pageHref: null }
  }

  return {
    name: student.name || fallbackName,
    pageHref: studentPageHref(student.slug),
  }
}
