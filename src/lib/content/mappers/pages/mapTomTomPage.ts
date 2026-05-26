import type { TomTomPage as TomTomPageDoc } from '@/payload-types'
import { defaultTomTomPage } from '../../defaults'
import type { TomTomPageData } from '@/lib/content/types'
import { mapRichText } from '../shared/mapRichText'

function mapCallout(data: TomTomPageDoc | null | undefined): TomTomPageData['callout'] {
  const label = data?.callout?.label?.trim()
  const href = data?.callout?.href?.trim()

  if (!label || !href) {
    return null
  }

  return { label, href }
}

export function mapTomTomPage(data: TomTomPageDoc | null | undefined): TomTomPageData {
  if (!data) {
    return defaultTomTomPage
  }

  return {
    callout: mapCallout(data),
    content: mapRichText(data?.content),
  }
}
