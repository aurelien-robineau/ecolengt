/**
 * Canonical site URL for Payload (emails, absolute links).
 * Set NEXT_PUBLIC_SERVER_URL in production; Vercel provides VERCEL_URL as fallback.
 */
export function getServerURL(): string | undefined {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL.replace(/\/$/, '')
  }

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`
  }

  return undefined
}
