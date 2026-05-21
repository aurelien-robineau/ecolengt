import type { Metadata } from 'next'

import { TomTomContent } from '@/components/tom-tom/TomTomContent'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site, landing } = await getSiteContent()

  return {
    title: `Tom Tom — ${site.name} · ${landing.hero.location}`,
    description:
      'Association Tom Tom : promotion de la batterie, examens publics NGT et actions culturelles à Aix-en-Provence.',
  }
}

export default async function TomTomPage() {
  const { site, tomTom } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Tom Tom" />
        <TomTomContent content={tomTom.content} />
      </Container>
    </section>
  )
}
