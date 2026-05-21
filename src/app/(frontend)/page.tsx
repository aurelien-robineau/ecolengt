import { AudienceSection } from '@/components/landing/AudienceSection'
import { FacilitiesSection } from '@/components/landing/FacilitiesSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { PedagogySection } from '@/components/landing/PedagogySection'
import { QuoteBand } from '@/components/landing/QuoteBand'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuoteBand />
      <AudienceSection />
      <PedagogySection />
      <FacilitiesSection />
    </>
  )
}
