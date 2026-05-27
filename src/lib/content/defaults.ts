import { routes } from '@/config/routes'
import type {
  AlumniPageData,
  ContactPageData,
  GuestbookPageData,
  IntensiveCoursesCalendarPageData,
  IntensiveCoursesPageData,
  LandingPageData,
  LegalNoticePageData,
  NewsPageData,
  PricingPageData,
  SiteSettingsData,
  TomTomPageData,
} from './types'

const emptySiteAddress = {
  street: '',
  streetLine2: '',
  postalCode: '',
  city: '',
  mapsUrl: '',
  mapLatitude: null,
  mapLongitude: null,
}

export const defaultSiteSettings: SiteSettingsData = {
  name: '',
  foundedYear: null,
  address: { ...emptySiteAddress },
  addressAccess: {
    directions: null,
    gallery: [],
  },
  intensiveCoursesAddress: { ...emptySiteAddress },
  intensiveCoursesAccess: {
    directions: null,
    gallery: [],
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
    { label: 'Accueil', href: routes.home },
    { label: 'Actualité', href: routes.news },
    { label: 'Stages intensifs', href: routes.stagesIntensifs },
    { label: 'Livre d’or', href: routes.guestbook },
    { label: 'Anciens élèves', href: routes.alumni },
    { label: 'Association Tom Tom', shortLabel: 'Asso. Tom Tom', href: routes.tomTom },
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
}

export const defaultLandingPage: LandingPageData = {
  hero: {
    tagline: '',
    name: '',
    subtitle: '',
    cta: '',
    ctaHref: '',
    backgroundImage: null,
    overlayOpacity: 92,
  },
  quote: {
    text: '',
    cite: '',
    imageAlt: '',
    portrait: null,
  },
  sections: [],
}

export const defaultNewsPage: NewsPageData = {
  upcomingEventsAlert: null,
}

export const defaultPricingPage: PricingPageData = {
  classes: null,
  intensiveCourses: null,
}

export const defaultIntensiveCoursesPage: IntensiveCoursesPageData = {
  intro: null,
  gallery: [],
  blocks: [],
}

export const defaultIntensiveCoursesCalendarPage: IntensiveCoursesCalendarPageData = {
  intro: null,
  schoolYears: [],
}

export const defaultLegalNoticePage: LegalNoticePageData = {
  content: null,
  lastUpdatedAt: null,
}

export const defaultTomTomPage: TomTomPageData = {
  callout: null,
  content: null,
}
