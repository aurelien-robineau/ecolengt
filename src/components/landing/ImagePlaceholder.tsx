import { cn } from '@/lib/cn'

type ImagePlaceholderProps = {
  caption?: string
  wide?: boolean
  tone?: 0 | 1 | 2 | 3
  className?: string
}

const tones = ['bg-[#e8e0d0]', 'bg-[#e2ddd4]', 'bg-[#ddd8d0]', 'bg-[#e6e0d4]']

export function ImagePlaceholder({ caption, wide, tone = 0, className }: ImagePlaceholderProps) {
  return (
    <figure
      className={cn(
        'group relative overflow-hidden bg-surface-elevated',
        wide ? 'col-span-2 aspect-2/1' : 'aspect-square',
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]',
          tones[tone],
        )}
      >
        <svg
          className="h-10 w-10 stroke-foreground-subtle opacity-35"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden
        >
          <circle cx="32" cy="40" r="18" strokeWidth="1.5" />
          <ellipse cx="32" cy="22" rx="12" ry="5" strokeWidth="1.5" />
          <line x1="32" y1="2" x2="32" y2="16" strokeWidth="1.5" />
        </svg>
      </div>
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 bg-linear-to-t from-surface/95 to-transparent px-6 py-6 text-xs tracking-[0.08em] text-foreground-muted opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
