import { del, head, put } from '@vercel/blob'
import path from 'path'

import { getBlobFileKey } from './blobFileKey'

export { MEDIA_STAGING_DIR } from './mediaStaging'

export type VercelBlobMediaConfig = {
  baseUrl: string
  token: string
}

export function getVercelBlobMediaConfig(): VercelBlobMediaConfig | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return null
  }

  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  if (!storeId) {
    return null
  }

  const baseUrl =
    process.env.STORAGE_VERCEL_BLOB_BASE_URL || `https://${storeId}.public.blob.vercel-storage.com`

  return { baseUrl, token }
}

/** Blob URL for a stored media file (matches @payloadcms/storage-vercel-blob). */
export function getBlobUrlForFile({
  baseUrl,
  collectionPrefix = '',
  docPrefix = '',
  filename,
  useCompositePrefixes = false,
}: {
  baseUrl: string
  collectionPrefix?: string
  docPrefix?: string
  filename: string
  useCompositePrefixes?: boolean
}): string {
  const { fileKey } = getBlobFileKey({
    collectionPrefix,
    docPrefix,
    filename,
    useCompositePrefixes,
  })

  const dir = path.posix.dirname(fileKey)
  const encodedFilename = encodeURIComponent(path.posix.basename(fileKey))
  const fileKeyWithEncodedFilename =
    dir === '.' ? encodedFilename : path.posix.join(dir, encodedFilename)

  return `${baseUrl}/${fileKeyWithEncodedFilename}`
}

async function fetchBlobBuffer(
  blobUrl: string,
  token: string,
): Promise<{
  buffer: Buffer
  contentType: string | undefined
}> {
  const metadata = await head(blobUrl, { token })
  const response = await fetch(`${blobUrl}?${metadata.uploadedAt.toISOString()}`, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to read blob (${response.status}): ${blobUrl}`)
  }

  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: metadata.contentType,
  }
}

export async function copyBlobToFilename({
  config,
  collectionPrefix = '',
  docPrefix = '',
  fromFilename,
  toFilename,
  useCompositePrefixes = false,
}: {
  config: VercelBlobMediaConfig
  collectionPrefix?: string
  docPrefix?: string
  fromFilename: string
  toFilename: string
  useCompositePrefixes?: boolean
}): Promise<void> {
  const fromUrl = getBlobUrlForFile({
    baseUrl: config.baseUrl,
    collectionPrefix,
    docPrefix,
    filename: fromFilename,
    useCompositePrefixes,
  })

  const { buffer, contentType } = await fetchBlobBuffer(fromUrl, config.token)

  const { fileKey: targetKey } = getBlobFileKey({
    collectionPrefix,
    docPrefix,
    filename: toFilename,
    useCompositePrefixes,
  })

  await put(targetKey, buffer, {
    access: 'public',
    contentType,
    token: config.token,
  })

  await del(fromUrl, { token: config.token })
}

export async function promoteStagingBlob({
  config,
  collectionPrefix = '',
  docPrefix = '',
  stagingFileKey,
  targetFilename,
  useCompositePrefixes = false,
}: {
  config: VercelBlobMediaConfig
  collectionPrefix?: string
  docPrefix?: string
  stagingFileKey: string
  targetFilename: string
  useCompositePrefixes?: boolean
}): Promise<void> {
  const dir = path.posix.dirname(stagingFileKey)
  const encodedFilename = encodeURIComponent(path.posix.basename(stagingFileKey))
  const stagingPath = dir === '.' ? encodedFilename : path.posix.join(dir, encodedFilename)
  const stagingUrl = `${config.baseUrl}/${stagingPath}`

  const { buffer, contentType } = await fetchBlobBuffer(stagingUrl, config.token)

  const { fileKey: targetKey } = getBlobFileKey({
    collectionPrefix,
    docPrefix,
    filename: targetFilename,
    useCompositePrefixes,
  })

  await put(targetKey, buffer, {
    access: 'public',
    contentType,
    token: config.token,
  })

  await del(stagingUrl, { token: config.token })
}

export { buildStagingFilename } from './mediaStaging'
