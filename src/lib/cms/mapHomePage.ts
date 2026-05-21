import type { HomePage as HomePageDoc } from '@/payload-types'
import { defaultLandingPage } from '@/lib/cms/defaults'
import { mapGallery } from '@/lib/cms/mapGallery'
import { mapMedia } from '@/lib/cms/mapMedia'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { LandingPageData } from '@/lib/cms/types'

function mapTextItems(
  items: Array<{ text?: string | null; id?: string | null }> | null | undefined,
): string[] {
  return items?.map((item) => item.text).filter((text): text is string => Boolean(text)) ?? []
}

export function mapHomePage(data: HomePageDoc | null | undefined): LandingPageData {
  if (!data) {
    return defaultLandingPage
  }

  const gallery = mapGallery(data.facilitiesGallery)

  return {
    hero: {
      tagline: data.heroTagline ?? '',
      name: data.heroName ?? '',
      subtitle: data.heroSubtitle ?? '',
      location: data.heroLocation ?? '',
      founded: data.heroFounded ?? '',
      cta: data.heroCta ?? '',
      ctaHref: defaultLandingPage.hero.ctaHref,
    },
    quote: {
      text: data.quoteText ?? '',
      cite: data.quoteCite ?? '',
      imageAlt: data.quoteCite ?? '',
      portrait: mapMedia(data.quotePortrait, data.quoteCite ?? ''),
    },
    audience: {
      id: defaultLandingPage.audience.id,
      label: data.audienceLabel ?? '',
      title: data.audienceTitle ?? '',
      content: mapRichText(data.audienceContent),
    },
    pedagogy: {
      id: defaultLandingPage.pedagogy.id,
      label: data.pedagogyLabel ?? '',
      title: data.pedagogyTitle ?? '',
      content: mapRichText(data.pedagogyContent),
      features: {
        courseOrganization: {
          title: data.courseOrganizationTitle ?? '',
          items: mapTextItems(data.courseOrganizationItems),
          footer: mapRichText(data.courseOrganizationFooter),
        },
        practice: {
          title: data.practiceTitle ?? '',
          body: mapRichText(data.practiceBody),
        },
      },
      intensiveCourses: {
        title: data.intensiveCoursesTitle ?? '',
        content: mapRichText(data.intensiveCoursesContent),
        learnMore: {
          label: data.intensiveCoursesButtonLabel ?? '',
          href: defaultLandingPage.pedagogy.intensiveCourses.learnMore.href,
        },
      },
    },
    facilities: {
      id: defaultLandingPage.facilities.id,
      label: data.facilitiesLabel ?? '',
      title: data.facilitiesTitle ?? '',
      description: mapRichText(data.facilitiesDescription),
      gallery,
    },
  }
}
