import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { pageSectionTitleClassName, stackBlockClassName } from '@/lib/ui/typography'

type AccessSectionCardProps = {
  children: ReactNode
  className?: string
}

const accessCardClassName = 'callout-surface bleed-x-sm bg-brand-dim card-pad-lg'

export function AccessSectionCard({ children, className }: AccessSectionCardProps) {
  return (
    <section className={cn('mt-16 md:mt-20', className)}>
      <div className={accessCardClassName}>
        <h2 className={cn(pageSectionTitleClassName, stackBlockClassName)}>Accès</h2>
        {children}
      </div>
    </section>
  )
}
