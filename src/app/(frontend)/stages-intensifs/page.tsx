import type { Metadata } from 'next'

import { CmsRichText } from '@/components/cms/CmsRichText'
import { IntensiveCoursesAccess } from '@/components/intensive-courses/IntensiveCoursesAccess'
import { IntensiveCoursesPageActions } from '@/components/intensive-courses/IntensiveCoursesPageActions'
import { IntensiveCoursesBlocks } from '@/components/intensive-courses/IntensiveCoursesBlocks'
import { Gallery } from '@/components/ui/Gallery'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { hasLexicalContent } from '@/lib/content'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { documentTitle, title, description } = seoCopy.stagesIntensifs(site)

  return buildPageMetadata({
    site,
    pathname: routes.stagesIntensifs,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
}

export default async function StagesIntensifsPage() {
  const { site, intensiveCourses } = await getSiteContent()
  const hasIntro = intensiveCourses.intro && hasLexicalContent(intensiveCourses.intro)
  const hasGallery = intensiveCourses.gallery.length > 0

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Stages intensifs" titleAs="h1" />
        <IntensiveCoursesPageActions />

        {hasIntro ? (
          <div className="mb-12 max-w-xl">
            <CmsRichText data={intensiveCourses.intro} />
          </div>
        ) : null}

        <IntensiveCoursesBlocks blocks={intensiveCourses.blocks} />

        {hasGallery ? (
          <div className={intensiveCourses.blocks.length ? 'mt-20' : undefined}>
            <Gallery items={intensiveCourses.gallery} columns={3} priorityFirstImage />
          </div>
        ) : null}
        <IntensiveCoursesAccess
          siteName={site.name}
          address={site.intensiveCoursesAddress}
          access={site.intensiveCoursesAccess}
        />
      </Container>
    </section>
  )
}
