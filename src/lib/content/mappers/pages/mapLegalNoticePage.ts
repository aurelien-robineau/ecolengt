import type { LegalNoticePage as LegalNoticePageDoc } from '@/payload-types'
import { defaultLegalNoticePage } from '../../defaults'
import type { LegalNoticePageData } from '@/lib/content/types'
import { mapRichText } from '../shared/mapRichText'

export function mapLegalNoticePage(
  data: LegalNoticePageDoc | null | undefined,
): LegalNoticePageData {
  if (!data) {
    return defaultLegalNoticePage
  }

  return {
    content: mapRichText(data?.content),
    lastUpdatedAt: data?.lastUpdatedAt ?? null,
  }
}
