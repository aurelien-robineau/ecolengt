import type { CollectionAfterDeleteHook } from 'payload'

import type { Media } from '@/payload-types'
import { deleteMediaBlobsFromDoc } from '@/lib/cms/vercelBlobMedia'

export const deleteMediaBlob: CollectionAfterDeleteHook<Media> = async ({ doc, req }) => {
  try {
    await deleteMediaBlobsFromDoc(doc, req)
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: `Failed to delete Vercel Blob file(s) for media ${doc.id}`,
    })
  }

  return doc
}
