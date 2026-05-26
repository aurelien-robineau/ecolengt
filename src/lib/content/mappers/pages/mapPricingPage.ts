import type { PricingPage as PricingPageDoc } from '@/payload-types'
import { mapRichText } from '../shared/mapRichText'
import type { PricingPageData } from '@/lib/content/types'

const emptyPricingPage: PricingPageData = {
  classes: null,
  intensiveCourses: null,
}

export function mapPricingPage(data: PricingPageDoc | null | undefined): PricingPageData {
  if (!data) {
    return emptyPricingPage
  }

  return {
    classes: mapRichText(data.classesContent),
    intensiveCourses: mapRichText(data.intensiveCoursesContent),
  }
}
