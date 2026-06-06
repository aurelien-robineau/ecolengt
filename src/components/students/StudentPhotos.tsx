'use client'

import { useMemo, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { CmsImage } from '@/components/cms/CmsImage'
import { ImageLightbox, type LightboxSlide } from '@/components/ui/ImageLightbox'
import type { CmsImageData } from '@/lib/content/types'

type StudentPhotosProps = {
  photos: CmsImageData[]
}

const mobileFrameClassName =
  'bleed-x-sm relative overflow-hidden bg-surface-elevated media-ratio-gallery md:hidden'
const desktopFrameClassName =
  'relative hidden w-[42rem] max-w-full overflow-hidden bg-surface-elevated media-ratio-gallery md:block'

function formatPhotoCount(count: number): string {
  return count === 1 ? '1 photo' : `${count} photos`
}

type StudentPhotoFrameProps = {
  image: NonNullable<CmsImageData>
  className: string
  sizes: string
  hasMultiple: boolean
  photoCountLabel: string
  onOpenGallery: () => void
}

function StudentPhotoFrame({
  image,
  className,
  sizes,
  hasMultiple,
  photoCountLabel,
  onOpenGallery,
}: StudentPhotoFrameProps) {
  return (
    <div className={className}>
      <CmsImage
        image={image}
        fill
        className="object-cover"
        sizes={sizes}
        priority
        loading="eager"
        fetchPriority="high"
      />
      {hasMultiple ? (
        <button
          type="button"
          className="absolute inset-0 z-10 flex cursor-zoom-in flex-col justify-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          onClick={onOpenGallery}
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
      ) : null}
    </div>
  )
}

export function StudentPhotos({ photos }: StudentPhotosProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = useMemo(
    () =>
      photos
        .filter((photo): photo is NonNullable<CmsImageData> => photo !== null)
        .map((image) => ({ image })),
    [photos],
  )

  const slides = useMemo<LightboxSlide[]>(
    () => items.map((item) => ({ image: item.image })),
    [items],
  )

  if (!items.length) {
    return null
  }

  const preview = items[0].image
  const hasMultiple = items.length > 1
  const photoCountLabel = formatPhotoCount(items.length)

  return (
    <figure className="mb-12">
      <StudentPhotoFrame
        image={preview}
        className={mobileFrameClassName}
        sizes="100vw"
        hasMultiple={hasMultiple}
        photoCountLabel={photoCountLabel}
        onOpenGallery={() => setOpenIndex(0)}
      />
      <StudentPhotoFrame
        image={preview}
        className={desktopFrameClassName}
        sizes="42rem"
        hasMultiple={hasMultiple}
        photoCountLabel={photoCountLabel}
        onOpenGallery={() => setOpenIndex(0)}
      />
      {openIndex !== null ? (
        <ImageLightbox
          slides={slides}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}
    </figure>
  )
}
