'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { routes } from '@/config/routes'
import { getFocusableElements, useFocusTrap } from '@/lib/a11y/focus'
import type { SiteSettingsData } from '@/lib/cms/types'
import { cn } from '@/lib/cn'
import { resolveHashHref } from '@/lib/resolveHashHref'

type HeaderProps = {
  site: SiteSettingsData
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      {open ?
        <>
          <path d="M6 6l12 12" strokeLinecap="round" />
          <path d="M18 6L6 18" strokeLinecap="round" />
        </>
      : <>
          <path d="M4 7h16" strokeLinecap="round" />
          <path d="M4 12h16" strokeLinecap="round" />
          <path d="M4 17h16" strokeLinecap="round" />
        </>
      }
    </svg>
  )
}

const MENU_TRANSITION_MS = 300

function isNavItemActive(pathname: string, href: string): boolean {
  const path = resolveHashHref(href).split('#')[0] ?? '/'

  if (path === routes.home) {
    return pathname === routes.home
  }

  if (path === routes.alumni && pathname.startsWith(`${routes.students}/`)) {
    return true
  }

  return pathname === path || pathname.startsWith(`${path}/`)
}

function navLinkClassName(isActive: boolean, variant: 'desktop' | 'mobile'): string {
  if (variant === 'desktop') {
    return cn(
      'text-[11px] tracking-[0.12em] uppercase no-underline transition-colors',
      isActive ? 'text-foreground' : 'text-foreground-muted hover:text-foreground',
    )
  }

  return cn(
    'block py-3 font-serif text-2xl font-light no-underline transition-colors',
    isActive ? 'text-foreground' : 'text-foreground-muted hover:text-foreground',
  )
}

export function Header({ site }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    window.setTimeout(() => setMenuMounted(false), MENU_TRANSITION_MS)
  }, [])

  const openMenu = useCallback(() => {
    const openedWithKeyboard = menuButtonRef.current?.matches(':focus-visible') ?? false

    setMenuMounted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMenuOpen(true)

        if (openedWithKeyboard) {
          requestAnimationFrame(() => {
            const nav = mobileNavRef.current
            if (!nav) return
            getFocusableElements(nav)[0]?.focus()
          })
        }
      })
    })
  }, [])

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [closeMenu, menuOpen, openMenu])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        closeMenu()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeMenu, menuOpen])

  useFocusTrap({
    active: menuOpen,
    containerRef: mobileNavRef,
    restoreFocusRef: menuButtonRef,
  })

  const mobileMenu =
    mounted && menuMounted ?
      createPortal(
        <>
          <div
            className={cn(
              'fixed inset-0 z-90 bg-foreground/25 transition-opacity duration-300 ease-out lg:hidden',
              menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden
            onClick={closeMenu}
          />
          <nav
            ref={mobileNavRef}
            id="mobile-nav"
            className={cn(
              'fixed top-0 right-0 z-95 flex h-dvh w-[min(100%,20rem)] flex-col border-l border-border bg-surface px-8 pt-17.5 pb-10 shadow-xl transition-transform duration-300 ease-out lg:hidden',
              menuOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full',
            )}
            aria-label="Navigation mobile"
            aria-hidden={!menuOpen}
            inert={menuOpen ? undefined : true}
          >
            <ul className="mt-8 flex list-none flex-col gap-1">
              {site.navigation.map((item) => {
                const isActive = isNavItemActive(pathname, item.href)

                return (
                  <li key={item.href}>
                    <a
                      href={resolveHashHref(item.href)}
                      className={navLinkClassName(isActive, 'mobile')}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={closeMenu}
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto pt-10">
              <Button
                href={routes.contact}
                variant="ghost"
                className="w-full text-center"
                onClick={closeMenu}
              >
                Contact
              </Button>
            </div>
          </nav>
        </>,
        document.body,
      )
    : null

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-100 transition-[background,box-shadow] duration-400',
          (scrolled || menuOpen) && 'border-b border-border shadow-sm',
          menuOpen ? 'bg-surface' : scrolled && 'bg-surface/97 backdrop-blur-sm',
        )}
      >
        <Container className="flex h-[70px] items-center justify-between gap-4">
          <Logo
            priority
            className="max-h-9 md:max-h-10"
            linkLabel={`${site.name} — Accueil`}
          />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            <ul className="flex list-none gap-8">
              {site.navigation.map((item) => {
                const isActive = isNavItemActive(pathname, item.href)

                return (
                  <li key={item.href}>
                    <a
                      href={resolveHashHref(item.href)}
                      className={navLinkClassName(isActive, 'desktop')}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground-muted transition-colors hover:border-foreground hover:text-foreground lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={toggleMenu}
            >
              <MenuIcon open={menuOpen} />
            </button>

            <Button href={routes.contact} variant="ghost" className="hidden sm:inline-flex">
              Contact
            </Button>
          </div>
        </Container>
      </header>

      {mobileMenu}
    </>
  )
}
