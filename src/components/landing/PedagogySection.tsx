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

          <div className="mb-20 max-w-3xl space-y-2">
            <p className="text-sm leading-[1.95] text-foreground-muted">{pedagogy.lead}</p>
            {pedagogy.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-sm leading-[1.95] text-foreground-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mb-16 grid gap-px bg-border lg:grid-cols-2">
            <article className="bg-surface-card p-8">
              <h3 className="mb-4 font-serif text-xl font-normal text-foreground">
                {courseOrganization.title}
              </h3>
              <ul className="mb-4 space-y-2 text-sm leading-[1.85] text-foreground-muted">
                {courseOrganization.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-[1.85] text-foreground-muted">
                {courseOrganization.footer}
              </p>
            </article>

            <article className="bg-surface-card p-8">
              <h3 className="mb-4 font-serif text-xl font-normal text-foreground">
                {practice.title}
              </h3>
              <p className="text-sm leading-[1.85] text-foreground-muted">{practice.body}</p>
            </article>
          </div>

          <div className="border border-brand-border bg-brand-dim p-8 md:p-12">
            <h3 className="mb-4 font-serif text-[1.375rem] font-normal text-foreground">
              {pedagogy.intensiveCourses.title}
            </h3>
            <div className="space-y-2 text-sm leading-[1.85] text-foreground-muted">
              {pedagogy.intensiveCourses.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href={pedagogy.intensiveCourses.learnMore.href}>
                {pedagogy.intensiveCourses.learnMore.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
