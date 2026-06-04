import { Icon } from '@/components/icons/Icon'

type PortraitPlaceholderProps = {
  alt: string
}

export function PortraitPlaceholder({ alt }: PortraitPlaceholderProps) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name="drum" className="size-14 text-foreground-subtle opacity-35" />
      </div>
      <span className="sr-only">{alt}</span>
    </>
  )
}
