import type { HomePage as HomePageDoc } from '@/payload-types'
import { defaultLandingPage } from '@/lib/cms/defaults'
import { mapGallery } from '@/lib/cms/mapGallery'
import { mapMedia } from '@/lib/cms/mapMedia'
import type { LandingPageData } from '@/lib/cms/types'

function mapTextArray(
  items: Array<{ text?: string | null; id?: string | null }> | null | undefined,
  fallback: string[],
): string[] {
  const mapped = items?.map((item) => item.text).filter((text): text is string => Boolean(text))

  return mapped?.length ? mapped : fallback
}

export function mapHomePage(data: HomePageDoc | null | undefined): LandingPageData {
  if (!data) {
    return defaultLandingPage
  }

  const gallery = mapGallery(
    data.facilitiesGallery,
    defaultLandingPage.facilities.gallery,
  )

  return {
    hero: {
      cta: data.heroCta || defaultLandingPage.hero.cta,
      ctaHref: defaultLandingPage.hero.ctaHref,
    },
    quote: {
      text: data.quoteText || defaultLandingPage.quote.text,
      cite: data.quoteCite || defaultLandingPage.quote.cite,
      imageAlt: data.quoteCite || defaultLandingPage.quote.imageAlt,
      portrait: mapMedia(data.quotePortrait, data.quoteCite || defaultLandingPage.quote.imageAlt),
    },
    audience: {
      id: defaultLandingPage.audience.id,
      label: data.audienceLabel || defaultLandingPage.audience.label,
      title: data.audienceTitle || defaultLandingPage.audience.title,
      paragraphs: mapTextArray(data.audienceParagraphs, defaultLandingPage.audience.paragraphs),
    },
    pedagogy: {
      id: defaultLandingPage.pedagogy.id,
      label: data.pedagogyLabel || defaultLandingPage.pedagogy.label,
      title: data.pedagogyTitle || defaultLandingPage.pedagogy.title,
      lead: data.pedagogyLead || defaultLandingPage.pedagogy.lead,
      body: mapTextArray(data.pedagogyBody, defaultLandingPage.pedagogy.body),
      features: {
        courseOrganization: {
          title:
            data.courseOrganizationTitle ||
            defaultLandingPage.pedagogy.features.courseOrganization.title,
          items: mapTextArray(
            data.courseOrganizationItems,
            defaultLandingPage.pedagogy.features.courseOrganization.items,
          ),
          footer:
            data.courseOrganizationFooter ||
            defaultLandingPage.pedagogy.features.courseOrganization.footer,
        },
        practice: {
          title: data.practiceTitle || defaultLandingPage.pedagogy.features.practice.title,
          body: data.practiceBody || defaultLandingPage.pedagogy.features.practice.body,
        },
      },
      intensiveCourses: {
        title: data.intensiveCoursesTitle || defaultLandingPage.pedagogy.intensiveCourses.title,
        paragraphs: mapTextArray(
          data.intensiveCoursesParagraphs,
          defaultLandingPage.pedagogy.intensiveCourses.paragraphs,
        ),
        learnMore: {
          label:
            data.intensiveCoursesButtonLabel ||
            defaultLandingPage.pedagogy.intensiveCourses.learnMore.label,
          href: defaultLandingPage.pedagogy.intensiveCourses.learnMore.href,
        },
      },
    },
    facilities: {
      id: defaultLandingPage.facilities.id,
      label: data.facilitiesLabel || defaultLandingPage.facilities.label,
      title: data.facilitiesTitle || defaultLandingPage.facilities.title,
      description: mapTextArray(
        data.facilitiesDescription,
        defaultLandingPage.facilities.description,
      ),
      gallery,
    },
  }
}
