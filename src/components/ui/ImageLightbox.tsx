'use client'

import Image from 'next/image'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '@/components/icons/Icon'
import { useFocusTrap } from '@/lib/a11y/focus'
import type { CmsImageData } from '@/lib/content/types'
import { cn } from '@/lib/cn'

export type LightboxSlide = {
  image: NonNullable<CmsImageData>
}

type ImageLightboxProps = {
  slides: LightboxSlide[]
  initialIndex: number
  onClose: () => void
}

const overlayButtonClassName =
  'flex items-center justify-center rounded-full border border-white/25 bg-foreground/55 text-white backdrop-blur-sm transition-colors hover:bg-foreground/75'

const ZOOM_SCALE = 2
const DOUBLE_TAP_MS = 320
const DOUBLE_TAP_MAX_DISTANCE_PX = 36

type TapPoint = {
  time: number
  x: number
  y: number
}

export function ImageLightbox({ slides, initialIndex, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [zoomed, setZoomed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTouchTapRef = useRef<TapPoint | null>(null)
  const titleId = useId()
  const statusId = useId()
  const zoomHintId = useId()

  const slide = slides[index]
  const hasMultiple = slides.length > 1

  const toggleZoom = useCallback(() => {
    setZoomed((current) => !current)
  }, [])

  const goPrev = useCallback(() => {
    lastTouchTapRef.current = null
    setZoomed(false)
    setIndex((current) => (current - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goNext = useCallback(() => {
    lastTouchTapRef.current = null
    setZoomed(false)
    setIndex((current) => (current + 1) % slides.length)
  }, [slides.length])

  const handleImagePointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0) {
        return
      }

      event.stopPropagation()

      if (event.pointerType === 'touch') {
        const now = Date.now()
        const point = { time: now, x: event.clientX, y: event.clientY }
        const previous = lastTouchTapRef.current

        if (
          previous &&
          now - previous.time <= DOUBLE_TAP_MS &&
          Math.hypot(point.x - previous.x, point.y - previous.y) <= DOUBLE_TAP_MAX_DISTANCE_PX
        ) {
          event.preventDefault()
          lastTouchTapRef.current = null
          toggleZoom()
          return
        }

        lastTouchTapRef.current = point
        return
      }

      toggleZoom()
    },
    [toggleZoom],
  )

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      setIndex(initialIndex)
      setZoomed(false)
      lastTouchTapRef.current = null
    })
  }, [initialIndex])

  useFocusTrap({
    active: mounted && Boolean(slide),
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
  })

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft' && hasMultiple) {
        goPrev()
      } else if (event.key === 'ArrowRight' && hasMultiple) {
        goNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [goNext, goPrev, hasMultiple, onClose])

  if (!mounted || !slide) {
    return null
  }

  const dialogLabel = slide.image.alt || 'Diaporama photo'
  const describedBy =
    [hasMultiple ? statusId : null, zoomHintId].filter(Boolean).join(' ') || undefined

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-110 touch-none overflow-hidden bg-foreground"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={describedBy}
      onClick={onClose}
    >
      <p id={titleId} className="sr-only">
        {dialogLabel}
      </p>
      <p id={zoomHintId} className="sr-only">
        Cliquez sur l’image pour zoomer. Double-tapez sur écran tactile.
      </p>

      <figure
        className={cn(
          'absolute inset-0 overflow-hidden',
          zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
        )}
        onClick={(event) => event.stopPropagation()}
        onPointerUp={handleImagePointerUp}
      >
        <div
          className="relative h-full w-full transition-transform duration-200 ease-out"
          style={{ transform: zoomed ? `scale(${ZOOM_SCALE})` : undefined }}
        >
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            className="pointer-events-none object-contain select-none"
            sizes="100vw"
            priority
            draggable={false}
          />
        </div>
      </figure>

      <button
        ref={closeButtonRef}
        type="button"
        className={cn(
          overlayButtonClassName,
          'absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-20 size-11',
        )}
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
        aria-label="Fermer"
      >
        <Icon name="close" className="size-4.5" />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            className={cn(
              overlayButtonClassName,
              'absolute top-1/2 left-[max(0.75rem,env(safe-area-inset-left))] z-20 size-11 -translate-y-1/2',
            )}
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
            aria-label="Photo précédente"
          >
            <Icon name="chevronLeft" className="size-5" />
          </button>

          <button
            type="button"
            className={cn(
              overlayButtonClassName,
              'absolute top-1/2 right-[max(0.75rem,env(safe-area-inset-right))] z-20 size-11 -translate-y-1/2',
            )}
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            aria-label="Photo suivante"
          >
            <Icon name="chevronRight" className="size-5" />
          </button>

          <p
            id={statusId}
            className="pointer-events-none absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-foreground/55 px-3 py-1.5 text-xs tracking-[0.12em] text-white/80 uppercase backdrop-blur-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            {index + 1} / {slides.length}
          </p>
        </>
      ) : null}
    </div>,
    document.body,
  )
}
