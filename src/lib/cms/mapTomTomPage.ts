import { mapRichText } from '@/lib/cms/mapRichText'
import type { TomTomPageData } from '@/lib/cms/types'
import type { TomTomPage as TomTomPageDoc } from '@/payload-types'

export function mapTomTomPage(data: TomTomPageDoc | null | undefined): TomTomPageData {
  return {
    content: mapRichText(data?.content),
  }
}
