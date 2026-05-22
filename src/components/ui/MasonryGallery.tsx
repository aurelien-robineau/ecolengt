'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { CmsImage } from '@/components/cms/CmsImage'
import { ImageLightbox, type LightboxSlide } from '@/components/ui/ImageLightbox'
import { ImagePlaceholder } from '@/components/landing/ImagePlaceholder'
import type { CmsImageData, GalleryItem } from '@/lib/cms/types'
import { cn } from '@/lib/cn'

type MasonryGalleryProps = {
  items: GalleryItem[]
  columns?: 2 | 3 | 4
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
  4: {
    itemClassName:
      'w-full sm:w-[calc((100%-0.125rem)/2)] md:w-[calc((100%-0.25rem)/3)] lg:w-[calc((100%-0.375rem)/4)]',
    imageSizes: '(max-width: 500px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  },
} as const

function toSlides(items: GalleryItem[]): LightboxSlide[] {
  return items
    .filter((item): item is GalleryItem & { image: NonNullable<CmsImageData> } => item.image !== null)
    .map((item) => ({ image: item.image }))
}

/** Avoid below-fold gallery images competing for LCP before the user scrolls near them. */
function useGalleryInView(loadImmediately = false) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(loadImmediately)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
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

export function MasonryGallery({
  items,
  columns = 2,
  naturalSingle = true,
  singleLightbox = true,
  singleFigureClassName = 'max-w-3xl',
  singleImageClassName = 'max-h-[min(85dvh,56rem)]',
  priorityFirstImage = false,
}: MasonryGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { containerRef, shouldLoad } = useGalleryInView(priorityFirstImage)

  const slides = useMemo(() => toSlides(items), [items])
  const slideIndexByItem = useMemo(() => {
    const map = new Map<number, number>()
    let slideIndex = 0

    items.forEach((item, itemIndex) => {
      if (item.image) {
        map.set(itemIndex, slideIndex)
        slideIndex += 1
      }
    })

    return map
  }, [items])

  if (!items.length) {
    return null
  }

  const layout = layoutByColumns[columns]
  const isSingleNatural = naturalSingle && items.length === 1 && items[0]?.image

  if (isSingleNatural) {
    const item = items[0]
    const slideIndex = slideIndexByItem.get(0)
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
        <figure className={cn('mb-12', singleFigureClassName)}>
          {singleLightbox ?
            <button
              type="button"
              className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              onClick={() => slideIndex !== undefined && setOpenIndex(slideIndex)}
              aria-label={`Agrandir la photo${item.image?.alt ? ` : ${item.image.alt}` : ''}`}
            >
              {image}
            </button>
          : image}
        </figure>
        {singleLightbox && openIndex !== null ?
          <ImageLightbox slides={slides} initialIndex={openIndex} onClose={() => setOpenIndex(null)} />
        : null}
      </>
    )
  }

  return (
    <>
      <div ref={containerRef} className="flex flex-wrap justify-center gap-0.5">
        {items.map((item, index) => {
          const slideIndex = slideIndexByItem.get(index)
          const isPriorityImage = priorityFirstImage && index === 0

          return (
            <figure
              key={`${item.image?.src ?? 'placeholder'}-${index}`}
              className={cn(
                'group relative overflow-hidden bg-surface-elevated',
                layout.itemClassName,
              )}
            >
              {item.image ?
                shouldLoad || isPriorityImage ?
                  <>
                    <CmsImage
                      image={item.image}
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes={layout.imageSizes}
                      priority={isPriorityImage}
                      loading={isPriorityImage ? 'eager' : 'lazy'}
                      fetchPriority={isPriorityImage ? 'high' : 'low'}
                    />
                    {slideIndex !== undefined ?
                      <button
                        type="button"
                        className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        onClick={() => setOpenIndex(slideIndex)}
                        aria-label={`Agrandir la photo${item.image.alt ? ` : ${item.image.alt}` : ''}`}
                      />
                    : null}
                  </>
                : <div className="min-h-48 w-full" aria-hidden />
              : <ImagePlaceholder
                  caption={item.caption}
                  tone={(index % 4) as 0 | 1 | 2 | 3}
                  embedded
                />
              }
            </figure>
          )
        })}
      </div>
      {openIndex !== null ?
        <ImageLightbox slides={slides} initialIndex={openIndex} onClose={() => setOpenIndex(null)} />
      : null}
    </>
  )
}
