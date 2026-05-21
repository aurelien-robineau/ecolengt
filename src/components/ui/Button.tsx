import Link from 'next/link'
import { cn } from '@/lib/cn'
import { resolveHashHref } from '@/lib/resolveHashHref'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
}

const variants = {
  primary:
    'bg-brand px-9 py-3.5 text-xs font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:bg-brand-hover',
  ghost:
    'border border-brand-border px-5 py-2 text-[11px] tracking-[0.12em] text-foreground-muted uppercase transition-colors hover:border-foreground hover:text-foreground',
}

export function Button({ href, children, variant = 'primary', className, onClick }: ButtonProps) {
  const classNames = cn('inline-block no-underline', variants[variant], className)
  const resolvedHref = resolveHashHref(href)

  if (resolvedHref.includes('#')) {
    return (
      <a href={resolvedHref} className={classNames} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classNames} onClick={onClick}>
      {children}
    </Link>
  )
}
