import Link from 'next/link'

import { CmsImage } from '@/components/cms/CmsImage'
import { cn } from '@/lib/cn'
import type { ArticleListItem } from '@/lib/content/types'
import { cardTitleClassName } from '@/lib/ui/typography'

type ArticleCardProps = {
  article: ArticleListItem
}

export function ArticleCard({ article }: ArticleCardProps) {
  const articleLabel = `Article : ${article.title}`

  return (
    <article className="h-full">
      <Link
        href={article.pageHref}
        className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface-card no-underline"
        aria-label={articleLabel}
      >
        {article.image ? (
          <div className="media-ratio-feature relative overflow-hidden bg-foreground/5">
            <CmsImage
              image={article.image}
              fill
              className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              decorative
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <h2
            className={cn(
              cardTitleClassName,
              'mb-3 text-foreground-muted transition-colors duration-150 group-hover:text-foreground',
            )}
          >
            {article.title}
          </h2>

          <p className="type-body mb-6 flex-1 text-foreground-muted">{article.shortDescription}</p>

          <span className="text-sm font-semibold tracking-[var(--tracking-wide)] text-foreground-muted uppercase transition-colors duration-150 group-hover:text-foreground">
            Lire la suite
          </span>
        </div>
      </Link>
    </article>
  )
}
