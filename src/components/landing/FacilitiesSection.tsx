import { landingContent } from '@/content/landing'
import { Container } from '@/components/ui/Container'
import { ImagePlaceholder } from '@/components/landing/ImagePlaceholder'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function FacilitiesSection() {
  const { facilities } = landingContent

  return (
    <section
      id={facilities.id}
      className="py-(--spacing-section-mobile) md:py-(--spacing-section)"
    >
      <Container>
        <Reveal>
          <SectionHeader label={facilities.label} title={facilities.title} />

          <p className="mb-14 max-w-xl text-sm leading-[1.9] text-foreground-muted">
            {facilities.description}
          </p>

          <div className="grid grid-cols-2 gap-0.5 bg-border sm:grid-cols-4">
            {facilities.gallery.map((item, index) => (
              <ImagePlaceholder
                key={item.caption}
                caption={item.caption}
                wide={item.wide}
                tone={(index % 4) as 0 | 1 | 2 | 3}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
