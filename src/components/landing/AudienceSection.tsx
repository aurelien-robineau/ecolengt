import { landingContent } from '@/content/landing'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function AudienceSection() {
  const { audience } = landingContent

  return (
    <section id={audience.id} className="py-(--spacing-section-mobile) md:py-(--spacing-section)">
      <Container>
        <Reveal>
          <SectionHeader label={audience.label} title={audience.title} />

          <div className="max-w-3xl space-y-6 text-sm leading-[1.95] text-foreground-muted">
            {audience.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
