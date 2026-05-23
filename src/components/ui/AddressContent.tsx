import { externalLinkAriaLabel } from '@/lib/a11y/externalLink'
import { formatPostalCityLine } from '@/lib/cms/formatAddress'
import { cn } from '@/lib/cn'

type AddressContentProps = {
  street: string
  streetLine2?: string
  postalCode: string
  city: string
  mapsUrl: string
  className?: string
  linkClassName?: string
}

export function AddressContent({
  street,
  streetLine2,
  postalCode,
  city,
  mapsUrl,
  className,
  linkClassName,
}: AddressContentProps) {
  const cityLine = formatPostalCityLine(postalCode, city)
  const addressLines = [streetLine2?.trim(), street.trim(), cityLine].filter(Boolean)

  const lines = addressLines.map((line, index) => (
    <span key={index}>
      {index > 0 ?
        <br />
      : null}
      {line}
    </span>
  ))

  if (!mapsUrl) {
    return <address className={cn('not-italic', className)}>{lines}</address>
  }

  const mapsLabel = externalLinkAriaLabel('Voir l’adresse sur Google Maps', mapsUrl)

  return (
    <address className="not-italic">
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        aria-label={mapsLabel}
      >
        {lines}
      </a>
    </address>
  )
}
