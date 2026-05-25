import { LocationWithMap } from '@/components/location/LocationWithMap'
import { Gallery } from '@/components/ui/Gallery'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { SiteAddressData, SiteMainAccessData } from '@/lib/cms/types'
import { hasMapCoordinates } from '@/lib/maps/hasMapCoordinates'
import { pageSectionTitleClassName } from '@/lib/ui/typography'

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
    <section className="border-t border-border pt-16 md:pt-20">
      <h2 className={`mb-10 ${pageSectionTitleClassName}`}>Accès</h2>

      <LocationWithMap
        address={address}
        mapTitle={`Plan d’accès — ${siteName}`}
        directions={access.directions}
        className={hasGallery ? 'mb-12' : undefined}
      />

      {hasGallery ? <Gallery items={access.gallery} columns={2} /> : null}
    </section>
  )
}
