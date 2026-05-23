import { extractMapsEmbedSrc } from '@/lib/cms/extractMapsEmbedSrc'
import type { SiteAddressData } from '@/lib/cms/types'

type SiteAddressFields = {
  street?: string | null
  streetLine2?: string | null
  postalCode?: string | null
  city?: string | null
  mapsUrl?: string | null
  mapsEmbed?: string | null
}

export function mapSiteAddress(fields: SiteAddressFields): SiteAddressData {
  return {
    street: fields.street?.trim() ?? '',
    streetLine2: fields.streetLine2?.trim() ?? '',
    postalCode: fields.postalCode?.trim() ?? '',
    city: fields.city?.trim() ?? '',
    mapsUrl: fields.mapsUrl?.trim() ?? '',
    mapsEmbedSrc: extractMapsEmbedSrc(fields.mapsEmbed) ?? '',
  }
}
