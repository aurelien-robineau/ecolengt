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
    <article className="group flex flex-col">
      <Link
        href={article.pageHref}
        className="mb-6 block overflow-hidden"
        aria-label={article.image ? `${articleLabel} — voir l’image` : articleLabel}
      >
        {article.image ? (
          <div className="media-ratio-feature relative overflow-hidden bg-foreground/5">
            <CmsImage
              image={article.image}
              fill
              className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              decorative
            />
          </div>
        ) : null}
      </Link>

      <h2 className={cn(cardTitleClassName, 'mb-3')}>
        <Link
          href={article.pageHref}
          className="text-foreground-muted no-underline transition-colors duration-150 hover:text-foreground"
        >
          {article.title}
        </Link>
      </h2>

      <p className="type-body mb-4 flex-1 text-foreground-muted">{article.shortDescription}</p>

      <Link
        href={article.pageHref}
        className="text-sm font-medium tracking-[var(--tracking-wide)] text-foreground-muted uppercase no-underline transition-colors duration-150 hover:text-foreground"
        aria-label={`Lire la suite : ${article.title}`}
      >
        Lire la suite
      </Link>
    </article>
  )
}
