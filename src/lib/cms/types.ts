export type SiteSettingsData = {
  name: string
  subtitle: string
  tagline: string
  location: string
  founded: string
  address: {
    street: string
    city: string
  }
  contact: {
    phones: Array<{ label: string; href: string; display: string }>
    emails: Array<{ href: string; display: string }>
  }
  social: {
    instagram: string
    facebook: string
  }
  navigation: Array<{ label: string; href: string }>
}

export type CmsImageData = {
  src: string
  alt: string
  width?: number
  height?: number
} | null

export type LandingPageData = {
  hero: {
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
    paragraphs: string[]
  }
  pedagogy: {
    id: string
    label: string
    title: string
    lead: string
    body: string[]
    features: {
      courseOrganization: {
        title: string
        items: string[]
        footer: string
      }
      practice: {
        title: string
        body: string
      }
    }
    intensiveCourses: {
      title: string
      paragraphs: string[]
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
    description: string[]
    gallery: Array<{
      caption: string
      wide: boolean
      image: CmsImageData
    }>
  }
}

export type SiteContent = {
  site: SiteSettingsData
  landing: LandingPageData
}
