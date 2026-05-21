import { defaultLegalNoticeContent } from '@/lib/cms/defaultLegalNoticeContent'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import type { LegalNoticePageData } from '@/lib/cms/types'
import type { LegalNoticePage as LegalNoticePageDoc } from '@/payload-types'

export function mapLegalNoticePage(
  data: LegalNoticePageDoc | null | undefined,
): LegalNoticePageData {
  const content = data?.content

  return {
    content: hasLexicalContent(content) ? content! : defaultLegalNoticeContent,
  }
}
