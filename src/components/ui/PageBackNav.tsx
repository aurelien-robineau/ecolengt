import Link from 'next/link'

import { Icon } from '@/components/icons/Icon'
import { cn } from '@/lib/cn'

type PageBackNavProps = {
  href: string
  label: string
  className?: string
}

export function PageBackNav({ href, label, className }: PageBackNavProps) {
  return (
    <nav className={cn('mb-8', className)} aria-label="Retour">
      <Link
        href={href}
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium tracking-[var(--tracking-wide)] text-foreground-muted uppercase no-underline transition-colors duration-150 hover:text-foreground"
      >
        <Icon name="chevronLeft" className="size-4" />
        {label}
      </Link>
    </nav>
  )
}
