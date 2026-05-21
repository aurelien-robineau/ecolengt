import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

type LogoVariant = 'default' | 'mono' | 'white' | 'black'

const logoPaths: Record<LogoVariant, string> = {
  default: '/brand/logo.svg',
  mono: '/brand/logo_mono.svg',
  white: '/brand/logo_white_text.svg',
  black: '/brand/logo_black_text.svg',
}

type LogoProps = {
  variant?: LogoVariant
  className?: string
  href?: string
  priority?: boolean
}

export function Logo({ variant = 'default', className, href = '/', priority }: LogoProps) {
  const image = (
    <Image
      src={logoPaths[variant]}
      alt="École de Batterie NGT"
      width={230}
      height={100}
      className={cn('h-auto w-auto', !className && 'max-h-12 md:max-h-14', className)}
      priority={priority}
    />
  )

  if (!href) return image

  if (href.startsWith('#')) {
    return (
      <a href={href} className="inline-flex shrink-0 no-underline">
        {image}
      </a>
    )
  }

  return (
    <Link href={href} className="inline-flex shrink-0 no-underline">
      {image}
    </Link>
  )
}
