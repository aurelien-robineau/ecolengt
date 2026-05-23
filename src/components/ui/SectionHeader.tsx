import { cn } from '@/lib/cn'
import { sectionLabelClassName } from '@/lib/ui/typography'

type SectionHeaderProps = {
  label?: string
  title: string
  /** Use `h1` for the primary page heading; `h2` for sections (default). */
  titleAs?: 'h1' | 'h2'
  className?: string
}

const titleClassName =
  'font-serif text-[clamp(1.625rem,3vw,2.375rem)] leading-[1.15] font-light text-balance text-foreground-muted'

export function SectionHeader({ label, title, titleAs = 'h2', className }: SectionHeaderProps) {
  const TitleTag = titleAs

  return (
    <header className={cn('mb-12', className)}>
      {label ? (
        <p className={cn('mb-3 tracking-[0.22em]', sectionLabelClassName)}>
          {label}
        </p>
      ) : null}
      <TitleTag className={titleClassName}>{title}</TitleTag>
    </header>
  )
}
