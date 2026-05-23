import type { Metadata } from 'next'

import type { SiteSettingsData } from '@/lib/cms/types'
import {
  DANTE_AGOSTINI_FOUNDER,
  DANTE_AGOSTINI_NETWORK,
  SEO_DEFAULT_OG_IMAGE_PATH,
  SEO_KEYWORDS,
} from '@/lib/seo/constants'
import { seoCopy } from '@/lib/seo/copy'
import { absoluteUrl, getSiteOrigin } from '@/lib/seo/urls'
import { siteFaviconMetadata } from '@/lib/site/favicon'

type BuildPageMetadataInput = {
  site: SiteSettingsData
  pathname: string
  title: string
  description: string
  keywords?: readonly string[]
  noIndex?: boolean
  ogImagePath?: string
  ogType?: 'website' | 'article'
}

export function getMetadataBase(): URL {
  return new URL(getSiteOrigin())
}

export function buildSiteRootMetadata(site: SiteSettingsData): Metadata {
  const { title, description } = seoCopy.home(site)
  const school = site.name.trim() || 'École de Batterie NGT'

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: title,
      template: `%s · ${school}`,
    },
    description,
    keywords: [...SEO_KEYWORDS],
    authors: [{ name: DANTE_AGOSTINI_FOUNDER, url: 'https://www.danteagostini.com' }],
    creator: school,
    publisher: school,
    category: 'music education',
    ...siteFaviconMetadata,
    alternates: {
      canonical: absoluteUrl('/'),
      languages: { 'fr-FR': absoluteUrl('/') },
    },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: absoluteUrl('/'),
      siteName: school,
      title,
      description,
      images: [{ url: SEO_DEFAULT_OG_IMAGE_PATH, alt: `${school} — école de batterie` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SEO_DEFAULT_OG_IMAGE_PATH],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    other: {
      'geo.region': 'FR-PAC',
      'geo.placename': site.address.city.trim() || 'Aix-en-Provence',
      'geo.position': '43.5297;5.4474',
      ICBM: '43.5297, 5.4474',
    },
  }
}

export function buildPageMetadata({
  site,
  pathname,
  title,
  description,
  keywords,
  noIndex = false,
  ogImagePath = SEO_DEFAULT_OG_IMAGE_PATH,
  ogType = 'website',
}: BuildPageMetadataInput): Metadata {
  const school = site.name.trim() || 'École de Batterie NGT'
  const url = absoluteUrl(pathname)
  const pageKeywords = keywords ?? SEO_KEYWORDS

  return {
    title,
    description,
    keywords: [...pageKeywords],
    alternates: {
      canonical: url,
      languages: { 'fr-FR': url },
    },
    openGraph: {
      type: ogType,
      locale: 'fr_FR',
      url,
      siteName: school,
      title,
      description,
      images: [{ url: ogImagePath, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImagePath],
    },
    robots: noIndex ?
      { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      },
  }
}

export function buildHomeMetadata(site: SiteSettingsData): Metadata {
  const { title, description } = seoCopy.home(site)

  return buildPageMetadata({
    site,
    pathname: '/',
    title,
    description,
  })
}

export function buildArticleMetadata(
  site: SiteSettingsData,
  pathname: string,
  articleTitle: string,
  description: string,
): Metadata {
  return buildPageMetadata({
    site,
    pathname,
    title: `${articleTitle} — actualité batterie ${site.address.city.trim() || 'Aix-en-Provence'}`,
    description,
    ogType: 'article',
    keywords: [...SEO_KEYWORDS, articleTitle],
  })
}

export function buildStudentMetadata(
  site: SiteSettingsData,
  pathname: string,
  studentName: string,
  description: string,
): Metadata {
  return buildPageMetadata({
    site,
    pathname,
    title: `${studentName} — ancien élève ${site.name.trim() || 'École de Batterie NGT'}`,
    description,
    keywords: [...SEO_KEYWORDS, studentName],
  })
}

/** Visible in JSON-LD only — reinforces Dante Agostini association for crawlers and LLMs. */
export function networkAssociationDescription(site: SiteSettingsData): string {
  const school = site.name.trim() || 'École de Batterie NGT'
  const city = site.address.city.trim() || 'Aix-en-Provence'

  return `${school} est une école de batterie affiliée au ${DANTE_AGOSTINI_NETWORK}, fondé par ${DANTE_AGOSTINI_FOUNDER}, à ${city} et en région PACA. Les stages intensifs de batterie se déroulent au centre national de ${site.intensiveCoursesAddress.city.trim() || 'Razès'}.`
}
