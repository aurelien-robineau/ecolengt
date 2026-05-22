import type { Metadata } from 'next'

import { PricingPageContent } from '@/components/pricing/PricingPageContent'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site, landing } = await getSiteContent()

  return {
    title: `Tarifs — ${site.name} · ${landing.hero.location}`,
    description: `Tarifs des cours et des stages intensifs à ${landing.hero.location}.`,
  }
}

export default async function PricingPage() {
  const { site, pricing } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Tarifs" />
        <PricingPageContent pricing={pricing} />
      </Container>
    </section>
  )
}
