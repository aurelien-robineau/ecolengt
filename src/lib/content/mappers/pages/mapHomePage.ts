import type { HomePage as HomePageDoc } from '@/payload-types'
import { defaultLandingPage } from '../../defaults'
import { mapGallery } from '../shared/mapGallery'
import { mapMedia } from '../shared/mapMedia'
import { mapRichText } from '../shared/mapRichText'
import type { LandingPageData, LandingSection, LandingSectionItem } from '@/lib/content/types'

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
      buttonLabel && buttonHref
        ? {
            label: buttonLabel,
            href: buttonHref,
          }
        : null,
  }
}

function mapHeroOverlayOpacity(value: unknown): number {
  const opacity = typeof value === 'number' ? value : Number(value)

  if (!Number.isFinite(opacity)) {
    return defaultLandingPage.hero.overlayOpacity
  }

  return Math.min(100, Math.max(0, Math.round(opacity)))
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
      backgroundImage: mapMedia(data.heroBackgroundImage, ''),
      overlayOpacity: mapHeroOverlayOpacity(data.heroOverlayOpacity),
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
