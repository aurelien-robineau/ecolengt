import { copy, del } from '@vercel/blob'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { PayloadRequest } from 'payload'
import { sanitizeFilename } from 'payload/shared'

import type { Media } from '@/payload-types'

export const BLOB_HOST_SUFFIX = '.blob.vercel-storage.com'
const BLOB_CACHE_CONTROL_MAX_AGE = 60 * 60 * 24 * 365

export type MediaWithUploadFields = Media & {
  prefix?: string | null
  sizes?: Record<string, { filename?: string | null; url?: string | null } | null> | null
}

export function getBlobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN
}

export function isVercelBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(BLOB_HOST_SUFFIX)
  } catch {
    return false
  }
}

export function getBlobBaseUrl(token: string): string | null {
  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  if (!storeId) {
    return null
  }

  return process.env.STORAGE_VERCEL_BLOB_BASE_URL ?? `https://${storeId}.public.blob.vercel-storage.com`
}

export function sanitizePrefix(prefix: string): string {
  return prefix.replace(/^\/+/, '').replace(/\/+$/, '')
}

export function blobPathnameFromFilename(
  filename: string,
  prefix: string | null | undefined,
): string {
  const safeFilename = sanitizeFilename(filename)
  const safePrefix = sanitizePrefix(prefix ?? '')
  return safePrefix ? path.posix.join(safePrefix, safeFilename) : safeFilename
}

export function blobUrlFromFilename(
  filename: string,
  prefix: string | null | undefined,
  baseUrl: string,
): string {
  const fileKey = blobPathnameFromFilename(filename, prefix)
  const dir = path.posix.dirname(fileKey)
  const encodedFilename = encodeURIComponent(path.posix.basename(fileKey))
  const key = dir === '.' ? encodedFilename : path.posix.join(dir, encodedFilename)

  return `${baseUrl}/${key}`
}

function getPrimaryBlobSource(doc: MediaWithUploadFields, baseUrl: string): string | null {
  if (typeof doc.url === 'string' && isVercelBlobUrl(doc.url)) {
    return doc.url
  }

  if (typeof doc.filename !== 'string') {
    return null
  }

  return blobUrlFromFilename(doc.filename, doc.prefix, baseUrl)
}

export function collectBlobDeleteTargets(doc: MediaWithUploadFields, baseUrl: string): string[] {
  const targets = new Set<string>()

  for (const value of [doc.url, doc.thumbnailURL]) {
    if (typeof value === 'string' && isVercelBlobUrl(value)) {
      targets.add(value)
    }
  }

  const filenames = new Set<string>()
  if (typeof doc.filename === 'string') {
    filenames.add(doc.filename)
  }

  if (doc.sizes && typeof doc.sizes === 'object') {
    for (const size of Object.values(doc.sizes)) {
      if (!size || typeof size !== 'object') {
        continue
      }

      if (typeof size.url === 'string' && isVercelBlobUrl(size.url)) {
        targets.add(size.url)
      }

      if (typeof size.filename === 'string') {
        filenames.add(size.filename)
      }
    }
  }

  for (const filename of filenames) {
    targets.add(blobUrlFromFilename(filename, doc.prefix, baseUrl))
  }

  return [...targets]
}

export async function deleteMediaBlobsFromDoc(
  doc: MediaWithUploadFields,
  req: PayloadRequest,
): Promise<void> {
  const token = getBlobToken()
  if (!token) {
    return
  }

  const baseUrl = getBlobBaseUrl(token)
  if (!baseUrl) {
    req.payload.logger.warn('Cannot delete Vercel Blob media: invalid BLOB_READ_WRITE_TOKEN format')
    return
  }

  const targets = collectBlobDeleteTargets(doc, baseUrl)
  if (targets.length === 0) {
    return
  }

  await del(targets, { token })
}

export async function renameMediaBlobs(
  doc: MediaWithUploadFields,
  newFilename: string,
  req: PayloadRequest,
  options?: {
    disableLocalStorage?: boolean
    staticDir?: string
  },
): Promise<void> {
  const oldFilename = doc.filename
  if (!oldFilename || oldFilename === newFilename) {
    return
  }

  const token = getBlobToken()
  if (token) {
    const baseUrl = getBlobBaseUrl(token)
    if (!baseUrl) {
      req.payload.logger.warn('Cannot rename Vercel Blob media: invalid BLOB_READ_WRITE_TOKEN format')
      return
    }

    const from = getPrimaryBlobSource(doc, baseUrl)
    if (!from) {
      return
    }

    const toPathname = blobPathnameFromFilename(newFilename, doc.prefix)

    await copy(from, toPathname, {
      access: 'public',
      cacheControlMaxAge: BLOB_CACHE_CONTROL_MAX_AGE,
      contentType: typeof doc.mimeType === 'string' ? doc.mimeType : undefined,
      token,
    })

    await del(from, { token })
    return
  }

  if (options?.disableLocalStorage) {
    return
  }

  const staticDir = options?.staticDir ?? 'media'

  await fs.rename(path.join(staticDir, oldFilename), path.join(staticDir, newFilename))
}
