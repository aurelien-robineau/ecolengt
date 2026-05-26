import { CmsRichText } from '@/components/cms/CmsRichText'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Gallery } from '@/components/ui/Gallery'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/cn'
import type { LandingSection as LandingSectionData } from '@/lib/content/types'

type LandingSectionProps = {
  section: LandingSectionData
}

export function LandingSection({ section }: LandingSectionProps) {
  const { items, highlight, gallery, description } = section
  const hasItems = items.length > 0
  const hasHighlight = highlight !== null
  const hasGallery = gallery.length > 0
  const isEmphasized = hasItems || hasHighlight

  return (
    <section
      id={section.id}
      className={cn(
        'py-(--spacing-section-mobile) md:py-(--spacing-section)',
        isEmphasized && 'border-y border-border bg-surface-muted',
      )}
    >
      <Container>
        <Reveal>
          <SectionHeader label={section.surtitle} title={section.title} />

          {description ? (
            <div
              className={cn(
                hasItems || hasHighlight ? 'mb-20 max-w-3xl' : hasGallery && 'mb-12 max-w-xl',
              )}
            >
              <CmsRichText data={description} />
            </div>
          ) : null}

          {hasItems ? (
            <div className="mb-16 grid gap-px bg-border lg:grid-cols-2">
              {items.map((item, index) => (
                <article key={`${item.title}-${index}`} className="bg-surface-card p-8">
                  <h3 className="mb-4 font-serif text-xl font-normal text-foreground">
                    {item.title}
                  </h3>
                  <CmsRichText data={item.description} />
                </article>
              ))}
            </div>
          ) : null}

          {hasHighlight ? (
            <div
              className={cn(
                'border border-brand-border bg-brand-dim p-8 md:p-12',
                hasGallery && 'mb-12',
              )}
            >
              <h3 className="mb-4 font-serif text-[1.375rem] font-normal text-foreground">
                {highlight.title}
              </h3>
              <CmsRichText data={highlight.description} />
              {highlight.button ? (
                <div className="mt-8">
                  <Button href={highlight.button.href}>{highlight.button.label}</Button>
                </div>
              ) : null}
            </div>
          ) : null}

          {hasGallery ? <Gallery items={gallery} columns={3} /> : null}
        </Reveal>
      </Container>
    </section>
  )
}
