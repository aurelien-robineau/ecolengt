'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { routes } from '@/config/routes'
import { getFocusableElements, useFocusTrap } from '@/lib/a11y/focus'
import type { SiteSettingsData } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { resolveHashHref } from '@/lib/resolveHashHref'

type HeaderProps = {
  site: SiteSettingsData
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

function getNavDisplayLabel(
  item: SiteSettingsData['navigation'][number],
  variant: 'desktop' | 'mobile',
): string {
  if (variant === 'desktop' && item.shortLabel) {
    return item.shortLabel
  }

  return item.label
}

function navLinkClassName(isActive: boolean, variant: 'desktop' | 'mobile'): string {
  if (variant === 'desktop') {
    return cn(
      'relative inline-flex items-center whitespace-nowrap py-1 text-xs font-medium tracking-[var(--tracking-wide)] uppercase no-underline transition-colors duration-150 xl:text-sm xl:tracking-[var(--tracking-widest)]',
      'after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:transition-colors',
      isActive
        ? 'text-foreground after:bg-brand'
        : 'text-foreground-muted after:bg-transparent hover:text-foreground hover:after:bg-brand/35',
    )
  }

  // Drawer nav: full-width rows, left accent on active — not underlines (inline-link pattern).
  return cn(
    'block -mx-8 border-l-[3px] px-8 py-3.5 font-serif text-[1.625rem] leading-snug no-underline transition-[color,background-color,border-color]',
    isActive
      ? 'border-brand bg-brand-dim font-normal text-foreground'
      : 'border-transparent font-normal text-foreground-muted active:bg-surface-muted hover:bg-surface-muted/70 hover:text-foreground',
  )
}

function getHeaderContactAction(pathname: string, site: SiteSettingsData) {
  const firstPhone = site.contact.phones[0]

  if (pathname === routes.contact && firstPhone) {
    return { href: firstPhone.href, label: 'Nous appeler' }
  }

  return { href: routes.contact, label: 'Contact' }
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
    queueMicrotask(() => setMounted(true))
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

  const headerContactAction = getHeaderContactAction(pathname, site)

  const mobileMenu =
    mounted && menuMounted
      ? createPortal(
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
              <ul className="mt-6 flex list-none flex-col">
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

              <div className="mt-auto border-t border-border pt-8">
                <Button
                  href={headerContactAction.href}
                  className="w-full text-center"
                  onClick={closeMenu}
                >
                  {headerContactAction.label}
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
          (scrolled || menuOpen) && 'border-b border-border shadow-subtle',
          menuOpen ? 'bg-surface' : scrolled && 'bg-surface/97 backdrop-blur-sm',
        )}
      >
        <Container className="flex h-[70px] items-center gap-3 xl:gap-5">
          <Logo
            priority
            className="max-h-8 shrink-0 xl:max-h-10"
            linkLabel={`${site.name} — Accueil`}
          />

          <nav
            className="hidden min-w-0 flex-1 justify-center lg:flex"
            aria-label="Navigation principale"
          >
            <ul className="flex list-none items-center gap-x-2.5 xl:gap-x-5 2xl:gap-x-6">
              {site.navigation.map((item) => {
                const isActive = isNavItemActive(pathname, item.href)
                const displayLabel = getNavDisplayLabel(item, 'desktop')
                const ariaLabel =
                  item.shortLabel && item.shortLabel !== item.label ? item.label : undefined

                return (
                  <li key={item.href} className="shrink-0">
                    <a
                      href={resolveHashHref(item.href)}
                      className={navLinkClassName(isActive, 'desktop')}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={ariaLabel}
                    >
                      {displayLabel}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground-muted transition-[color,border-color] duration-150 hover:border-foreground hover:text-foreground lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={toggleMenu}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} className="size-5" />
            </button>

            <Button
              href={headerContactAction.href}
              className="hidden shrink-0 whitespace-nowrap px-5 sm:inline-flex xl:px-7"
            >
              {headerContactAction.label}
            </Button>
          </div>
        </Container>
      </header>

      {mobileMenu}
    </>
  )
}
