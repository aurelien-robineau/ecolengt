export const MEDIA_STAGING_DIR = '_payload-replace'

export function buildStagingFilename({
  mediaId,
  originalUploadName,
}: {
  mediaId: string
  originalUploadName: string
}): string {
  const safeName = originalUploadName.replace(/[^\w.\-()+ ]/g, '_')
  return `${MEDIA_STAGING_DIR}/${mediaId}/${Date.now()}-${safeName}`
}

/** Media document id from the admin edit URL (undefined on create or non-media routes). */
export function getMediaIdFromAdminPathname(pathname: string): string | undefined {
  const match = pathname.match(/\/collections\/media\/([^/]+)/)
  const segment = match?.[1]

  if (!segment || segment === 'create') {
    return undefined
  }

  return segment
}
