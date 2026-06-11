import type { SiteAddressData, SiteSettingsData } from '@/lib/content/types'
import {
  ASSOCIATION_TOM_TOM,
  DANTE_AGOSTINI_METHOD,
  PACATOM,
  SEO_INTENSIVE_DEPARTMENT,
  SEO_INTENSIVE_VENUE,
  SEO_SERVICE_AREAS,
} from '@/lib/seo/constants'
import { schoolSummaryDescription } from '@/lib/seo/metadata'
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
      'Examens NGT',
      ASSOCIATION_TOM_TOM,
      PACATOM,
      'Trio de batterie',
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
  const associationText = schoolSummaryDescription(site)

  const mainSchoolId = `${origin}#ecole-aix`
  const intensiveId = `${origin}#stages-razes`
  const tomTomId = `${origin}#association-tom-tom`
  const pacatomId = `${origin}#pacatom`
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
      sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
      subOrganization: { '@id': tomTomId },
    },
  )

  const tomTomAssociation: JsonLdObject = {
    '@type': 'Organization',
    '@id': tomTomId,
    name: ASSOCIATION_TOM_TOM,
    description: `Promotion de la batterie, examens publics NGT et actions culturelles à ${city}. Liée à ${school}.`,
    url: absoluteUrl(routes.tomTom),
    parentOrganization: { '@id': mainSchoolId },
    areaServed: areaServedList(),
    knowsAbout: ['Batterie', 'Examens NGT', PACATOM, 'Trio de batterie'],
    inLanguage: 'fr-FR',
  }

  const pacatomTrio: JsonLdObject = {
    '@type': 'MusicGroup',
    '@id': pacatomId,
    name: PACATOM,
    genre: 'Batterie',
    description: `Trio de batterie lié à ${school} et à ${ASSOCIATION_TOM_TOM} à ${city}.`,
    url: absoluteUrl(routes.tomTom),
    memberOf: { '@id': tomTomId },
    areaServed: areaServedList(),
    inLanguage: 'fr-FR',
  }

  const intensiveCenter = musicSchoolNode(
    intensiveId,
    `${school} — stages intensifs de batterie (${intensiveCity})`,
    `Centre national de stages intensifs de batterie à ${intensiveCity} (${SEO_INTENSIVE_VENUE}, ${SEO_INTENSIVE_DEPARTMENT}). Destination de référence en France pour les stages de batterie, ${DANTE_AGOSTINI_METHOD}.`,
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
      { name: ASSOCIATION_TOM_TOM, url: absoluteUrl(routes.tomTom) },
    ].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'WebPage', name: item.name, url: item.url },
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [mainSchool, intensiveCenter, tomTomAssociation, pacatomTrio, website, navigation],
  }
}
