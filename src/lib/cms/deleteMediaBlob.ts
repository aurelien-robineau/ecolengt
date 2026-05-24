import { del } from '@vercel/blob'
import path from 'path'
import type { CollectionAfterDeleteHook } from 'payload'
import { sanitizeFilename } from 'payload/shared'

import type { Media } from '@/payload-types'

const BLOB_HOST_SUFFIX = '.blob.vercel-storage.com'

type MediaWithUploadFields = Media & {
  prefix?: string | null
  sizes?: Record<string, { filename?: string | null; url?: string | null } | null> | null
}

function isVercelBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(BLOB_HOST_SUFFIX)
  } catch {
    return false
  }
}

function getBlobBaseUrl(token: string): string | null {
  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  if (!storeId) {
    return null
  }

  return process.env.STORAGE_VERCEL_BLOB_BASE_URL ?? `https://${storeId}.public.blob.vercel-storage.com`
}

function sanitizePrefix(prefix: string): string {
  return prefix.replace(/^\/+/, '').replace(/\/+$/, '')
}

function blobUrlFromFilename(
  filename: string,
  prefix: string | null | undefined,
  baseUrl: string,
): string {
  const safeFilename = sanitizeFilename(filename)
  const safePrefix = sanitizePrefix(prefix ?? '')
  const fileKey = path.posix.join(safePrefix, safeFilename)
  const dir = path.posix.dirname(fileKey)
  const encodedFilename = encodeURIComponent(path.posix.basename(fileKey))
  const key = dir === '.' ? encodedFilename : path.posix.join(dir, encodedFilename)

  return `${baseUrl}/${key}`
}

function collectDeleteTargets(doc: MediaWithUploadFields, baseUrl: string): string[] {
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

export const deleteMediaBlob: CollectionAfterDeleteHook<Media> = async ({ doc, req }) => {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return doc
  }

  const baseUrl = getBlobBaseUrl(token)
  if (!baseUrl) {
    req.payload.logger.warn('Cannot delete Vercel Blob media: invalid BLOB_READ_WRITE_TOKEN format')
    return doc
  }

  const targets = collectDeleteTargets(doc, baseUrl)
  if (targets.length === 0) {
    return doc
  }

  try {
    await del(targets, { token })
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: `Failed to delete Vercel Blob file(s) for media ${doc.id}`,
    })
  }

  return doc
}
