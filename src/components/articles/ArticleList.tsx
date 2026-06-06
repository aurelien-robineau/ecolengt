import { ArticleCard } from '@/components/articles/ArticleCard'
import type { ArticleListItem } from '@/lib/content/types'

type ArticleListProps = {
  articles: ArticleListItem[]
}

export function ArticleList({ articles }: ArticleListProps) {
  if (!articles.length) {
    return (
      <p className="type-body max-w-2xl text-foreground-muted">Aucun article pour le moment.</p>
    )
  }

  return (
    <ul className="grid list-none gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  )
}
