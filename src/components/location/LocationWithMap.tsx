import { CmsRichText } from '@/components/cms/CmsRichText'
import { AddressContent } from '@/components/ui/AddressContent'
import type { CmsRichTextContent, PageAddressData } from '@/lib/cms/types'
import { cn } from '@/lib/cn'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import { contactLinkValueClassName, contactValueClassName, sectionLabelClassName } from '@/lib/ui/typography'

type LocationWithMapProps = {
  address: PageAddressData
  mapsEmbedSrc: string
  mapTitle: string
  directions?: CmsRichTextContent | null
  className?: string
}

export function LocationWithMap({
  address,
  mapsEmbedSrc,
  mapTitle,
  directions,
  className,
}: LocationWithMapProps) {
  const hasAddress = Boolean(address.street || address.city)
  const hasDirections = directions && hasLexicalContent(directions)
  const hasMap = Boolean(mapsEmbedSrc)
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
      {hasAside ?
        <aside className="border border-brand-border bg-brand-dim p-6 md:p-8">
          {hasAddress ?
            <>
              <h3 className={cn(sectionLabelClassName, 'mb-4')}>Adresse</h3>
              <AddressContent
                street={address.street}
                city={address.city}
                mapsUrl={address.mapsUrl}
                className={contactValueClassName}
                linkClassName={contactLinkValueClassName}
              />
            </>
          : null}
          {hasDirections ?
            <div className={cn(hasAddress && 'mt-8 border-t border-brand-border/50 pt-8')}>
              {hasAddress ?
                <h3 className={cn(sectionLabelClassName, 'mb-4')}>Comment s’y rendre</h3>
              : null}
              <CmsRichText data={directions} />
            </div>
          : null}
        </aside>
      : null}

      {hasMap ?
        <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-muted lg:aspect-auto lg:min-h-112">
          <iframe
            src={mapsEmbedSrc}
            title={mapTitle}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      : null}
    </div>
  )
}
