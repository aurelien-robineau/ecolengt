'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { CmsImage } from '@/components/cms/CmsImage'
import { ImageLightbox, type LightboxSlide } from '@/components/ui/ImageLightbox'
import type { GalleryItem } from '@/lib/content/types'
import { cn } from '@/lib/cn'

/** Galleries with more than this many photos collapse to one preview on mobile. */
const MOBILE_GALLERY_COLLAPSE_ABOVE = 3

function formatPhotoCount(count: number): string {
  return count === 1 ? '1 photo' : `${count} photos`
}

type GalleryProps = {
  items: GalleryItem[]
  columns?: 2 | 3
  /** When only one image: show full photo without cropping. */
  naturalSingle?: boolean
  /** Lightbox on single-image layout. Defaults to true. */
  singleLightbox?: boolean
  /** Wrapper classes when only one image (natural layout). */
  singleFigureClassName?: string
  /** Image classes when only one image (natural layout). */
  singleImageClassName?: string
  /** Eager-load the first image (above-the-fold galleries). */
  priorityFirstImage?: boolean
}

const layoutByColumns = {
  2: {
    itemClassName: 'w-full sm:w-[calc((100%-0.125rem)/2)]',
    imageSizes: '(max-width: 640px) 100vw, 50vw',
  },
  3: {
    itemClassName: 'w-full sm:w-[calc((100%-0.125rem)/2)] lg:w-[calc((100%-0.25rem)/3)]',
    imageSizes: '(max-width: 500px) 100vw, (max-width: 768px) 50vw, 33vw',
  },
} as const

function toSlides(items: GalleryItem[]): LightboxSlide[] {
  return items.map((item) => ({ image: item.image }))
}

/** Avoid below-fold gallery images competing for LCP before the user scrolls near them. */
function useGalleryInView(loadImmediately = false) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(loadImmediately)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => setShouldLoad(true))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { containerRef, shouldLoad }
}

type GalleryMobilePreviewProps = {
  items: GalleryItem[]
  shouldLoad: boolean
  priorityFirstImage: boolean
  onOpen: (index: number) => void
}

function GalleryMobilePreview({
  items,
  shouldLoad,
  priorityFirstImage,
  onOpen,
}: GalleryMobilePreviewProps) {
  const item = items[0]
  const photoCount = items.length
  const photoCountLabel = formatPhotoCount(photoCount)

  return (
    <figure className="media-ratio-gallery relative overflow-hidden bg-surface-elevated">
      {shouldLoad || priorityFirstImage ? (
        <>
          <CmsImage
            image={item.image}
            fill
            className="object-cover"
            sizes="100vw"
            priority={priorityFirstImage}
            loading={priorityFirstImage ? 'eager' : 'lazy'}
            fetchPriority={priorityFirstImage ? 'high' : 'low'}
          />
          <button
            type="button"
            className="absolute inset-0 z-10 flex cursor-zoom-in flex-col justify-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            onClick={() => onOpen(0)}
            aria-label={`Ouvrir le diaporama : ${photoCountLabel}`}
          >
            <span
              className="pointer-events-none absolute top-3 right-3 inline-flex min-h-8 items-center gap-1.5 rounded-md border border-white/25 bg-foreground/80 px-2.5 text-xs font-medium tracking-[var(--tracking-wide)] text-foreground-inverse uppercase shadow-subtle backdrop-blur-sm"
              aria-hidden
            >
              <span className="relative inline-flex h-3.5 w-4 shrink-0">
                <span className="absolute top-0 right-0 h-2.5 w-3 rounded-[2px] border border-white/50 bg-white/25" />
                <span className="absolute bottom-0 left-0 h-2.5 w-3 rounded-[2px] border border-white/70 bg-white/40" />
              </span>
              {photoCountLabel}
            </span>

            <span
              className="pointer-events-none flex w-full items-center justify-between gap-3 bg-linear-to-t from-foreground/85 via-foreground/55 to-transparent px-4 pt-12 pb-4"
              aria-hidden
            >
              <span className="text-left text-sm font-medium tracking-[var(--tracking-wide)] text-foreground-inverse uppercase">
                Parcourir la galerie
              </span>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-foreground-inverse">
                <Icon name="chevronRight" className="size-4" />
              </span>
            </span>
          </button>
        </>
      ) : (
        <div className="media-ratio-gallery w-full" aria-hidden />
      )}
    </figure>
  )
}

export function Gallery({
  items,
  columns = 2,
  naturalSingle = true,
  singleLightbox = true,
  singleFigureClassName = 'max-w-3xl',
  singleImageClassName = 'max-h-[min(85dvh,56rem)]',
  priorityFirstImage = false,
}: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { containerRef, shouldLoad } = useGalleryInView(priorityFirstImage)

  const slides = useMemo(() => toSlides(items), [items])

  if (!items.length) {
    return null
  }

  const layout = layoutByColumns[columns]
  const isSingleNatural = naturalSingle && items.length === 1
  const collapseOnMobile = items.length > MOBILE_GALLERY_COLLAPSE_ABOVE

  if (isSingleNatural) {
    const item = items[0]

    const image = (
      <CmsImage
        image={item.image}
        fit="contain"
        className={singleImageClassName}
        sizes="(max-width: 768px) 100vw, 28rem"
        priority
        loading="eager"
        fetchPriority="high"
      />
    )

    return (
      <>
        <figure
          className={cn(
            'mb-12',
            singleFigureClassName === 'max-w-3xl' && 'bleed-x-sm',
            singleFigureClassName,
          )}
        >
          {singleLightbox ? (
            <button
              type="button"
              className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              onClick={() => setOpenIndex(0)}
              aria-label={`Agrandir la photo${item.image.alt ? ` : ${item.image.alt}` : ''}`}
            >
              {image}
            </button>
          ) : (
            image
          )}
        </figure>
        {singleLightbox && openIndex !== null ? (
          <ImageLightbox
            slides={slides}
            initialIndex={openIndex}
            onClose={() => setOpenIndex(null)}
          />
        ) : null}
      </>
    )
  }

  return (
    <>
      <div ref={containerRef}>
        {collapseOnMobile ? (
          <div className="bleed-x-sm md:hidden">
            <GalleryMobilePreview
              items={items}
              shouldLoad={shouldLoad}
              priorityFirstImage={priorityFirstImage}
              onOpen={setOpenIndex}
            />
          </div>
        ) : null}

        <div
          className={cn(
            'bleed-x-sm flex flex-wrap justify-center gap-0.5',
            collapseOnMobile && 'hidden md:flex',
          )}
        >
          {items.map((item, index) => {
            const isPriorityImage = priorityFirstImage && index === 0

            return (
              <figure
                key={`${item.image.src}-${index}`}
                className={cn(
                  'group media-ratio-gallery relative overflow-hidden bg-surface-elevated',
                  layout.itemClassName,
                )}
              >
                {shouldLoad || isPriorityImage ? (
                  <>
                    <CmsImage
                      image={item.image}
                      fill
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes={layout.imageSizes}
                      priority={isPriorityImage}
                      loading={isPriorityImage ? 'eager' : 'lazy'}
                      fetchPriority={isPriorityImage ? 'high' : 'low'}
                    />
                    <button
                      type="button"
                      className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`Agrandir la photo${item.image.alt ? ` : ${item.image.alt}` : ''}`}
                    />
                  </>
                ) : (
                  <div className="media-ratio-gallery w-full" aria-hidden />
                )}
              </figure>
            )
          })}
        </div>
      </div>
      {openIndex !== null ? (
        <ImageLightbox
          slides={slides}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}
    </>
  )
}
