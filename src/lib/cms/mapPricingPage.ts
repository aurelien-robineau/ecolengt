import type { PricingPage as PricingPageDoc } from '@/payload-types'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { PricingPageData } from '@/lib/cms/types'

type PricingPageLegacy = PricingPageDoc & {
  workshopsContent?: PricingPageDoc['intensiveCoursesContent']
}

const emptyPricingPage: PricingPageData = {
  classes: null,
  intensiveCourses: null,
}

export function mapPricingPage(data: PricingPageDoc | null | undefined): PricingPageData {
  if (!data) {
    return emptyPricingPage
  }

  const legacy = data as PricingPageLegacy

  return {
    classes: mapRichText(data.classesContent),
    intensiveCourses: mapRichText(data.intensiveCoursesContent ?? legacy.workshopsContent),
  }
}
