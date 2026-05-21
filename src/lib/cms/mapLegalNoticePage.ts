import { mapRichText } from '@/lib/cms/mapRichText'
import type { LegalNoticePageData } from '@/lib/cms/types'
import type { LegalNoticePage as LegalNoticePageDoc } from '@/payload-types'

export function mapLegalNoticePage(
  data: LegalNoticePageDoc | null | undefined,
): LegalNoticePageData {
  return {
    content: mapRichText(data?.content),
  }
}
