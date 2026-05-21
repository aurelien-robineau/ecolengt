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
    { label: 'Livre d’or', href: routes.guestbook },
    { label: 'Anciens élèves', href: routes.alumni },
    { label: 'Tom Tom', href: routes.tomTom },
  ],
}

export const defaultGuestbookPage: GuestbookPageData = {
  letter: {
    title: '',
    content: null,
    signature: '',
  },
  testimonials: [],
}

export const defaultAlumniPage: AlumniPageData = {
  intro: null,
  students: [],
}

export const defaultContactPage: ContactPageData = {
  intro: null,
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
    ctaHref: '/#audience',
  },
  quote: {
    text: '',
    cite: '',
    imageAlt: '',
    portrait: null,
  },
  audience: {
    id: 'audience',
    label: '',
    title: '',
    content: null,
  },
  pedagogy: {
    id: 'pedagogy',
    label: '',
    title: '',
    content: null,
    features: {
      courseOrganization: {
        title: '',
        content: null,
      },
      practice: {
        title: '',
        body: null,
      },
    },
    intensiveCourses: {
      title: '',
      content: null,
      learnMore: {
        label: '',
        href: '/contact',
      },
    },
  },
  facilities: {
    id: 'facilities',
    label: '',
    title: '',
    description: null,
    gallery: [],
  },
}
