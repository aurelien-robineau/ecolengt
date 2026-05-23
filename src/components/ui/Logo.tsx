import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

type LogoVariant = 'default' | 'white'

const logoPaths: Record<LogoVariant, string> = {
  default: '/brand/logo.svg',
  white: '/brand/logo_white_text.svg',
}

type LogoProps = {
  variant?: LogoVariant
  className?: string
  href?: string
  /** Accessible name when the logo is a link (image alt is empty to avoid duplication). */
  linkLabel?: string
  priority?: boolean
}

export function Logo({
  variant = 'default',
  className,
  href = '/',
  linkLabel = 'École de Batterie NGT — Accueil',
  priority,
}: LogoProps) {
  const image = (
    <Image
      src={logoPaths[variant]}
      alt=""
      width={230}
      height={100}
      className={cn('h-auto w-auto', !className && 'max-h-12 md:max-h-14', className)}
      priority={priority}
    />
  )

  if (!href) {
    return (
      <span role="img" aria-label="École de Batterie NGT">
        {image}
      </span>
    )
  }

  return (
    <Link href={href} className="inline-flex shrink-0 no-underline" aria-label={linkLabel}>
      {image}
    </Link>
  )
}
