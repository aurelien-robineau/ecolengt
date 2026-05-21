export function formatPhoneHref(display: string): string {
  const cleaned = display.replace(/\s/g, '')

  if (cleaned.startsWith('+')) {
    return `tel:${cleaned}`
  }

  if (cleaned.startsWith('0')) {
    return `tel:+33${cleaned.slice(1)}`
  }

  return `tel:${cleaned}`
}
