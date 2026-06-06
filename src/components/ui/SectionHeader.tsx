import { cn } from '@/lib/cn'
import {
  sectionLabelClassName,
  stackEyebrowClassName,
  stackSectionClassName,
} from '@/lib/ui/typography'

type SectionHeaderProps = {
  label?: string
  title: string
  /** Use `h1` for the primary page heading; `h2` for sections (default). */
  titleAs?: 'h1' | 'h2'
  className?: string
}

const titleClassName =
  'type-section-title text-start text-[clamp(1.75rem,3.5vw,2.5rem)] text-balance'

export function SectionHeader({ label, title, titleAs = 'h2', className }: SectionHeaderProps) {
  const TitleTag = titleAs

  return (
    <header className={cn(stackSectionClassName, 'text-start', className)}>
      {label ? <p className={cn(stackEyebrowClassName, sectionLabelClassName)}>{label}</p> : null}
      <TitleTag className={titleClassName}>{title}</TitleTag>
    </header>
  )
}
