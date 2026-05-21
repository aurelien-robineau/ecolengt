'use client'

import { useMemo, useState } from 'react'

import { CmsImage } from '@/components/cms/CmsImage'
import { ImageLightbox, type LightboxSlide } from '@/components/ui/ImageLightbox'
import { ImagePlaceholder } from '@/components/landing/ImagePlaceholder'
import type { CmsImageData, GalleryItem } from '@/lib/cms/types'
import { cn } from '@/lib/cn'

type PhotoGalleryProps = {
  items: GalleryItem[]
  columns?: 2 | 4
  /** When only one image: show full photo without cropping. */
  naturalSingle?: boolean
  /** Lightbox on single-image layout. Defaults to true. */
  singleLightbox?: boolean
  /** Wrapper classes when only one image (natural layout). */
  singleFigureClassName?: string
  /** Image classes when only one image (natural layout). */
  singleImageClassName?: string
}

const layoutByColumns = {
  2: {
    grid: 'grid grid-cols-1 gap-0.5 bg-border sm:grid-cols-2',
    item: 'aspect-4/3',
    itemWide: 'sm:col-span-2 aspect-2/1',
    imageSizes: (wide: boolean) => (wide ? '100vw' : '(max-width: 640px) 100vw, 50vw'),
  },
  4: {
    grid: 'grid grid-cols-1 gap-0.5 bg-border sm:grid-cols-2 lg:grid-cols-4',
    item: 'aspect-square',
    itemWide: 'sm:col-span-2 aspect-2/1',
    imageSizes: (wide: boolean) =>
      wide ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
} as const

function toSlides(items: GalleryItem[]): LightboxSlide[] {
  return items
    .filter((item): item is GalleryItem & { image: NonNullable<CmsImageData> } => item.image !== null)
    .map((item) => ({ image: item.image }))
}

export function PhotoGallery({
  items,
  columns = 4,
  naturalSingle = true,
  singleLightbox = true,
  singleFigureClassName = 'max-w-3xl',
  singleImageClassName = 'max-h-[min(85dvh,56rem)]',
}: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
      <div className={layout.grid}>
        {items.map((item, index) => {
          const slideIndex = slideIndexByItem.get(index)

          return (
            <figure
              key={`${item.image?.src ?? 'placeholder'}-${index}`}
              className={cn(
                'group relative overflow-hidden bg-surface-elevated',
                item.wide ? layout.itemWide : layout.item,
              )}
            >
              {item.image ?
                <>
                  <CmsImage
                    image={item.image}
                    className="pointer-events-none absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes={layout.imageSizes(item.wide)}
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
