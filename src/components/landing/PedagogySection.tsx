import { CmsRichText } from '@/components/cms/CmsRichText'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { LandingPageData } from '@/lib/cms/types'

type PedagogySectionProps = {
  pedagogy: LandingPageData['pedagogy']
}

export function PedagogySection({ pedagogy }: PedagogySectionProps) {
  const { courseOrganization, practice } = pedagogy.features

  return (
    <section
      id={pedagogy.id}
      className="border-y border-border bg-surface-muted py-(--spacing-section-mobile) md:py-(--spacing-section)"
    >
      <Container>
        <Reveal>
          <SectionHeader label={pedagogy.label} title={pedagogy.title} />

          <div className="mb-20 max-w-3xl">
            <CmsRichText data={pedagogy.content} />
          </div>

          <div className="mb-16 grid gap-px bg-border lg:grid-cols-2">
            <article className="bg-surface-card p-8">
              <h3 className="mb-4 font-serif text-xl font-normal text-foreground">
                {courseOrganization.title}
              </h3>
              <CmsRichText data={courseOrganization.content} />
            </article>

            <article className="bg-surface-card p-8">
              <h3 className="mb-4 font-serif text-xl font-normal text-foreground">
                {practice.title}
              </h3>
              <CmsRichText data={practice.body} />
            </article>
          </div>

          <div className="border border-brand-border bg-brand-dim p-8 md:p-12">
            <h3 className="mb-4 font-serif text-[1.375rem] font-normal text-foreground">
              {pedagogy.intensiveCourses.title}
            </h3>
            <CmsRichText data={pedagogy.intensiveCourses.content} />
            {pedagogy.intensiveCourses.learnMore.label && (
              <div className="mt-8">
                <Button href={pedagogy.intensiveCourses.learnMore.href}>
                  {pedagogy.intensiveCourses.learnMore.label}
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
