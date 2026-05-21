export function extractMapsEmbedSrc(value: string | null | undefined): string | null {
  if (!value?.trim()) {
    return null
  }

  const trimmed = value.trim()

  if (trimmed.startsWith('http')) {
    return trimmed
  }

  const match = trimmed.match(/src=["']([^"']+)["']/i)

  return match?.[1] ?? null
}
