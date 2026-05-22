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
  content: CmsRichTextContent | null
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
  wide: boolean
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
  legalNotice: LegalNoticePageData
}
