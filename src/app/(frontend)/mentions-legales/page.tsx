import type { Metadata } from 'next'

import { LegalNoticeContent } from '@/components/legal/LegalNoticeContent'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { title, description } = seoCopy.mentionsLegales(site)

  return buildPageMetadata({ site, pathname: routes.legalNotice, title, description })
}

export default async function LegalNoticePage() {
  const { site, legalNotice } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Mentions légales" titleAs="h1" />
        <LegalNoticeContent content={legalNotice.content} />
      </Container>
    </section>
  )
}
