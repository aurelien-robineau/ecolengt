import type { Metadata } from 'next'

import { CmsRichText } from '@/components/cms/CmsRichText'
import { ContactAccessGallery } from '@/components/contact/ContactAccessGallery'
import { ContactDetails } from '@/components/contact/ContactDetails'
import { ContactLocation } from '@/components/contact/ContactLocation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()

  return {
    title: `Contact — ${site.name} · ${site.address.city}`,
    description: `Contactez ${site.name} à ${site.address.city}. Téléphone, e-mail et adresse.`,
  }
}

export default async function ContactPage() {
  const { site, contact } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Nous contacter" />
        <div className="mb-12 max-w-xl">
          <CmsRichText data={contact.intro} />
        </div>
        <ContactLocation site={site} />
        <ContactAccessGallery
          directions={site.addressAccess.directions}
          items={site.addressAccess.gallery}
        />
        <ContactDetails site={site} />
      </Container>
    </section>
  )
}
