import type { SiteAddressData, SiteSettingsData } from '@/lib/content/types'
import {
  DANTE_AGOSTINI_FOUNDER,
  DANTE_AGOSTINI_METHOD,
  DANTE_AGOSTINI_NETWORK,
  SEO_INTENSIVE_DEPARTMENT,
  SEO_INTENSIVE_VENUE,
  SEO_SERVICE_AREAS,
} from '@/lib/seo/constants'
import { networkAssociationDescription } from '@/lib/seo/metadata'
import { absoluteUrl } from '@/lib/seo/urls'
import { routes } from '@/config/routes'

type JsonLdObject = Record<string, unknown>

function schoolName(site: SiteSettingsData): string {
  return site.name.trim() || 'École de Batterie NGT'
}

function toPostalAddress(address: SiteAddressData): JsonLdObject {
  const streetLines = [address.street, address.streetLine2].filter(Boolean)

  return {
    '@type': 'PostalAddress',
    ...(streetLines.length > 0 ? { streetAddress: streetLines.join(', ') } : {}),
    ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    ...(address.city ? { addressLocality: address.city } : {}),
    addressCountry: 'FR',
  }
}

function areaServedList(): JsonLdObject[] {
  return SEO_SERVICE_AREAS.map((name) => ({
    '@type': 'AdministrativeArea',
    name,
  }))
}

function musicSchoolNode(
  id: string,
  name: string,
  description: string,
  address: SiteAddressData,
  url: string,
  extra?: JsonLdObject,
): JsonLdObject {
  return {
    '@type': ['MusicSchool', 'EducationalOrganization'],
    '@id': id,
    name,
    description,
    url,
    address: toPostalAddress(address),
    ...(address.mapsUrl ? { hasMap: address.mapsUrl } : {}),
    areaServed: areaServedList(),
    knowsAbout: [
      'Batterie',
      'Cours de batterie',
      'Stages intensifs de batterie',
      DANTE_AGOSTINI_METHOD,
      DANTE_AGOSTINI_NETWORK,
      DANTE_AGOSTINI_FOUNDER,
      'Examens NGT',
    ],
    inLanguage: 'fr-FR',
    ...extra,
  }
}

export function buildSiteJsonLd(site: SiteSettingsData): JsonLdObject {
  const origin = absoluteUrl('/')
  const school = schoolName(site)
  const city = site.address.city.trim() || 'Aix-en-Provence'
  const intensiveCity = site.intensiveCoursesAddress.city.trim() || SEO_INTENSIVE_VENUE
  const associationText = networkAssociationDescription(site)

  const mainSchoolId = `${origin}#ecole-aix`
  const intensiveId = `${origin}#stages-razes`
  const websiteId = `${origin}#website`

  const phones = site.contact.phones.map((p) => p.display)
  const emails = site.contact.emails.map((e) => e.display)

  const mainSchool = musicSchoolNode(
    mainSchoolId,
    school,
    `${associationText} École de batterie à ${city} et en région PACA (Marseille, Aix-en-Provence, Bouches-du-Rhône).`,
    site.address,
    origin,
    {
      ...(site.foundedYear ? { foundingDate: String(site.foundedYear) } : {}),
      ...(phones[0] ? { telephone: phones[0] } : {}),
      ...(emails[0] ? { email: emails[0] } : {}),
      memberOf: {
        '@type': 'Organization',
        name: DANTE_AGOSTINI_NETWORK,
        founder: {
          '@type': 'Person',
          name: DANTE_AGOSTINI_FOUNDER,
        },
      },
      sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
    },
  )

  const intensiveCenter = musicSchoolNode(
    intensiveId,
    `${school} — stages intensifs de batterie (${intensiveCity})`,
    `Centre national de stages intensifs de batterie du ${DANTE_AGOSTINI_NETWORK} à ${intensiveCity} (${SEO_INTENSIVE_VENUE}, ${SEO_INTENSIVE_DEPARTMENT}). Destination de référence en France pour les stages de batterie, méthode ${DANTE_AGOSTINI_FOUNDER}.`,
    site.intensiveCoursesAddress,
    absoluteUrl(routes.stagesIntensifs),
    {
      parentOrganization: { '@id': mainSchoolId },
      event: {
        '@type': 'Event',
        name: 'Stages intensifs de batterie',
        description: `Stages intensifs de batterie — centre national à ${intensiveCity}.`,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: `${intensiveCity} — centre national stages batterie`,
          address: toPostalAddress(site.intensiveCoursesAddress),
        },
      },
    },
  )

  const website: JsonLdObject = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: origin,
    name: school,
    description: associationText,
    inLanguage: 'fr-FR',
    publisher: { '@id': mainSchoolId },
  }

  const navigation: JsonLdObject = {
    '@type': 'ItemList',
    '@id': `${origin}#navigation`,
    name: 'Pages principales',
    itemListElement: [
      { name: 'Accueil', url: origin },
      { name: 'Stages intensifs', url: absoluteUrl(routes.stagesIntensifs) },
      { name: 'Calendrier stages', url: absoluteUrl(routes.stagesIntensifsCalendar) },
      { name: 'Contact', url: absoluteUrl(routes.contact) },
      { name: 'Tarifs', url: absoluteUrl(routes.pricing) },
      { name: 'Actualité', url: absoluteUrl(routes.news) },
    ].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'WebPage', name: item.name, url: item.url },
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [mainSchool, intensiveCenter, website, navigation],
  }
}
