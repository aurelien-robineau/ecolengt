import type { CmsRichTextContent } from '@/lib/content/richtext/types'

export type { CmsRichTextContent }

export type SiteAddressData = {
  street: string
  streetLine2: string
  postalCode: string
  city: string
  mapsUrl: string
  mapLatitude: number | null
  mapLongitude: number | null
}

export type SiteMainAccessData = {
  directions: CmsRichTextContent | null
  gallery: GalleryItem[]
}

export type SiteSettingsData = {
  name: string
  foundedYear: number | null
  address: SiteAddressData
  addressAccess: SiteMainAccessData
  intensiveCoursesAddress: SiteAddressData
  intensiveCoursesAccess: SiteMainAccessData
  contact: {
    phones: Array<{ href: string; display: string; label: string | null }>
    emails: Array<{ href: string; display: string; label: string | null }>
  }
  social: {
    instagram: string
    facebook: string
  }
  navigation: Array<{ label: string; href: string; shortLabel?: string }>
}

export type ContactPageData = {
  intro: CmsRichTextContent | null
}

export type GuestbookTestimonial = {
  content: CmsRichTextContent
  author: string
  pageHref: string | null
}

export type GuestbookPageData = {
  introduction: CmsRichTextContent | null
  testimonials: GuestbookTestimonial[]
}

export type AlumniStudent = {
  name: string
  projects: string | null
  pageHref: string | null
}

export type StudentProfileData = {
  slug: string
  name: string
  quote: string | null
  photos: Array<NonNullable<CmsImageData>>
  jobTitle: string | null
  description: CmsRichTextContent | null
  pageHref: string
}

export type AlumniPageData = {
  intro: CmsRichTextContent | null
  students: AlumniStudent[]
}

export type TomTomPageData = {
  callout: {
    label: string
    href: string
  } | null
  content: CmsRichTextContent | null
}

export type IntensiveCoursesBlock = {
  title: string
  content: CmsRichTextContent | null
}

export type IntensiveCoursesCalendarSchoolYear = {
  title: string
  content: CmsRichTextContent | null
}

export type IntensiveCoursesCalendarPageData = {
  intro: CmsRichTextContent | null
  schoolYears: IntensiveCoursesCalendarSchoolYear[]
}

export type PricingPageData = {
  classes: CmsRichTextContent | null
  intensiveCourses: CmsRichTextContent | null
}

export type IntensiveCoursesPageData = {
  intro: CmsRichTextContent | null
  gallery: GalleryItem[]
  blocks: IntensiveCoursesBlock[]
}

export type LegalNoticePageData = {
  content: CmsRichTextContent | null
  lastUpdatedAt: string | null
}

export type NewsPageData = {
  upcomingEventsAlert: CmsRichTextContent | null
}

export type ArticleListItem = {
  slug: string
  title: string
  shortDescription: string
  image: CmsImageData
  pageHref: string
}

export type ArticleDetailData = ArticleListItem & {
  content: CmsRichTextContent | null
}

export type CmsImageData = {
  src: string
  alt: string
  width?: number
  height?: number
} | null

export type GalleryItem = {
  image: NonNullable<CmsImageData>
}

export type LandingSectionItem = {
  title: string
  description: CmsRichTextContent | null
}

type LandingSectionHighlight = {
  title: string
  description: CmsRichTextContent | null
  button: {
    label: string
    href: string
  } | null
}

export type LandingSection = {
  id: string
  surtitle: string
  title: string
  description: CmsRichTextContent | null
  items: LandingSectionItem[]
  highlight: LandingSectionHighlight | null
  gallery: GalleryItem[]
}

export type LandingPageData = {
  hero: {
    tagline: string
    name: string
    subtitle: string
    cta: string
    ctaHref: string
    backgroundImage: CmsImageData
    overlayOpacity: number
  }
  quote: {
    text: string
    cite: string
    imageAlt: string
    portrait: CmsImageData
  }
  sections: LandingSection[]
}
