import { CmsRichText } from '@/components/cms/CmsRichText'
import { LocationMap } from '@/components/location/LocationMap'
import { AddressContent } from '@/components/ui/AddressContent'
import type { CmsRichTextContent, SiteAddressData } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { hasLexicalContent } from '@/lib/content'
import { hasMapCoordinates } from '@/lib/maps/hasMapCoordinates'
import {
  contactLinkValueClassName,
  contactValueClassName,
  sectionLabelClassName,
} from '@/lib/ui/typography'

type LocationWithMapProps = {
  address: SiteAddressData
  mapTitle: string
  directions?: CmsRichTextContent | null
  className?: string
}

export function LocationWithMap({
  address,
  mapTitle,
  directions,
  className,
}: LocationWithMapProps) {
  const hasAddress = Boolean(
    address.street || address.streetLine2 || address.postalCode || address.city,
  )
  const hasDirections = directions && hasLexicalContent(directions)
  const hasMap = hasMapCoordinates(address)
  const hasAside = hasAddress || hasDirections

  if (!hasAside && !hasMap) {
    return null
  }

  return (
    <div
      className={cn(
        'grid gap-10',
        hasMap && hasAside && 'lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12 lg:items-start',
        className,
      )}
    >
      {hasAside ? (
        <aside className="border border-brand-border bg-brand-dim p-6 md:p-8">
          {hasAddress ? (
            <>
              <h3 className={cn(sectionLabelClassName, 'mb-4')}>Adresse</h3>
              <AddressContent
                street={address.street}
                streetLine2={address.streetLine2}
                postalCode={address.postalCode}
                city={address.city}
                mapsUrl={address.mapsUrl}
                className={contactValueClassName}
                linkClassName={contactLinkValueClassName}
              />
            </>
          ) : null}
          {hasDirections ? (
            <div className={cn(hasAddress && 'mt-8 border-t border-brand-border/50 pt-8')}>
              {hasAddress ? (
                <h3 className={cn(sectionLabelClassName, 'mb-4')}>Comment s’y rendre</h3>
              ) : null}
              <CmsRichText data={directions} />
            </div>
          ) : null}
        </aside>
      ) : null}

      {hasMap ? (
        <LocationMap
          title={mapTitle}
          latitude={address.mapLatitude!}
          longitude={address.mapLongitude!}
          googleMapsUrl={address.mapsUrl || undefined}
        />
      ) : null}
    </div>
  )
}
