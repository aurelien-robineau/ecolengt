import type { Metadata } from 'next'

import { GuestbookLetter } from '@/components/guestbook/GuestbookLetter'
import { GuestbookTestimonials } from '@/components/guestbook/GuestbookTestimonials'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site, landing } = await getSiteContent()

  return {
    title: `Livre d’or — ${site.name} · ${landing.hero.location}`,
    description: `Témoignages et messages des élèves de ${site.name} à ${landing.hero.location}.`,
  }
}

export default async function GuestbookPage() {
  const { site, guestbook } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Livre d’or" />
        <GuestbookLetter letter={guestbook.letter} />
        <GuestbookTestimonials items={guestbook.testimonials} />
      </Container>
    </section>
  )
}
