import type { SiteSetting } from '@/payload-types'
import { defaultSiteSettings } from '@/lib/cms/defaults'
import { formatPhoneHref } from '@/lib/cms/formatPhoneHref'
import type { SiteSettingsData } from '@/lib/cms/types'

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

  return {
    name: data.schoolNameShort ?? '',
    address: {
      street: data.addressStreet ?? '',
      city: data.addressCity ?? '',
      mapsUrl: data.mapsUrl?.trim() ?? '',
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
