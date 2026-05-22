import type { NewsPage as NewsPageDoc } from '@/payload-types'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { NewsPageData } from '@/lib/cms/types'

const emptyNewsPage: NewsPageData = {
  upcomingEventsAlert: null,
}

export function mapNewsPage(data: NewsPageDoc | null | undefined): NewsPageData {
  if (!data) {
    return emptyNewsPage
  }

  return {
    upcomingEventsAlert: mapRichText(data.upcomingEventsAlert),
  }
}
