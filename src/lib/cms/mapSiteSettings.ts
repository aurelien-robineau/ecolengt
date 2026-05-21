import type { SiteSetting } from '@/payload-types'
import { defaultSiteSettings } from '@/lib/cms/defaults'
import { formatPhoneHref } from '@/lib/cms/formatPhoneHref'
import type { SiteSettingsData } from '@/lib/cms/types'

export function mapSiteSettings(data: SiteSetting | null | undefined): SiteSettingsData {
  if (!data) {
    return defaultSiteSettings
  }

  const phones =
    data.phones?.length ?
      data.phones.map((phone) => ({
        label: phone.label || 'Téléphone',
        display: phone.number,
        href: formatPhoneHref(phone.number),
      }))
    : defaultSiteSettings.contact.phones

  const emails =
    data.emails?.length ?
      data.emails
        .filter((entry) => entry.address)
        .map((entry) => ({
          display: entry.address!,
          href: `mailto:${entry.address}`,
        }))
    : defaultSiteSettings.contact.emails

  return {
    name: data.schoolName || defaultSiteSettings.name,
    subtitle: data.subtitle || defaultSiteSettings.subtitle,
    tagline: data.tagline || defaultSiteSettings.tagline,
    location: data.location || defaultSiteSettings.location,
    founded: data.founded || defaultSiteSettings.founded,
    address: {
      street: data.addressStreet || defaultSiteSettings.address.street,
      city: data.addressCity || defaultSiteSettings.address.city,
    },
    contact: {
      phones,
      emails,
    },
    social: {
      instagram: data.instagramUrl || defaultSiteSettings.social.instagram,
      facebook: data.facebookUrl || defaultSiteSettings.social.facebook,
    },
    navigation: defaultSiteSettings.navigation,
  }
}
