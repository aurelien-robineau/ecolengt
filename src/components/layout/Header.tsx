'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-400',
        scrolled && 'border-b border-border bg-surface/97 shadow-sm backdrop-blur-sm',
      )}
    >
      <Container className="flex h-[70px] items-center justify-between">
        <Logo priority className="max-h-9 md:max-h-10" />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          <ul className="flex list-none gap-8">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[11px] tracking-[0.12em] text-foreground-muted uppercase no-underline transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button href="#contact" variant="ghost">
          Contact
        </Button>
      </Container>
    </header>
  )
}
