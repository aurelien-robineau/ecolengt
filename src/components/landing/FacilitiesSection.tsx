import { CmsImage } from '@/components/cms/CmsImage'
import { Container } from '@/components/ui/Container'
import { ImagePlaceholder } from '@/components/landing/ImagePlaceholder'
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

          <div className="mb-14 max-w-xl space-y-4">
            {facilities.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-sm leading-[1.9] text-foreground-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-0.5 bg-border sm:grid-cols-4">
            {facilities.gallery.map((item, index) => (
              <figure
                key={`${item.caption}-${index}`}
                className={
                  item.wide ?
                    'group relative col-span-2 aspect-2/1 overflow-hidden bg-surface-elevated'
                  : 'group relative aspect-square overflow-hidden bg-surface-elevated'
                }
              >
                {item.image ?
                  <CmsImage
                    image={item.image}
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes={item.wide ? '50vw' : '25vw'}
                  />
                : <ImagePlaceholder
                    caption={item.caption}
                    wide={item.wide}
                    tone={(index % 4) as 0 | 1 | 2 | 3}
                    className="h-full max-w-none"
                  />
                }
                {item.caption && item.image ?
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 bg-linear-to-t from-surface/95 to-transparent px-6 py-6 text-xs tracking-[0.08em] text-foreground-muted opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </figcaption>
                : null}
              </figure>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
