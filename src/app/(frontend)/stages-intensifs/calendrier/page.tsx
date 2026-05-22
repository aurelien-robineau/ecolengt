import type { Metadata } from 'next'

import { IntensiveCoursesRichText } from '@/components/intensive-courses/IntensiveCoursesRichText'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site, landing } = await getSiteContent()

  return {
    title: `Calendrier des stages intensifs — ${site.name} · ${landing.hero.location}`,
    description: `Calendrier des stages intensifs de batterie à ${landing.hero.location}.`,
  }
}

export default async function StagesIntensifsCalendarPage() {
  const { site, intensiveCoursesCalendar } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Calendrier des stages intensifs" />
        <IntensiveCoursesRichText content={intensiveCoursesCalendar.content} />
      </Container>
    </section>
  )
}
