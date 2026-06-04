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

export function ImageLightbox({ slides, initialIndex, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const statusId = useId()

  const slide = slides[index]
  const hasMultiple = slides.length > 1

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  useEffect(() => {
    queueMicrotask(() => setIndex(initialIndex))
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

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-110 flex flex-col overflow-hidden bg-foreground/92 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={hasMultiple ? statusId : undefined}
      onClick={onClose}
    >
      <p id={titleId} className="sr-only">
        {dialogLabel}
      </p>

      <div className="flex shrink-0 justify-end">
        <button
          ref={closeButtonRef}
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          onClick={(event) => {
            event.stopPropagation()
            onClose()
          }}
          aria-label="Fermer"
        >
          <Icon name="close" className="size-4.5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {hasMultiple ? (
          <button
            type="button"
            className="absolute top-1/2 left-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-2 sm:size-11"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
            aria-label="Photo précédente"
          >
            <Icon name="chevronLeft" className="size-5" />
          </button>
        ) : null}

        {hasMultiple ? (
          <button
            type="button"
            className="absolute top-1/2 right-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-2 sm:size-11"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            aria-label="Photo suivante"
          >
            <Icon name="chevronRight" className="size-5" />
          </button>
        ) : null}

        <figure
          className={cn(
            'relative flex h-full min-h-0 w-full max-w-6xl flex-col items-center justify-center',
            hasMultiple ? 'px-11 sm:px-14' : 'px-0',
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative h-full max-h-[calc(100dvh-7rem)] w-full min-h-48 sm:max-h-[calc(100dvh-8rem)]">
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1152px) 100vw, 72rem"
              priority
            />
          </div>
          {hasMultiple ? (
            <p
              id={statusId}
              className="mt-3 shrink-0 text-xs tracking-[0.12em] text-white/50 uppercase"
              aria-live="polite"
              aria-atomic="true"
            >
              {index + 1} / {slides.length}
            </p>
          ) : null}
        </figure>
      </div>
    </div>,
    document.body,
  )
}
