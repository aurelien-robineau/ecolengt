import { CmsRichText } from '@/components/cms/CmsRichText'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Gallery } from '@/components/ui/Gallery'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/cn'
import {
  cardTitleClassName,
  stackBlockClassName,
  stackSectionClassName,
  stackTitleClassName,
} from '@/lib/ui/typography'
import type { LandingSection as LandingSectionData } from '@/lib/content/types'

type LandingSectionProps = {
  section: LandingSectionData
  /** Alternates subtle background on plain sections for visual rhythm. */
  alternate?: boolean
}

export function LandingSection({ section, alternate = false }: LandingSectionProps) {
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
        isEmphasized
          ? 'border-y border-border bg-surface-muted'
          : alternate && 'bg-surface-muted/50',
      )}
    >
      <Container>
        <Reveal>
          <SectionHeader label={section.surtitle} title={section.title} />

          {description ? (
            <div
              className={cn(
                hasItems || hasHighlight
                  ? stackBlockClassName
                  : hasGallery && stackSectionClassName,
              )}
            >
              <CmsRichText data={description} />
            </div>
          ) : null}

          {hasItems ? (
            <div
              className={cn(
                'bleed-x-sm grid gap-px bg-border lg:grid-cols-2 lg:gap-4 lg:bg-transparent',
                stackBlockClassName,
              )}
            >
              {items.map((item, index) => (
                <article key={`${item.title}-${index}`} className="card-surface card-pad">
                  <h3 className={cn(cardTitleClassName, stackTitleClassName)}>{item.title}</h3>
                  <CmsRichText data={item.description} />
                </article>
              ))}
            </div>
          ) : null}

          {hasHighlight ? (
            <div
              className={cn(
                'callout-surface bleed-x-sm bg-brand-dim card-pad-lg',
                hasGallery && stackSectionClassName,
              )}
            >
              <h3 className={cn(cardTitleClassName, stackTitleClassName)}>{highlight.title}</h3>
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
