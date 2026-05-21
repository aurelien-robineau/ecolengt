import { CmsRichText } from '@/components/cms/CmsRichText'
import type { LegalNoticePageData } from '@/lib/cms/types'

type LegalNoticeContentProps = {
  content: LegalNoticePageData['content']
}

export function LegalNoticeContent({ content }: LegalNoticeContentProps) {
  if (!content) {
    return null
  }

  return (
    <div className="border-t border-foreground/10 pt-10">
      <CmsRichText data={content} />
    </div>
  )
}
