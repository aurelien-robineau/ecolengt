'use client'

import { createClientUploadHandler } from '@payloadcms/plugin-cloud-storage/client'
import { upload } from '@vercel/blob/client'
import { formatAdminURL } from 'payload/shared'

import { getBlobFileKey } from '@/lib/cms/blobFileKey'
import { buildStagingFilename, getMediaIdFromAdminPathname } from '@/lib/cms/mediaStaging'

function posixBasename(key: string): string {
  const normalized = key.replace(/^\/+/, '')
  const lastSlash = normalized.lastIndexOf('/')
  return lastSlash === -1 ? normalized : normalized.slice(lastSlash + 1)
}

/**
 * Vercel Blob client uploads for media. When replacing a file on an existing document,
 * uploads to a staging path so hooks can promote the new bytes to the preserved filename on save.
 */
export const VercelBlobMediaClientUploadHandler = createClientUploadHandler({
  handler: async ({
    apiRoute,
    collectionSlug,
    docPrefix,
    extra = {},
    file,
    prefix,
    serverHandlerPath,
    serverURL,
    updateFilename,
  }) => {
    const addRandomSuffix = Boolean(
      extra && typeof extra === 'object' && 'addRandomSuffix' in extra && extra.addRandomSuffix,
    )
    const useCompositePrefixes = Boolean(
      extra &&
      typeof extra === 'object' &&
      'useCompositePrefixes' in extra &&
      extra.useCompositePrefixes,
    )

    const endpointRoute = formatAdminURL({
      apiRoute,
      path: serverHandlerPath as `/${string}`,
      serverURL,
    })

    const mediaId =
      typeof window !== 'undefined'
        ? getMediaIdFromAdminPathname(window.location.pathname)
        : undefined

    const uploadFilename = mediaId
      ? buildStagingFilename({
          mediaId,
          originalUploadName: file.name,
        })
      : file.name

    const { fileKey: pathname, sanitizedDocPrefix } = getBlobFileKey({
      collectionPrefix: prefix,
      docPrefix,
      filename: uploadFilename,
      useCompositePrefixes,
    })

    await upload(pathname, file, {
      access: 'public',
      clientPayload: collectionSlug,
      contentType: file.type,
      handleUploadUrl: endpointRoute,
    })

    if (addRandomSuffix) {
      updateFilename(decodeURIComponent(posixBasename(pathname)))
    }

    return {
      prefix: sanitizedDocPrefix,
      ...(mediaId ? { stagingFileKey: pathname } : {}),
    }
  },
})
