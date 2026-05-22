import type { Article, Eleve, LegalNoticePage, TomTomPage } from '@/payload-types'

import type { CmsRichTextContent } from '@/lib/cms/richText'

export type { CmsRichTextContent }

export type SiteSettingsData = {
  name: string
  address: {
    street: string
    city: string
    mapsUrl: string
  }
  contact: {
    phones: Array<{ href: string; display: string }>
    emails: Array<{ href: string; display: string }>
  }
  social: {
    instagram: string
    facebook: string
  }
  navigation: Array<{ label: string; href: string }>
}

export type ContactPageData = {
  intro: CmsRichTextContent | null
  accessDirections: CmsRichTextContent | null
  accessGallery: GalleryItem[]
  mapsEmbedSrc: string
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
  projects: string[]
  pageHref: string | null
}

export type StudentProfileData = {
  slug: string
  name: string
  quote: string | null
  photos: Array<NonNullable<CmsImageData>>
  jobTitle: string | null
  description: NonNullable<Eleve['description']> | null
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

export type PageAddressData = {
  street: string
  city: string
  mapsUrl: string
}

export type IntensiveCoursesAccessData = {
  address: PageAddressData
  mapsEmbedSrc: string
  directions: CmsRichTextContent | null
  gallery: GalleryItem[]
}

export type IntensiveCoursesPageData = {
  intro: CmsRichTextContent | null
  gallery: GalleryItem[]
  blocks: IntensiveCoursesBlock[]
  access: IntensiveCoursesAccessData
}

export type LegalNoticePageData = {
  content: CmsRichTextContent | null
}

export type ArticleListItem = {
  slug: string
  title: string
  shortDescription: string
  image: CmsImageData
  pageHref: string
}

export type ArticleDetailData = ArticleListItem & {
  content: NonNullable<Article['content']>
}

export type CmsImageData = {
  src: string
  alt: string
  width?: number
  height?: number
} | null

export type GalleryItem = {
  caption: string
  image: CmsImageData
}

export type LandingPageData = {
  hero: {
    tagline: string
    name: string
    subtitle: string
    location: string
    founded: string
    cta: string
    ctaHref: string
  }
  quote: {
    text: string
    cite: string
    imageAlt: string
    portrait: CmsImageData
  }
  audience: {
    id: string
    label: string
    title: string
    content: CmsRichTextContent | null
  }
  pedagogy: {
    id: string
    label: string
    title: string
    content: CmsRichTextContent | null
    features: {
      courseOrganization: {
        title: string
        content: CmsRichTextContent | null
      }
      practice: {
        title: string
        body: CmsRichTextContent | null
      }
    }
    intensiveCourses: {
      title: string
      content: CmsRichTextContent | null
      learnMore: {
        label: string
        href: string
      }
    }
  }
  facilities: {
    id: string
    label: string
    title: string
    description: CmsRichTextContent | null
    gallery: GalleryItem[]
  }
}

export type SiteContent = {
  site: SiteSettingsData
  landing: LandingPageData
  contact: ContactPageData
  guestbook: GuestbookPageData
  alumni: AlumniPageData
  tomTom: TomTomPageData
  intensiveCourses: IntensiveCoursesPageData
  legalNotice: LegalNoticePageData
}
