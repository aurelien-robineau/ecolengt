import { cn } from '@/lib/cn'

type AddressContentProps = {
  street: string
  city: string
  mapsUrl: string
  className?: string
  linkClassName?: string
}

export function AddressContent({
  street,
  city,
  mapsUrl,
  className,
  linkClassName,
}: AddressContentProps) {
  const lines = (
    <>
      {street}
      <br />
      {city}
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
