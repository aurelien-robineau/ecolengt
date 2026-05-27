import Image from 'next/image'

import { MapEmbed } from '@/components/location/MapEmbed'
import { ExternalLink, externalLinkAriaLabel } from '@/lib/a11y/externalLink'
import { buildOpenStreetMapEmbedUrl } from '@/lib/maps/buildOpenStreetMapEmbedUrl'
import { cn } from '@/lib/cn'

type LocationMapProps = {
  title: string
  latitude: number
  longitude: number
  googleMapsUrl?: string
  className?: string
  /** Classes for the iframe wrapper (aspect ratio / min-height). */
  embedClassName?: string
}

export function LocationMap({
  title,
  latitude,
  longitude,
  googleMapsUrl,
  className,
  embedClassName,
}: LocationMapProps) {
  const embedSrc = buildOpenStreetMapEmbedUrl(latitude, longitude)
  const googleMapsLabel = googleMapsUrl
    ? externalLinkAriaLabel('Ouvrir dans Google Maps', googleMapsUrl)
    : undefined

  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className={cn(
          'relative aspect-4/3 w-full overflow-hidden bg-surface-muted lg:aspect-auto lg:min-h-112',
          embedClassName,
        )}
      >
        {googleMapsUrl ? (
          <ExternalLink
            href={googleMapsUrl}
            aria-label={googleMapsLabel}
            className="absolute top-3 left-3 z-10 inline-flex items-center gap-2.5 border border-white/15 bg-foreground/90 px-3.5 py-2.5 text-sm font-medium text-surface shadow-md backdrop-blur-sm transition-colors hover:bg-foreground"
          >
            <span>Ouvrir dans Google Maps</span>
            <Image
              src="/icons/open-in-new.svg"
              alt=""
              width={18}
              height={18}
              className="size-4.5 shrink-0"
              aria-hidden
            />
          </ExternalLink>
        ) : null}

        <MapEmbed src={embedSrc} title={title} />
      </div>
    </div>
  )
}
