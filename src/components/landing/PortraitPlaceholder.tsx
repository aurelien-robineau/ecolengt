import { cn } from '@/lib/cn'

type PortraitPlaceholderProps = {
  alt: string
  className?: string
  variant?: 'default' | 'onBrand'
}

const backgrounds = {
  default: 'bg-[#e8e0d0]',
  onBrand: 'bg-foreground/8 ring-1 ring-foreground/10',
}

export function PortraitPlaceholder({
  alt,
  className,
  variant = 'default',
}: PortraitPlaceholderProps) {
  return (
    <figure
      className={cn('relative aspect-4/5 w-full max-w-md overflow-hidden', backgrounds[variant], className)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="h-14 w-14 stroke-foreground-subtle opacity-35"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden
        >
          <circle cx="32" cy="40" r="18" strokeWidth="1.5" />
          <ellipse cx="32" cy="22" rx="12" ry="5" strokeWidth="1.5" />
          <line x1="32" y1="2" x2="32" y2="16" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="sr-only">{alt}</span>
    </figure>
  )
}
