import { cn } from '@/lib/cn'

type ContactChannelItemProps = {
  href: string
  display: string
  label?: string | null
  linkClassName: string
  labelClassName: string
}

export function ContactChannelItem({
  href,
  display,
  label,
  linkClassName,
  labelClassName,
}: ContactChannelItemProps) {
  const trimmedLabel = label?.trim()

  if (trimmedLabel) {
    return (
      <div className="flex flex-wrap items-center gap-x-1.5">
        <span className={cn(labelClassName, 'shrink-0')}>{trimmedLabel}&nbsp;:</span>
        <a href={href} className={cn(linkClassName, 'inline leading-none')}>
          {display}
        </a>
      </div>
    )
  }

  return (
    <a href={href} className={cn(linkClassName, 'block')}>
      {display}
    </a>
  )
}
