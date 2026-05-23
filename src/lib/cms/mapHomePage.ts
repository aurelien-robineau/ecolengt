import type { HomePage as HomePageDoc } from '@/payload-types'
import { defaultLandingPage } from '@/lib/cms/defaults'
import { mapGallery } from '@/lib/cms/mapGallery'
import { mapMedia } from '@/lib/cms/mapMedia'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { LandingPageData, LandingSection, LandingSectionItem } from '@/lib/cms/types'

type HomePageSectionDoc = NonNullable<HomePageDoc['sections']>[number]

type HomePageSectionItemDoc = NonNullable<HomePageSectionDoc['items']>[number]

function mapSectionItem(item: HomePageSectionItemDoc): LandingSectionItem {
  return {
    title: item.title ?? '',
    description: mapRichText(item.description),
  }
}

function mapSectionHighlight(
  highlight: HomePageSectionDoc['highlight'],
): LandingSection['highlight'] {
  const title = highlight?.title?.trim()
  if (!title) {
    return null
  }

  const buttonLabel = highlight?.buttonLabel?.trim()
  const buttonHref = highlight?.buttonHref?.trim()

  return {
    title,
    description: mapRichText(highlight?.description),
    button:
      buttonLabel && buttonHref ?
        {
          label: buttonLabel,
          href: buttonHref,
        }
      : null,
  }
}

function mapSection(section: HomePageSectionDoc, index: number): LandingSection {
  return {
    id: `section-${index + 1}`,
    surtitle: section.surtitle ?? '',
    title: section.title ?? '',
    description: mapRichText(section.description),
    items: (section.items ?? []).map(mapSectionItem),
    highlight: mapSectionHighlight(section.highlight),
    gallery: mapGallery(section.gallery),
  }
}

export function mapHomePage(data: HomePageDoc | null | undefined): LandingPageData {
  if (!data) {
    return defaultLandingPage
  }

  return {
    hero: {
      tagline: data.heroTagline ?? '',
      name: data.heroName ?? '',
      subtitle: data.heroSubtitle ?? '',
      cta: data.heroCta ?? '',
      ctaHref: data.heroCtaHref?.trim() ?? '',
    },
    quote: {
      text: data.quoteText ?? '',
      cite: data.quoteCite ?? '',
      imageAlt: data.quoteCite ?? '',
      portrait: mapMedia(data.quotePortrait, data.quoteCite ?? ''),
    },
    sections: (data.sections ?? []).map(mapSection),
  }
}
