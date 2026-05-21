import { CmsRichText } from '@/components/cms/CmsRichText'
import type { CmsRichTextContent } from '@/lib/cms/richText'

type AlumniIntroProps = {
  content: CmsRichTextContent | null
}

export function AlumniIntro({ content }: AlumniIntroProps) {
  if (!content) {
    return null
  }

  return (
    <div className="mb-12 max-w-2xl">
      <CmsRichText data={content} />
    </div>
  )
}
