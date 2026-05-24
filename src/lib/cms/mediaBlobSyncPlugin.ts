import type { Plugin } from 'payload'

import {
  normalizeMediaFilenameBeforeChange,
  preserveMediaMetadataBeforeChange,
  syncMediaBlobAfterChange,
} from '@/collections/hooks/mediaBlobSync'
import { orderMediaFields } from '@/lib/cms/orderMediaFields'

const DEFAULT_VERCEL_BLOB_CLIENT_HANDLER =
  '@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler'

const MEDIA_CLIENT_HANDLER =
  '@/components/admin/VercelBlobMediaClientUploadHandler#VercelBlobMediaClientUploadHandler'

/**
 * Keeps Vercel Blob in sync with media documents: preserve filename/alt on file replace,
 * promote staged uploads, rename blobs when filename changes, and rely on the storage
 * plugin for delete-on-remove.
 */
export const mediaBlobSyncPlugin: Plugin = (incomingConfig) => {
  const config = { ...incomingConfig }

  if (config.admin?.components?.providers) {
    config.admin.components.providers = config.admin.components.providers.map((provider) => {
      if (
        typeof provider === 'object' &&
        provider !== null &&
        'path' in provider &&
        provider.path === DEFAULT_VERCEL_BLOB_CLIENT_HANDLER
      ) {
        return { ...provider, path: MEDIA_CLIENT_HANDLER }
      }

      return provider
    })
  }

  if (config.admin?.dependencies?.[DEFAULT_VERCEL_BLOB_CLIENT_HANDLER]) {
    config.admin.dependencies[MEDIA_CLIENT_HANDLER] = {
      path: MEDIA_CLIENT_HANDLER,
      type: 'function',
    }
  }

  config.collections = (config.collections || []).map((collection) => {
    if (collection.slug !== 'media') {
      return collection
    }

    return {
      ...collection,
      fields: orderMediaFields(collection.fields ?? []),
      hooks: {
        ...collection.hooks,
        beforeChange: [
          ...(collection.hooks?.beforeChange || []),
          normalizeMediaFilenameBeforeChange,
          preserveMediaMetadataBeforeChange,
        ],
        afterChange: [...(collection.hooks?.afterChange || []), syncMediaBlobAfterChange],
      },
    }
  })

  const previousOnInit = config.onInit

  config.onInit = async (payload) => {
    if (previousOnInit) {
      await previousOnInit(payload)
    }

    const media = payload.config.collections.find(({ slug }) => slug === 'media')
    if (media) {
      media.fields = orderMediaFields(media.fields)
    }
  }

  return config
}
