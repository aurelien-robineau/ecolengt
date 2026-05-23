import type { Metadata } from 'next'

import { GuestbookIntroduction } from '@/components/guestbook/GuestbookIntroduction'
import { GuestbookTestimonials } from '@/components/guestbook/GuestbookTestimonials'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { title, description } = seoCopy.livreDor(site)

  return buildPageMetadata({ site, pathname: routes.guestbook, title, description })
}

export default async function GuestbookPage() {
  const { site, guestbook } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Livre d’or" titleAs="h1" />
        <GuestbookIntroduction introduction={guestbook.introduction} />
        <GuestbookTestimonials items={guestbook.testimonials} />
      </Container>
    </section>
  )
}
