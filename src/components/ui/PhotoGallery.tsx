import { CmsImage } from '@/components/cms/CmsImage'
import { ImagePlaceholder } from '@/components/landing/ImagePlaceholder'
import type { GalleryItem } from '@/lib/cms/types'
import { cn } from '@/lib/cn'

type PhotoGalleryProps = {
  items: GalleryItem[]
  columns?: 2 | 4
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

export function PhotoGallery({ items, columns = 4 }: PhotoGalleryProps) {
  if (!items.length) {
    return null
  }

  const layout = layoutByColumns[columns]

  return (
    <div className={layout.grid}>
      {items.map((item, index) => (
        <figure
          key={`${item.caption}-${index}`}
          className={cn(
            'group relative overflow-hidden bg-surface-elevated',
            item.wide ? layout.itemWide : layout.item,
          )}
        >
          {item.image ?
            <CmsImage
              image={item.image}
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={layout.imageSizes(item.wide)}
            />
          : <ImagePlaceholder
              caption={item.caption}
              tone={(index % 4) as 0 | 1 | 2 | 3}
              embedded
            />
          }
          {item.caption && item.image ?
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 bg-linear-to-t from-surface/95 to-transparent px-6 py-6 text-xs tracking-[0.08em] text-foreground-muted opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.caption}
            </figcaption>
          : null}
        </figure>
      ))}
    </div>
  )
}
