import { CmsRichText } from '@/components/cms/CmsRichText'
import type { IntensiveCoursesSubPageData } from '@/lib/cms/types'

type IntensiveCoursesRichTextProps = {
  content: IntensiveCoursesSubPageData['content']
}

export function IntensiveCoursesRichText({ content }: IntensiveCoursesRichTextProps) {
  if (!content) {
    return null
  }

  return (
    <div className="max-w-2xl">
      <CmsRichText data={content} />
    </div>
  )
}
