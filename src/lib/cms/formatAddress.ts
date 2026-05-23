export function formatPostalCityLine(postalCode: string, city: string): string {
  return [postalCode.trim(), city.trim()].filter(Boolean).join(' ')
}

export function formatFoundedSince(year: number | null): string {
  if (!year) {
    return ''
  }

  return `Depuis ${year}`
}
