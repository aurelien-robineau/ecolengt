import Link from 'next/link'
import { externalLinkAriaLabel } from '@/lib/a11y/externalLink'
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
  'inline-flex min-h-11 box-border items-center justify-center rounded-md no-underline text-base font-medium leading-none tracking-[var(--tracking-wide)] transition-[color,background-color,border-color,box-shadow] duration-150'

const variants = {
  primary:
    'border border-transparent bg-brand px-6 text-foreground uppercase hover:bg-brand-hover hover:shadow-subtle sm:px-8',
  ghost:
    'border border-brand-border px-5 text-foreground-muted uppercase hover:border-foreground hover:text-foreground',
} as const

export function Button({ href, children, variant = 'primary', className, onClick }: ButtonProps) {
  const classNames = cn(base, variants[variant], className)
  const resolvedHref = resolveHashHref(href)
  const trimmedHref = href.trim()
  const external = isExternalHref(href)
  const isSpecialScheme = /^(mailto:|tel:|sms:)/i.test(trimmedHref)
  const childText = typeof children === 'string' ? children : undefined
  const externalLabel = external && childText ? externalLinkAriaLabel(childText, href) : undefined

  if (resolvedHref.includes('#') || external || isSpecialScheme) {
    return (
      <a
        href={isSpecialScheme ? trimmedHref : external ? href : resolvedHref}
        className={classNames}
        onClick={onClick}
        aria-label={externalLabel}
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
