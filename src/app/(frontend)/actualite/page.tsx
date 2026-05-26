import type { Metadata } from 'next'

import { ArticleList } from '@/components/articles/ArticleList'
import { NewsUpcomingAlert } from '@/components/articles/NewsUpcomingAlert'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getArticles } from '@/lib/content'
import { routes } from '@/config/routes'
import { getSiteContent } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { documentTitle, title, description } = seoCopy.actualite(site)

  return buildPageMetadata({
    site,
    pathname: routes.news,
    pageTitle: documentTitle,
    seoTitle: title,
    description,
  })
}

export default async function NewsPage() {
  const [{ site, news }, articles] = await Promise.all([getSiteContent(), getArticles()])

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Actualité" titleAs="h1" />
        <NewsUpcomingAlert alert={news.upcomingEventsAlert} />
        <ArticleList articles={articles} />
      </Container>
    </section>
  )
}
