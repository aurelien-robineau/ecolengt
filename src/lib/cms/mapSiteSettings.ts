import type { SiteSetting } from '@/payload-types'
import { defaultSiteSettings } from '@/lib/cms/defaults'
import { formatPhoneHref } from '@/lib/cms/formatPhoneHref'
import { mapGallery } from '@/lib/cms/mapGallery'
import { mapSiteAddress } from '@/lib/cms/mapSiteAddress'
import { mapRichText } from '@/lib/cms/mapRichText'
import type { SiteSettingsData } from '@/lib/cms/types'

type SiteSettingLegacy = SiteSetting & {
  mapsUrl?: string | null
  workshopsAddressStreet?: string | null
  workshopsAddressStreetLine2?: string | null
  workshopsAddressPostalCode?: string | null
  workshopsAddressCity?: string | null
  workshopsAddressMapsUrl?: string | null
  workshopsAddressMapsEmbed?: string | null
  workshopsAccessDirectionsContent?: SiteSetting['intensiveCoursesAccessDirectionsContent']
  workshopsAccessGallery?: SiteSetting['intensiveCoursesAccessGallery']
}

export function mapSiteSettings(data: SiteSetting | null | undefined): SiteSettingsData {
  if (!data) {
    return defaultSiteSettings
  }

  const legacy = data as SiteSettingLegacy

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
    typeof data.foundedYear === 'number' && Number.isInteger(data.foundedYear) ?
      data.foundedYear
    : null

  return {
    name: data.schoolNameShort ?? '',
    foundedYear,
    address: mapSiteAddress({
      street: data.addressStreet,
      streetLine2: data.addressStreetLine2,
      postalCode: data.addressPostalCode,
      city: data.addressCity,
      mapsUrl: data.addressMapsUrl ?? legacy.mapsUrl,
      mapsEmbed: data.addressMapsEmbed,
    }),
    addressAccess: {
      directions: mapRichText(data.addressAccessDirectionsContent),
      gallery: mapGallery(data.addressAccessGallery),
    },
    intensiveCoursesAddress: mapSiteAddress({
      street: data.intensiveCoursesAddressStreet ?? legacy.workshopsAddressStreet,
      streetLine2:
        data.intensiveCoursesAddressStreetLine2 ?? legacy.workshopsAddressStreetLine2,
      postalCode:
        data.intensiveCoursesAddressPostalCode ?? legacy.workshopsAddressPostalCode,
      city: data.intensiveCoursesAddressCity ?? legacy.workshopsAddressCity,
      mapsUrl: data.intensiveCoursesAddressMapsUrl ?? legacy.workshopsAddressMapsUrl,
      mapsEmbed: data.intensiveCoursesAddressMapsEmbed ?? legacy.workshopsAddressMapsEmbed,
    }),
    intensiveCoursesAccess: {
      directions: mapRichText(
        data.intensiveCoursesAccessDirectionsContent ?? legacy.workshopsAccessDirectionsContent,
      ),
      gallery: mapGallery(
        data.intensiveCoursesAccessGallery ?? legacy.workshopsAccessGallery,
      ),
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
