import type { SiteAddressData } from '@/lib/cms/types'

export function hasMapCoordinates(address: SiteAddressData): boolean {
  const { mapLatitude, mapLongitude } = address

  return (
    typeof mapLatitude === 'number' &&
    typeof mapLongitude === 'number' &&
    Number.isFinite(mapLatitude) &&
    Number.isFinite(mapLongitude) &&
    mapLatitude >= -90 &&
    mapLatitude <= 90 &&
    mapLongitude >= -180 &&
    mapLongitude <= 180
  )
}
