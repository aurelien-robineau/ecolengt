import type { NewsPage as NewsPageDoc } from '@/payload-types'
import { defaultNewsPage } from '../../defaults'
import { mapRichText } from '../shared/mapRichText'
import type { NewsPageData } from '@/lib/content/types'

export function mapNewsPage(data: NewsPageDoc | null | undefined): NewsPageData {
  if (!data) {
    return defaultNewsPage
  }

  return {
    upcomingEventsAlert: mapRichText(data.upcomingEventsAlert),
  }
}
