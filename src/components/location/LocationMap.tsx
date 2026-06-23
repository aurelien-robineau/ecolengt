import { Icon } from '@/components/icons/Icon'
import { LeafletMap } from '@/components/location/LeafletMap'
import { ExternalLink, externalLinkAriaLabel } from '@/lib/a11y/externalLink'
import { cn } from '@/lib/cn'

type LocationMapProps = {
  title: string
  latitude: number
  longitude: number
  googleMapsUrl?: string
  /** Classes for the iframe wrapper (aspect ratio / min-height). */
  embedClassName?: string
  /** Break out of container padding on mobile. Defaults to true. */
  bleed?: boolean
}

export function LocationMap({
  title,
  latitude,
  longitude,
  googleMapsUrl,
  embedClassName,
  bleed = true,
}: LocationMapProps) {
  const googleMapsLabel = googleMapsUrl
    ? externalLinkAriaLabel('Ouvrir dans Google Maps', googleMapsUrl)
    : undefined

  return (
    <div className={cn('flex flex-col', bleed && 'bleed-x-sm')}>
      <div className={cn('map-embed', embedClassName)}>
        <LeafletMap latitude={latitude} longitude={longitude} title={title} />

        {googleMapsUrl ? (
          <ExternalLink
            href={googleMapsUrl}
            aria-label={googleMapsLabel}
            className="absolute top-3 left-3 z-[1001] inline-flex items-center gap-2.5 rounded-sm border border-white/15 bg-foreground/90 px-3.5 py-2.5 text-sm font-medium text-surface backdrop-blur-sm transition-colors hover:bg-foreground"
          >
            <span>Ouvrir dans Google Maps</span>
            <Icon name="openInNew" className="size-4.5 shrink-0" />
          </ExternalLink>
        ) : null}
      </div>
    </div>
  )
}
