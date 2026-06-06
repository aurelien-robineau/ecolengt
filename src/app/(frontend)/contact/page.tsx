import type { Metadata } from 'next'

import { CmsRichText } from '@/components/cms/CmsRichText'
import { ContactAccess } from '@/components/contact/ContactAccess'
import { ContactLocation } from '@/components/contact/ContactLocation'
import { SocialLinks } from '@/components/social/SocialLinks'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { getContactPage, getSiteSettings } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings()
  const { documentTitle, title, description } = seoCopy.contact(site)

  return buildPageMetadata({
    site,
    pathname: routes.contact,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
}

export default async function ContactPage() {
  const [site, contact] = await Promise.all([getSiteSettings(), getContactPage()])

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Nous contacter" titleAs="h1" />
        <div className="max-w-xl">
          <CmsRichText data={contact.intro} />
        </div>

        <SocialLinks site={site} className="mt-12 mb-16" />

        <ContactLocation site={site} />

        <ContactAccess
          directions={site.addressAccess.directions}
          items={site.addressAccess.gallery}
        />
      </Container>
    </section>
  )
}
