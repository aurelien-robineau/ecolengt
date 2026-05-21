import { CmsRichText } from '@/components/cms/CmsRichText'
import { Container } from '@/components/ui/Container'
import { PhotoGallery } from '@/components/ui/PhotoGallery'
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

          <PhotoGallery items={facilities.gallery} />
        </Reveal>
      </Container>
    </section>
  )
}
