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

          <div className="max-w-3xl space-y-6">
            {audience.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-sm leading-[1.95] text-foreground-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
