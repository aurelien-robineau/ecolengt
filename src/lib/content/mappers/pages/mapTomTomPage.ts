import { mapRichText } from '../shared/mapRichText'
import type { TomTomPageData } from '@/lib/content/types'
import type { TomTomPage as TomTomPageDoc } from '@/payload-types'

function mapCallout(data: TomTomPageDoc | null | undefined): TomTomPageData['callout'] {
  const label = data?.callout?.label?.trim()
  const href = data?.callout?.href?.trim()

  if (!label || !href) {
    return null
  }

  return { label, href }
}

export function mapTomTomPage(data: TomTomPageDoc | null | undefined): TomTomPageData {
  return {
    callout: mapCallout(data),
    content: mapRichText(data?.content),
  }
}
