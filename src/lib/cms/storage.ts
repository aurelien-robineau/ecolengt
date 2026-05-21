import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import type { Plugin } from 'payload'

const blobToken = process.env.BLOB_READ_WRITE_TOKEN

/**
 * Vercel Blob for media uploads (required on Vercel; optional locally).
 * Always registered so `payload generate:importmap` includes the client upload handler.
 */
export const vercelBlobStoragePlugin: Plugin = vercelBlobStorage({
  enabled: Boolean(blobToken),
  collections: {
    media: true,
  },
  token: blobToken,
  clientUploads: true,
})
