import type { PricingPage as PricingPageDoc } from '@/payload-types'
import { defaultPricingPage } from '../../defaults'
import { mapRichText } from '../shared/mapRichText'
import type { PricingPageData } from '@/lib/content/types'

export function mapPricingPage(data: PricingPageDoc | null | undefined): PricingPageData {
  if (!data) {
    return defaultPricingPage
  }

  return {
    classes: mapRichText(data.classesContent),
    intensiveCourses: mapRichText(data.intensiveCoursesContent),
  }
}
