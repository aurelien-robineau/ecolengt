import { PhotoGallery } from '@/components/ui/PhotoGallery'
import type { GalleryItem } from '@/lib/cms/types'
import { sectionLabelClassName } from '@/lib/ui/typography'

type ContactAccessGalleryProps = {
  items: GalleryItem[]
}

export function ContactAccessGallery({ items }: ContactAccessGalleryProps) {
  if (!items.length) {
    return null
  }

  return (
    <div className="mb-16">
      <h2 className={`mb-8 ${sectionLabelClassName}`}>Accès</h2>
      <PhotoGallery items={items} columns={2} />
    </div>
  )
}
