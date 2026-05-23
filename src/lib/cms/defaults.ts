import { routes } from '@/config/routes'
import type {
  AlumniPageData,
  ContactPageData,
  GuestbookPageData,
  LandingPageData,
  SiteSettingsData,
} from '@/lib/cms/types'

export const defaultMapsEmbedSrc = ''

export const defaultSiteSettings: SiteSettingsData = {
  name: '',
  address: {
    street: '',
    city: '',
    mapsUrl: '',
  },
  contact: {
    phones: [],
    emails: [],
  },
  social: {
    instagram: '',
    facebook: '',
  },
  navigation: [
    { label: 'Actualité', href: routes.news },
    { label: 'Stages intensifs', href: routes.stagesIntensifs },
    { label: 'Livre d’or', href: routes.guestbook },
    { label: 'Anciens élèves', href: routes.alumni },
    { label: 'Tom Tom', href: routes.tomTom },
    { label: 'Tarifs', href: routes.pricing },
  ],
}

export const defaultGuestbookPage: GuestbookPageData = {
  introduction: null,
  testimonials: [],
}

export const defaultAlumniPage: AlumniPageData = {
  intro: null,
  students: [],
}

export const defaultContactPage: ContactPageData = {
  intro: null,
  accessDirections: null,
  accessGallery: [],
  mapsEmbedSrc: defaultMapsEmbedSrc,
}

export const defaultLandingPage: LandingPageData = {
  hero: {
    tagline: '',
    name: '',
    subtitle: '',
    location: '',
    founded: '',
    cta: '',
    ctaHref: '',
  },
  quote: {
    text: '',
    cite: '',
    imageAlt: '',
    portrait: null,
  },
  sections: [],
}

