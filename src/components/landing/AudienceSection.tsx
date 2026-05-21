import { CmsRichText } from '@/components/cms/CmsRichText'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { LandingPageData } from '@/lib/cms/types'

type AudienceSectionProps = {
  audience: LandingPageData['audience']
}

export function AudienceSection({ audience }: AudienceSectionProps) {
  return (
    <section id={audience.id} className="py-(--spacing-section-mobile) md:py-(--spacing-section)">
      <Container>
        <Reveal>
          <SectionHeader label={audience.label} title={audience.title} />
          <CmsRichText data={audience.content} />
        </Reveal>
      </Container>
    </section>
  )
}
