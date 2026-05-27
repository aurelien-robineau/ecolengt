export function validateHeroOverlayOpacity(value: unknown): string | true {
  if (value === null || value === undefined || value === '') {
    return 'Saisissez une opacité entre 0 et 100.'
  }

  const opacity = typeof value === 'number' ? value : Number(value)

  if (!Number.isInteger(opacity) || opacity < 0 || opacity > 100) {
    return 'L’opacité doit être un entier entre 0 et 100.'
  }

  return true
}
