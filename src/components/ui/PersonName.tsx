import Link from 'next/link'

import { cn } from '@/lib/cn'

type PersonNameProps = {
  name: string
  href: string | null
  className?: string
}

export function PersonName({ name, href, className }: PersonNameProps) {
  const styles = cn(
    'font-serif font-normal text-foreground transition-colors',
    href &&
      'cursor-pointer underline decoration-brand decoration-2 underline-offset-[0.2em] hover:text-foreground hover:decoration-brand',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={styles}>
        {name}
      </Link>
    )
  }

  return <span className={styles}>{name}</span>
}
