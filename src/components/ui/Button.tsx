import Link from 'next/link'
import { cn } from '@/lib/cn'
import { isExternalHref } from '@/lib/isExternalHref'
import { resolveHashHref } from '@/lib/resolveHashHref'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
}

const base =
  'inline-flex h-10 box-border items-center justify-center no-underline leading-none transition-colors'

const variants = {
  primary:
    'border border-transparent bg-brand px-9 text-xs font-medium tracking-[0.15em] text-foreground uppercase hover:bg-brand-hover',
  ghost:
    'border border-brand-border px-5 text-[11px] tracking-[0.12em] text-foreground-muted uppercase hover:border-foreground hover:text-foreground',
} as const

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  onClick,
}: ButtonProps) {
  const classNames = cn(base, variants[variant], className)
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
