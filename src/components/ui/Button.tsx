import Link from 'next/link'
import { cn } from '@/lib/cn'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}

const variants = {
  primary:
    'bg-brand px-9 py-3.5 text-xs font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:bg-brand-hover',
  ghost:
    'border border-brand-border px-5 py-2 text-[11px] tracking-[0.12em] text-foreground-muted uppercase transition-colors hover:border-foreground hover:text-foreground',
}

export function Button({ href, children, variant = 'primary', className }: ButtonProps) {
  const classNames = cn('inline-block no-underline', variants[variant], className)

  if (href.startsWith('#')) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  )
}
