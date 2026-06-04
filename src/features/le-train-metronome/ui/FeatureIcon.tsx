import { cn } from '@/lib/cn'

import { metronomeIconPaths, type MetronomeIconName } from './icons'

type FeatureIconProps = {
  name: MetronomeIconName
  className?: string
}

/** Renders a metronome-feature icon tinted with `currentColor` via CSS mask. */
export function FeatureIcon({ name, className }: FeatureIconProps) {
  const src = metronomeIconPaths[name]

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
