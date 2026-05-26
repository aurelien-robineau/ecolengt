import { mapRichText } from '../shared/mapRichText'
import type { LegalNoticePageData } from '@/lib/content/types'
import type { LegalNoticePage as LegalNoticePageDoc } from '@/payload-types'

export function mapLegalNoticePage(
  data: LegalNoticePageDoc | null | undefined,
): LegalNoticePageData {
  return {
    content: mapRichText(data?.content),
    lastUpdatedAt: data?.lastUpdatedAt ?? null,
  }
}
