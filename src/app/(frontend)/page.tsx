import { HeroSection } from '@/components/landing/HeroSection'
import { LandingSection } from '@/components/landing/LandingSection'
import { QuoteBand } from '@/components/landing/QuoteBand'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildHomeMetadata } from '@/lib/seo/metadata'

export async function generateMetadata() {
  const { site } = await getSiteContent()

  return buildHomeMetadata(site)
}

export default async function HomePage() {
  const { site, landing } = await getSiteContent()

  return (
    <>
      <HeroSection
        hero={landing.hero}
        city={site.address.city}
        foundedYear={site.foundedYear}
      />
      <QuoteBand quote={landing.quote} />
      {landing.sections.map((section, index) => (
        <LandingSection key={`${section.id}-${index}`} section={section} />
      ))}
    </>
  )
}
