import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleDetail } from '@/components/articles/ArticleDetail'
import { Container } from '@/components/ui/Container'
import { getArticleBySlug, getArticleSlugs } from '@/lib/cms/getArticleBySlug'
import { getSiteContent } from '@/lib/cms/getSiteContent'

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const [article, { site, landing }] = await Promise.all([
    getArticleBySlug(slug),
    getSiteContent(),
  ])

  if (!article) {
    return { title: site.name }
  }

  return {
    title: `${article.title} — ${site.name} · ${landing.hero.location}`,
    description: article.shortDescription,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <ArticleDetail article={article} />
      </Container>
    </section>
  )
}
