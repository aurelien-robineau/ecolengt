import { formatPostalCityLine } from '@/lib/cms/formatAddress'
import { cn } from '@/lib/cn'

type AddressContentProps = {
  street: string
  postalCode: string
  city: string
  mapsUrl: string
  className?: string
  linkClassName?: string
}

export function AddressContent({
  street,
  postalCode,
  city,
  mapsUrl,
  className,
  linkClassName,
}: AddressContentProps) {
  const cityLine = formatPostalCityLine(postalCode, city)

  const lines = (
    <>
      {street}
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
