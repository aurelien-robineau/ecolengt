import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'

import { ensureFilenameExtension } from '@/lib/media/filename'
import {
  copyBlobToFilename,
  getVercelBlobMediaConfig,
  promoteStagingBlob,
} from '@/lib/media/vercelBlobMedia'

type MediaClientUploadContext = {
  prefix?: string
  stagingFileKey?: string
}

type UploadFileWithContext = {
  clientUploadContext?: unknown
  name?: string
}

type PayloadCloudStorageContext = {
  file?: UploadFileWithContext
  uploadSizes?: Record<string, Buffer>
}

function getCloudStorageContext(req: Parameters<CollectionBeforeChangeHook>[0]['req']) {
  return req.context?._payloadCloudStorage as PayloadCloudStorageContext | undefined
}

function hasIncomingUploadFile(req: Parameters<CollectionBeforeChangeHook>[0]['req']): boolean {
  return Boolean(req.file ?? getCloudStorageContext(req)?.file)
}

function getClientUploadContext(
  req: Parameters<CollectionBeforeChangeHook>[0]['req'],
): MediaClientUploadContext | undefined {
  const file = req.file ?? getCloudStorageContext(req)?.file
  const context = file?.clientUploadContext

  if (context && typeof context === 'object') {
    return context as MediaClientUploadContext
  }

  return undefined
}

/**
 * Ensures stored filenames always include the extension (from the doc or the new upload).
 */
export const normalizeMediaFilenameBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  operation: _operation,
  originalDoc,
  req,
}) => {
  if (typeof data.filename !== 'string' || !data.filename.trim()) {
    return data
  }

  const referenceFilename =
    (typeof originalDoc?.filename === 'string' && originalDoc.filename) ||
    req.file?.name ||
    getCloudStorageContext(req)?.file?.name ||
    data.filename

  data.filename = ensureFilenameExtension(data.filename, referenceFilename)

  const file = req.file ?? getCloudStorageContext(req)?.file
  if (file) {
    file.name = data.filename
  }

  return data
}

/**
 * When replacing a file on an existing media item, keep id, filename and alt unless
 * the editor explicitly changed the filename in the form.
 */
export const preserveMediaMetadataBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (operation !== 'update' || !originalDoc || !hasIncomingUploadFile(req)) {
    return data
  }

  const userChangedFilename =
    data.filename !== undefined &&
    originalDoc.filename !== undefined &&
    data.filename !== originalDoc.filename

  if (!userChangedFilename && typeof originalDoc.filename === 'string') {
    data.filename = originalDoc.filename
  }

  if (data.alt === undefined && originalDoc.alt !== undefined) {
    data.alt = originalDoc.alt
  }

  const file = req.file ?? getCloudStorageContext(req)?.file
  if (file && typeof data.filename === 'string') {
    file.name = data.filename
  }

  return data
}

export const syncMediaBlobAfterChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
  previousDoc,
  req,
}) => {
  const config = getVercelBlobMediaConfig()
  if (!config) {
    return doc
  }

  const docPrefix = typeof doc.prefix === 'string' ? doc.prefix : ''
  const previousPrefix =
    previousDoc && typeof previousDoc.prefix === 'string' ? previousDoc.prefix : docPrefix

  try {
    const clientContext = getClientUploadContext(req)

    if (
      operation === 'update' &&
      clientContext?.stagingFileKey &&
      typeof doc.filename === 'string'
    ) {
      await promoteStagingBlob({
        config,
        docPrefix,
        stagingFileKey: clientContext.stagingFileKey,
        targetFilename: doc.filename,
      })
      return doc
    }

    if (
      operation === 'update' &&
      previousDoc?.filename &&
      doc.filename &&
      previousDoc.filename !== doc.filename &&
      !hasIncomingUploadFile(req)
    ) {
      await copyBlobToFilename({
        config,
        docPrefix: previousPrefix,
        fromFilename: previousDoc.filename,
        toFilename: doc.filename,
      })
    }
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: `Failed to sync Vercel Blob for media ${doc.id}`,
    })
    throw err
  }

  return doc
}
