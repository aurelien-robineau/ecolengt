import path from 'node:path'
import { APIError, type CollectionBeforeChangeHook } from 'payload'
import { sanitizeFilename } from 'payload/shared'

import type { Media } from '@/payload-types'
import { renameMediaBlobs } from '@/lib/cms/vercelBlobMedia'

function preserveExtension(nextFilename: string, currentFilename: string): string {
  const currentExtension = path.extname(currentFilename)
  if (!currentExtension || path.extname(nextFilename)) {
    return nextFilename
  }

  return `${nextFilename}${currentExtension}`
}

export const renameMediaBlob: CollectionBeforeChangeHook<Media> = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (operation !== 'update' || !originalDoc?.filename || req.file) {
    return data
  }

  const requestedFilename =
    typeof data?.filename === 'string' ? data.filename.trim() : originalDoc.filename

  if (!requestedFilename || requestedFilename === originalDoc.filename) {
    return data
  }

  const sanitized = sanitizeFilename(requestedFilename)
  if (!sanitized) {
    throw new APIError('Nom de fichier invalide.', 400)
  }

  const nextFilename = preserveExtension(sanitized, originalDoc.filename)
  if (nextFilename === originalDoc.filename) {
    return data
  }

  try {
    await renameMediaBlobs(originalDoc, nextFilename, req)
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: `Failed to rename Vercel Blob file for media ${originalDoc.id}`,
    })
    throw new APIError('Impossible de renommer le fichier sur Vercel Blob.', 500)
  }

  return {
    ...data,
    filename: nextFilename,
  }
}
