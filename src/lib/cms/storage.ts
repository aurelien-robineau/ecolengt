import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import type { Plugin } from 'payload'

const blobToken = process.env.BLOB_READ_WRITE_TOKEN

/** Vercel Blob for media uploads (required on Vercel; optional locally). */
export const vercelBlobStoragePlugin: Plugin | undefined = blobToken
  ? vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: blobToken,
      // Bypass Vercel's 4.5 MB server upload limit in the admin.
      clientUploads: true,
    })
  : undefined
