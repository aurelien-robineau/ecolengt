import { CmsRichText } from '@/components/cms/CmsRichText'
import { Container } from '@/components/ui/Container'
import { Gallery } from '@/components/ui/Gallery'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { LandingPageData } from '@/lib/cms/types'

type FacilitiesSectionProps = {
  facilities: LandingPageData['facilities']
}

export function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  return (
    <section
      id={facilities.id}
      className="py-(--spacing-section-mobile) md:py-(--spacing-section)"
    >
      <Container>
        <Reveal>
          <SectionHeader label={facilities.label} title={facilities.title} />

          <div className="mb-12 max-w-xl">
            <CmsRichText data={facilities.description} />
          </div>

          <Gallery items={facilities.gallery} columns={3} />
        </Reveal>
      </Container>
    </section>
  )
}
