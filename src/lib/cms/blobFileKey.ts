import { sanitizeFilename } from 'payload/shared'

/**
 * Normalizes a storage prefix for use in object keys and URLs.
 * Mirrors @payloadcms/plugin-cloud-storage/utilities sanitizePrefix.
 */
export function sanitizePrefix(prefix: string): string {
  let decodedPrefix: string

  try {
    decodedPrefix = decodeURIComponent(prefix)
  } catch {
    return ''
  }

  if (/%[0-9a-f]{2}/i.test(decodedPrefix)) {
    return ''
  }

  return decodedPrefix
    .replace(/\\/g, '/')
    .split('/')
    .filter((segment) => segment !== '..' && segment !== '.')
    .join('/')
    .replace(/^\/+/, '')
    .replace(/[\x00-\x1f\x80-\x9f]/g, '')
}

function posixJoin(...segments: string[]): string {
  return segments.filter(Boolean).join('/').replace(/\/+/g, '/').replace(/^\/+/, '')
}

/** Mirrors @payloadcms/plugin-cloud-storage/utilities getFileKey. */
export function getBlobFileKey({
  collectionPrefix,
  docPrefix,
  filename,
  useCompositePrefixes = false,
}: {
  collectionPrefix?: string
  docPrefix?: string
  filename: string
  useCompositePrefixes?: boolean
}): {
  fileKey: string
  sanitizedDocPrefix: string
} {
  const safeCollectionPrefix = sanitizePrefix(collectionPrefix || '')
  const safeDocPrefix = sanitizePrefix(docPrefix || '')
  const safeFilename = sanitizeFilename(filename)

  const fileKey = useCompositePrefixes
    ? posixJoin(safeCollectionPrefix, safeDocPrefix, safeFilename)
    : posixJoin(safeDocPrefix || safeCollectionPrefix, safeFilename)

  return {
    fileKey,
    sanitizedDocPrefix: safeDocPrefix,
  }
}
