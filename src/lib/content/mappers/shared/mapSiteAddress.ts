import { parseMapCoordinate } from '@/lib/content/utils/parseMapCoordinate'
import type { SiteAddressData } from '@/lib/content/types'

type SiteAddressFields = {
  street?: string | null
  streetLine2?: string | null
  postalCode?: string | null
  city?: string | null
  mapsUrl?: string | null
  mapLatitude?: number | null
  mapLongitude?: number | null
}

export function mapSiteAddress(fields: SiteAddressFields): SiteAddressData {
  return {
    street: fields.street?.trim() ?? '',
    streetLine2: fields.streetLine2?.trim() ?? '',
    postalCode: fields.postalCode?.trim() ?? '',
    city: fields.city?.trim() ?? '',
    mapsUrl: fields.mapsUrl?.trim() ?? '',
    mapLatitude: parseMapCoordinate(fields.mapLatitude),
    mapLongitude: parseMapCoordinate(fields.mapLongitude),
  }
}
