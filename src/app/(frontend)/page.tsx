import { HeroSection } from '@/components/landing/HeroSection'
import { LandingSection } from '@/components/landing/LandingSection'
import { QuoteBand } from '@/components/landing/QuoteBand'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export default async function HomePage() {
  const { landing } = await getSiteContent()

  return (
    <>
      <HeroSection hero={landing.hero} />
      <QuoteBand quote={landing.quote} />
      {landing.sections.map((section, index) => (
        <LandingSection key={`${section.id}-${index}`} section={section} />
      ))}
    </>
  )
}
