/** URL slug from a display name; accents become ASCII (Aurélien → aurelien). */
export function slugifyName(value: string | undefined | null): string {
  if (!value) {
    return ''
  }

  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}
