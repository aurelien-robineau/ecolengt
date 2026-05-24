'use client'

import { useConfig, useDocumentInfo, useEffectEvent, useUploadHandlers } from '@payloadcms/ui'
import { upload } from '@vercel/blob/client'
import { formatAdminURL } from 'payload/shared'
import { Fragment, useEffect } from 'react'

import { getBlobFileKey } from '@/lib/cms/blobFileKey'
import { buildStagingFilename } from '@/lib/cms/vercelBlobMedia'

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
  const { data, id } = useDocumentInfo()

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

        const preservedFilename =
          id && typeof data?.filename === 'string' && data.filename.length > 0
            ? data.filename
            : undefined

        const uploadFilename =
          id && preservedFilename
            ? buildStagingFilename({
                mediaId: String(id),
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
          const basename = decodeURIComponent(posixBasename(pathname))
          updateFilename(basename)
        }

        return {
          prefix: sanitizedDocPrefix,
          ...(id && preservedFilename ? { stagingFileKey: pathname } : {}),
        }
      },
    })
  })

  useEffect(() => {
    initializeHandler()
  }, [initializeHandler])

  return <Fragment>{children}</Fragment>
}
