import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
  )
}

type UseFocusTrapOptions = {
  active: boolean
  containerRef: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
  restoreFocusRef?: RefObject<HTMLElement | null>
}

/**
 * Traps Tab / Shift+Tab within `containerRef` while `active`, optionally focusing
 * `initialFocusRef` on activate and restoring focus on deactivate.
 */
export function useFocusTrap({
  active,
  containerRef,
  initialFocusRef,
  restoreFocusRef,
}: UseFocusTrapOptions) {
  useEffect(() => {
    if (!active) {
      return
    }

    const container = containerRef.current
    if (!container) {
      return
    }

    const previouslyFocused = document.activeElement

    // Only move focus when explicitly requested (e.g. modal close button).
    // Avoids a visible focus ring for pointer users opening overlays.
    const focusTarget = initialFocusRef?.current
    focusTarget?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }

      const focusable = getFocusableElements(container)
      if (!focusable.length) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault()
          last.focus()
        }
      } else if (activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      const restoreTarget = restoreFocusRef?.current ?? previouslyFocused
      if (restoreTarget instanceof HTMLElement) {
        restoreTarget.focus()
      }
    }
  }, [active, containerRef, initialFocusRef, restoreFocusRef])
}
