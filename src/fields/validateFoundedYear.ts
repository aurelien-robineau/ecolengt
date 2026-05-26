export function validateFoundedYear(value: unknown): string | true {
  if (value === null || value === undefined || value === '') {
    return true
  }

  const year = typeof value === 'number' ? value : Number(value)

  if (!Number.isInteger(year)) {
    return 'Saisissez une année valide.'
  }

  const currentYear = new Date().getFullYear()

  if (year < 1000 || year > currentYear) {
    return `L’année doit être comprise entre 1000 et ${currentYear}.`
  }

  return true
}
