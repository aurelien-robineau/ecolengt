import { CmsRichText } from '@/components/cms/CmsRichText'
import { Gallery } from '@/components/ui/Gallery'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { CmsRichTextContent, GalleryItem } from '@/lib/cms/types'
import { pageSectionTitleClassName } from '@/lib/ui/typography'

type ContactAccessGalleryProps = {
  directions: CmsRichTextContent | null
  items: GalleryItem[]
}

export function ContactAccessGallery({ directions, items }: ContactAccessGalleryProps) {
  const hasDirections = directions && hasLexicalContent(directions)
  const hasGallery = items.length > 0

  if (!hasDirections && !hasGallery) {
    return null
  }

  return (
    <div className="mb-16">
      <h2 className={`mb-10 ${pageSectionTitleClassName}`}>Accès</h2>

      {hasDirections ?
        <div className="mb-10 max-w-xl">
          <CmsRichText data={directions} />
        </div>
      : null}

      {hasGallery ?
        <Gallery items={items} columns={2} />
      : null}
    </div>
  )
}
