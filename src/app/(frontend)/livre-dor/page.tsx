import type { Metadata } from 'next'

import { GuestbookIntroduction } from '@/components/guestbook/GuestbookIntroduction'
import { GuestbookTestimonials } from '@/components/guestbook/GuestbookTestimonials'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()

  return {
    title: `Livre d’or — ${site.name} · ${site.address.city}`,
    description: `Témoignages et messages des élèves de ${site.name} à ${site.address.city}.`,
  }
}

export default async function GuestbookPage() {
  const { site, guestbook } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Livre d’or" />
        <GuestbookIntroduction introduction={guestbook.introduction} />
        <GuestbookTestimonials items={guestbook.testimonials} />
      </Container>
    </section>
  )
}
