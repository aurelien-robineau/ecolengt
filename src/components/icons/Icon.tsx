import { cn } from '@/lib/cn'
import { iconPaths, type IconName } from '@/lib/icons'

type IconProps = {
  name: IconName
  className?: string
}

/** Renders a `/public/icons` SVG tinted with `currentColor` via CSS mask. */
export function Icon({ name, className }: IconProps) {
  const src = iconPaths[name]

  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
