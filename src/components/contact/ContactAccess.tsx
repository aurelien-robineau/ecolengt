import { CmsRichText } from '@/components/cms/CmsRichText'
import { Gallery } from '@/components/ui/Gallery'
import { hasLexicalContent } from '@/lib/content'
import type { CmsRichTextContent, GalleryItem } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import {
  pageSectionTitleClassName,
  sectionLabelClassName,
  stackBlockClassName,
  stackTitleClassName,
} from '@/lib/ui/typography'

type ContactAccessProps = {
  directions: CmsRichTextContent | null
  items: GalleryItem[]
}

export function ContactAccess({ directions, items }: ContactAccessProps) {
  const hasDirections = directions && hasLexicalContent(directions)
  const hasGallery = items.length > 0

  if (!hasDirections && !hasGallery) {
    return null
  }

  return (
    <section className="mt-16 md:mt-20">
      <h2 className={cn(pageSectionTitleClassName, stackBlockClassName)}>Accès</h2>

      {hasDirections ? (
        <div className={cn(hasGallery && stackBlockClassName)}>
          <h3 className={cn(sectionLabelClassName, stackTitleClassName)}>Comment s’y rendre</h3>
          <div className="max-w-2xl">
            <CmsRichText data={directions} />
          </div>
        </div>
      ) : null}

      {hasGallery ? (
        <div>
          {hasDirections ? (
            <h3 className={cn(sectionLabelClassName, stackTitleClassName)}>Photos d’accès</h3>
          ) : null}
          <Gallery items={items} columns={2} />
        </div>
      ) : null}
    </section>
  )
}
