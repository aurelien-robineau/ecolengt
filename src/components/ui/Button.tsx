import Link from 'next/link'
import { cn } from '@/lib/cn'
import { isExternalHref } from '@/lib/isExternalHref'
import { resolveHashHref } from '@/lib/resolveHashHref'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  /** sm: compact (header). md: fixed height for paired CTAs. */
  size?: 'sm' | 'md'
  className?: string
  onClick?: () => void
}

const layout = {
  sm: 'inline-flex box-border items-center justify-center no-underline leading-none',
  md: 'inline-flex h-11 box-border items-center justify-center no-underline leading-none',
} as const

const variants = {
  primary: {
    sm: 'border border-transparent bg-brand px-9 py-3.5 text-xs font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:bg-brand-hover',
    md: 'border border-transparent bg-brand px-9 text-xs font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:bg-brand-hover',
  },
  ghost: {
    sm: 'border border-brand-border px-5 py-2 text-[11px] tracking-[0.12em] text-foreground-muted uppercase transition-colors hover:border-foreground hover:text-foreground',
    md: 'border border-brand-border px-5 text-[11px] tracking-[0.12em] text-foreground-muted uppercase transition-colors hover:border-foreground hover:text-foreground',
  },
} as const

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'sm',
  className,
  onClick,
}: ButtonProps) {
  const classNames = cn(layout[size], variants[variant][size], className)
  const resolvedHref = resolveHashHref(href)
  const external = isExternalHref(href)

  if (resolvedHref.includes('#') || external) {
    return (
      <a
        href={external ? href : resolvedHref}
        className={classNames}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
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
