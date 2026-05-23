import type { Metadata } from 'next'

import { PricingPageContent } from '@/components/pricing/PricingPageContent'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()

  return {
    title: `Tarifs — ${site.name} · ${site.address.city}`,
    description: `Tarifs des cours et des stages intensifs à ${site.address.city}.`,
  }
}

export default async function PricingPage() {
  const { site, pricing } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Tarifs" titleAs="h1" />
        <PricingPageContent pricing={pricing} />
      </Container>
    </section>
  )
}
