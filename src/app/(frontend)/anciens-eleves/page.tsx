import type { Metadata } from 'next'

import { AlumniIntro } from '@/components/alumni/AlumniIntro'
import { AlumniStudents } from '@/components/alumni/AlumniStudents'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site, landing } = await getSiteContent()

  return {
    title: `Anciens élèves — ${site.name} · ${landing.hero.location}`,
    description: `Découvrez les parcours et projets des anciens élèves de ${site.name} à ${landing.hero.location}.`,
  }
}

export default async function AlumniPage() {
  const { site, alumni } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Anciens élèves" />
        <AlumniIntro content={alumni.intro} />
        <AlumniStudents students={alumni.students} />
      </Container>
    </section>
  )
}
