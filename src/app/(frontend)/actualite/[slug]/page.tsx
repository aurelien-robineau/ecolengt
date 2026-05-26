import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleDetail } from '@/components/articles/ArticleDetail'
import { articlePageHref } from '@/lib/content'
import { getArticleBySlug, getArticleSlugs } from '@/lib/content'
import { getSiteContent } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/seo/metadata'

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const [article, { site }] = await Promise.all([getArticleBySlug(slug), getSiteContent()])

  if (!article) {
    return { title: 'Page introuvable' }
  }

  const pathname = articlePageHref(slug) ?? `/actualite/${slug}`

  return buildArticleMetadata(
    site,
    pathname,
    article.title,
    article.shortDescription ??
      `Actualité de ${site.name}, école de batterie à ${site.address.city}.`,
  )
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <section className="bg-surface">
      <ArticleDetail article={article} />
    </section>
  )
}
