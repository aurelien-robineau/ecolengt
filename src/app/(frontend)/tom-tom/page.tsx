import type { Metadata } from 'next'

import { TomTomContent } from '@/components/tom-tom/TomTomContent'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { documentTitle, title, description } = seoCopy.tomTom(site)

  return buildPageMetadata({
    site,
    pathname: routes.tomTom,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
}

export default async function TomTomPage() {
  const { site, tomTom } = await getSiteContent()

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Tom Tom" titleAs="h1" />
        {tomTom.callout ? (
          <div className="mb-12">
            <Button href={tomTom.callout.href}>{tomTom.callout.label}</Button>
          </div>
        ) : null}
        <TomTomContent content={tomTom.content} />
      </Container>
    </section>
  )
}
