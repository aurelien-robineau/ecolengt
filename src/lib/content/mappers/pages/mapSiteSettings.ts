import type { SiteSetting } from '@/payload-types'
import { defaultSiteSettings } from '../../defaults'
import { formatPhoneHref } from '@/lib/content/utils/formatPhoneHref'
import { mapGallery } from '../shared/mapGallery'
import { mapSiteAddress } from '../shared/mapSiteAddress'
import { mapRichText } from '../shared/mapRichText'
import type { SiteSettingsData } from '@/lib/content/types'

export function mapSiteSettings(data: SiteSetting | null | undefined): SiteSettingsData {
  if (!data) {
    return defaultSiteSettings
  }

  const phones =
    data.phones
      ?.filter((phone) => phone.number)
      .map((phone) => ({
        display: phone.number!,
        href: formatPhoneHref(phone.number!),
      })) ?? []

  const emails =
    data.emails
      ?.filter((entry) => entry.address)
      .map((entry) => ({
        display: entry.address!,
        href: `mailto:${entry.address}`,
      })) ?? []

  const foundedYear =
    typeof data.foundedYear === 'number' && Number.isInteger(data.foundedYear)
      ? data.foundedYear
      : null

  return {
    name: data.schoolNameShort ?? '',
    foundedYear,
    address: mapSiteAddress({
      street: data.addressStreet,
      streetLine2: data.addressStreetLine2,
      postalCode: data.addressPostalCode,
      city: data.addressCity,
      mapsUrl: data.addressMapsUrl,
      mapLatitude: data.addressMapLatitude,
      mapLongitude: data.addressMapLongitude,
    }),
    addressAccess: {
      directions: mapRichText(data.addressAccessDirectionsContent),
      gallery: mapGallery(data.addressAccessGallery),
    },
    intensiveCoursesAddress: mapSiteAddress({
      street: data.intensiveCoursesAddressStreet,
      streetLine2: data.intensiveCoursesAddressStreetLine2,
      postalCode: data.intensiveCoursesAddressPostalCode,
      city: data.intensiveCoursesAddressCity,
      mapsUrl: data.intensiveCoursesAddressMapsUrl,
      mapLatitude: data.intensiveCoursesAddressMapLatitude,
      mapLongitude: data.intensiveCoursesAddressMapLongitude,
    }),
    intensiveCoursesAccess: {
      directions: mapRichText(data.intensiveCoursesAccessDirectionsContent),
      gallery: mapGallery(data.intensiveCoursesAccessGallery),
    },
    contact: {
      phones,
      emails,
    },
    social: {
      instagram: data.instagramUrl ?? '',
      facebook: data.facebookUrl ?? '',
    },
    navigation: defaultSiteSettings.navigation,
  }
}
