import { AccessSectionCard } from '@/components/location/AccessSectionCard'
import { LocationWithMap } from '@/components/location/LocationWithMap'
import { Gallery } from '@/components/ui/Gallery'
import { hasLexicalContent } from '@/lib/content'
import type { SiteAddressData, SiteMainAccessData } from '@/lib/content/types'
import { hasMapCoordinates } from '@/lib/maps/hasMapCoordinates'

type IntensiveCoursesAccessProps = {
  siteName: string
  address: SiteAddressData
  access: SiteMainAccessData
}

export function IntensiveCoursesAccess({ siteName, address, access }: IntensiveCoursesAccessProps) {
  const hasDirections = access.directions && hasLexicalContent(access.directions)
  const hasGallery = access.gallery.length > 0
  const hasLocation = Boolean(
    address.street ||
    address.streetLine2 ||
    address.postalCode ||
    address.city ||
    hasMapCoordinates(address) ||
    hasDirections,
  )

  if (!hasLocation && !hasGallery) {
    return null
  }

  return (
    <AccessSectionCard>
      <LocationWithMap
        address={address}
        mapTitle={`Plan d’accès — ${siteName}`}
        directions={access.directions}
        plainAside
        mapBleed={false}
        className={hasGallery ? 'mb-12' : undefined}
      />

      {hasGallery ? <Gallery items={access.gallery} columns={2} bleed={false} /> : null}
    </AccessSectionCard>
  )
}
