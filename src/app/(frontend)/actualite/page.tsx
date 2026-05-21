import type { Metadata } from 'next'

import { ArticleList } from '@/components/articles/ArticleList'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getArticles } from '@/lib/cms/getArticles'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site, landing } = await getSiteContent()

  return {
    title: `Actualité — ${site.name} · ${landing.hero.location}`,
    description: `Actualités et nouvelles de ${site.name} à ${landing.hero.location}.`,
  }
}

export default async function NewsPage() {
  const [{ site }, articles] = await Promise.all([getSiteContent(), getArticles()])

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <SectionHeader label={site.name} title="Actualité" />
        <ArticleList articles={articles} />
      </Container>
    </section>
  )
}
