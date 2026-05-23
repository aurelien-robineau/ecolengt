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
  const line2 = streetLine2?.trim()

  const lines = (
    <>
      {street}
      {line2 ?
        <>
          <br />
          {line2}
        </>
      : null}
      {cityLine ?
        <>
          <br />
          {cityLine}
        </>
      : null}
    </>
  )

  if (!mapsUrl) {
    return <address className={cn('not-italic', className)}>{lines}</address>
  }

  return (
    <address className="not-italic">
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {lines}
      </a>
    </address>
  )
}
