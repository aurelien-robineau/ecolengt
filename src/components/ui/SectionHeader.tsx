import { cn } from '@/lib/cn'
import { sectionLabelClassName } from '@/lib/ui/typography'

type SectionHeaderProps = {
  label?: string
  title: string
  className?: string
}

export function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <header className={cn('mb-12', className)}>
      {label ? (
        <p className={cn('mb-3 tracking-[0.22em]', sectionLabelClassName)}>
          {label}
        </p>
      ) : null}
      <h2 className="font-serif text-[clamp(1.625rem,3vw,2.375rem)] leading-[1.15] font-light text-balance text-foreground-muted">
        {title}
      </h2>
    </header>
  )
}
