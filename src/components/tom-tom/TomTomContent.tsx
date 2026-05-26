import { CmsRichText } from '@/components/cms/CmsRichText'
import type { TomTomPageData } from '@/lib/content/types'

type TomTomContentProps = {
  content: TomTomPageData['content']
}

export function TomTomContent({ content }: TomTomContentProps) {
  if (!content) {
    return null
  }

  return (
    <div className="max-w-2xl border-t border-foreground/10 pt-10">
      <CmsRichText data={content} />
    </div>
  )
}
