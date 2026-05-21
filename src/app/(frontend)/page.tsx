import { AudienceSection } from '@/components/landing/AudienceSection'
import { FacilitiesSection } from '@/components/landing/FacilitiesSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { PedagogySection } from '@/components/landing/PedagogySection'
import { QuoteBand } from '@/components/landing/QuoteBand'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export default async function HomePage() {
  const { landing } = await getSiteContent()

  return (
    <>
      <HeroSection hero={landing.hero} />
      <QuoteBand quote={landing.quote} />
      <AudienceSection audience={landing.audience} />
      <PedagogySection pedagogy={landing.pedagogy} />
      <FacilitiesSection facilities={landing.facilities} />
    </>
  )
}
