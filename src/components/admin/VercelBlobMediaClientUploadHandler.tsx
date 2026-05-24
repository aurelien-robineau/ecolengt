'use client'

import { useConfig, useEffectEvent, useUploadHandlers } from '@payloadcms/ui'
import { upload } from '@vercel/blob/client'
import { formatAdminURL } from 'payload/shared'
import { Fragment, useEffect } from 'react'

import { getBlobFileKey } from '@/lib/cms/blobFileKey'
import { buildStagingFilename, getMediaIdFromAdminPathname } from '@/lib/cms/mediaStaging'

type ClientUploadHandlerProps = {
  children: React.ReactNode
  collectionSlug: string
  enabled?: boolean
  extra?: {
    addRandomSuffix?: boolean
    useCompositePrefixes?: boolean
  }
  prefix?: string
  serverHandlerPath: string
}

function posixBasename(key: string): string {
  const normalized = key.replace(/^\/+/, '')
  const lastSlash = normalized.lastIndexOf('/')
  return lastSlash === -1 ? normalized : normalized.slice(lastSlash + 1)
}

/**
 * Vercel Blob client uploads for media. When replacing a file on an existing document,
 * uploads to a staging path so the cloud-storage plugin can delete the previous blob
 * before we promote the new bytes to the preserved filename on save.
 *
 * Must not use useDocumentInfo — this runs as a root admin provider outside document views.
 */
export function VercelBlobMediaClientUploadHandler({
  children,
  collectionSlug,
  enabled,
  extra,
  prefix,
  serverHandlerPath,
}: ClientUploadHandlerProps) {
  const { setUploadHandler } = useUploadHandlers()
  const {
    config: {
      routes: { api: apiRoute },
      serverURL,
    },
  } = useConfig()

  const addRandomSuffix = Boolean(extra?.addRandomSuffix)
  const useCompositePrefixes = Boolean(extra?.useCompositePrefixes)

  const initializeHandler = useEffectEvent(() => {
    if (!enabled) {
      return
    }

    setUploadHandler({
      collectionSlug: collectionSlug as 'media',
      handler: async ({ docPrefix, file, updateFilename }) => {
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
  })

  useEffect(() => {
    initializeHandler()
  }, [initializeHandler])

  return <Fragment>{children}</Fragment>
}
