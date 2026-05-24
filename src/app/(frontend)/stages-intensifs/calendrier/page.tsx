import type { Metadata } from 'next'

import { CmsRichText } from '@/components/cms/CmsRichText'
import { IntensiveCoursesCalendarSchoolYears } from '@/components/intensive-courses/IntensiveCoursesCalendarSchoolYears'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { hasLexicalContent } from '@/lib/cms/hasLexicalContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { title, description } = seoCopy.stagesCalendrier(site)

  return buildPageMetadata({
    site,
    pathname: routes.stagesIntensifsCalendar,
    title,
    description,
  })
}

export default async function StagesIntensifsCalendarPage() {
  const { site, intensiveCoursesCalendar } = await getSiteContent()
  const hasIntro =
    intensiveCoursesCalendar.intro && hasLexicalContent(intensiveCoursesCalendar.intro)

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Calendrier des stages intensifs" titleAs="h1" />
        {hasIntro ?
          <div className="mb-12 max-w-xl">
            <CmsRichText data={intensiveCoursesCalendar.intro} />
          </div>
        : null}
        <IntensiveCoursesCalendarSchoolYears
          schoolYears={intensiveCoursesCalendar.schoolYears}
        />
      </Container>
    </section>
  )
}
