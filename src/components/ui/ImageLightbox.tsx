'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import type { CmsImageData } from '@/lib/cms/types'

export type LightboxSlide = {
  image: NonNullable<CmsImageData>
}

type ImageLightboxProps = {
  slides: LightboxSlide[]
  initialIndex: number
  onClose: () => void
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={direction === 'left' ? 'rotate-180' : undefined}
    >
      <path
        d="M7 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ImageLightbox({ slides, initialIndex, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [mounted, setMounted] = useState(false)

  const slide = slides[index]
  const hasMultiple = slides.length > 1

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

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

  return createPortal(
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-foreground/92 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={slide.image.alt || 'Diaporama photo'}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
        aria-label="Fermer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M4 4l10 10M14 4L4 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {hasMultiple ?
        <button
          type="button"
          className="absolute top-1/2 left-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          onClick={(event) => {
            event.stopPropagation()
            goPrev()
          }}
          aria-label="Photo précédente"
        >
          <ChevronIcon direction="left" />
        </button>
      : null}

      {hasMultiple ?
        <button
          type="button"
          className="absolute top-1/2 right-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          onClick={(event) => {
            event.stopPropagation()
            goNext()
          }}
          aria-label="Photo suivante"
        >
          <ChevronIcon direction="right" />
        </button>
      : null}

      <figure
        className="relative flex w-[min(calc(100vw-2rem),72rem)] max-w-full flex-col items-center sm:w-[min(calc(100vw-4rem),72rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[min(80dvh,900px)] w-full">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1152px) 100vw, 72rem"
            priority
          />
        </div>
        {hasMultiple ?
          <p className="mt-3 text-xs tracking-[0.12em] text-white/50 uppercase">
            {index + 1} / {slides.length}
          </p>
        : null}
      </figure>
    </div>,
    document.body,
  )
}
