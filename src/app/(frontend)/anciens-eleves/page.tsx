import type { Metadata } from 'next'

import { AlumniIntro } from '@/components/alumni/AlumniIntro'
import { AlumniStudents } from '@/components/alumni/AlumniStudents'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { documentTitle, title, description } = seoCopy.anciensEleves(site)

  return buildPageMetadata({
    site,
    pathname: routes.alumni,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
}

export default async function AlumniPage() {
  const { site, alumni } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Anciens élèves" titleAs="h1" />
        <AlumniIntro content={alumni.intro} />
        <AlumniStudents students={alumni.students} />
      </Container>
    </section>
  )
}
