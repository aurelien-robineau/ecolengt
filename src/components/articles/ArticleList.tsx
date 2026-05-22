import { ArticleCard } from '@/components/articles/ArticleCard'
import type { ArticleListItem } from '@/lib/cms/types'

type ArticleListProps = {
  articles: ArticleListItem[]
}

export function ArticleList({ articles }: ArticleListProps) {
  if (!articles.length) {
    return (
      <p className="max-w-2xl text-base leading-[1.9] text-foreground-muted md:text-sm">
        Aucun article pour le moment.
      </p>
    )
  }

  return (
    <ul className="grid list-none gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  )
}
