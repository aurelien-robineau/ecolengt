import type { Metadata } from 'next'

import { LegalNoticeContent } from '@/components/legal/LegalNoticeContent'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()

  return {
    title: `Mentions légales — ${site.name}`,
    description: `Mentions légales du site ${site.name}.`,
  }
}

export default async function LegalNoticePage() {
  const { site, legalNotice } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Mentions légales" />
        <LegalNoticeContent content={legalNotice.content} />
      </Container>
    </section>
  )
}
