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
  const { documentTitle, title, description } = seoCopy.mentionsLegales(site)

  return buildPageMetadata({
    site,
    pathname: routes.legalNotice,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
}

function formatLegalNoticeLastUpdated(isoDate: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate))
}

export default async function LegalNoticePage() {
  const { site, legalNotice } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <div className="mb-12">
          <SectionHeader
            label={site.name}
            title="Mentions Légales & Politique de Confidentialité"
            titleAs="h1"
            className="mb-3"
          />
          {legalNotice.lastUpdatedAt ? (
            <p className="text-sm text-foreground-muted">
              Dernière mise à jour le {formatLegalNoticeLastUpdated(legalNotice.lastUpdatedAt)}
            </p>
          ) : null}
        </div>
        <LegalNoticeContent content={legalNotice.content} />
      </Container>
    </section>
  )
}
