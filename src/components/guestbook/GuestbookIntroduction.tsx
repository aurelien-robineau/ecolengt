import { CmsRichText } from '@/components/cms/CmsRichText'
import type { CmsRichTextContent } from '@/lib/cms/richText'

type GuestbookIntroductionProps = {
  introduction: CmsRichTextContent | null
}

export function GuestbookIntroduction({ introduction }: GuestbookIntroductionProps) {
  if (!introduction) {
    return null
  }

  return (
    <article className="mb-20 max-w-2xl">
      <CmsRichText data={introduction} />
    </article>
  )
}
