import type { Metadata } from 'next'

import { PricingPageContent } from '@/components/pricing/PricingPageContent'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { documentTitle, title, description } = seoCopy.tarifs(site)

  return buildPageMetadata({
    site,
    pathname: routes.pricing,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
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
