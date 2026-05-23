import type { ContactPage as ContactPageDoc } from '@/payload-types'
import { defaultContactPage } from '@/lib/cms/defaults'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { ContactPageData } from '@/lib/cms/types'

export function mapContactPage(data: ContactPageDoc | null | undefined): ContactPageData {
  if (!data) {
    return defaultContactPage
  }

  return {
    intro: mapRichText(data.introContent),
  }
}
