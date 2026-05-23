import type { Metadata } from 'next'

import { IntensiveCoursesCalendarSchoolYears } from '@/components/intensive-courses/IntensiveCoursesCalendarSchoolYears'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()

  return {
    title: `Calendrier des stages intensifs — ${site.name} · ${site.address.city}`,
    description: `Calendrier des stages intensifs de batterie à ${site.address.city}.`,
  }
}

export default async function StagesIntensifsCalendarPage() {
  const { site, intensiveCoursesCalendar } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Calendrier des stages intensifs" />
        <IntensiveCoursesCalendarSchoolYears
          schoolYears={intensiveCoursesCalendar.schoolYears}
        />
      </Container>
    </section>
  )
}
