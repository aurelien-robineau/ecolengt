import type { ContactPage as ContactPageDoc } from '@/payload-types'
import { defaultContactPage } from '../../defaults'
import { mapRichText } from '../shared/mapRichText'
import type { ContactPageData } from '@/lib/content/types'

export function mapContactPage(data: ContactPageDoc | null | undefined): ContactPageData {
  if (!data) {
    return defaultContactPage
  }

  return {
    intro: mapRichText(data.introContent),
  }
}
