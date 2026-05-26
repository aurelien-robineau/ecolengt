import Link from 'next/link'

import { CmsImage } from '@/components/cms/CmsImage'
import type { ArticleListItem } from '@/lib/content/types'

type ArticleCardProps = {
  article: ArticleListItem
}

export function ArticleCard({ article }: ArticleCardProps) {
  const articleLabel = `Article : ${article.title}`

  return (
    <article className="group flex flex-col">
      <Link
        href={article.pageHref}
        className="mb-5 block overflow-hidden"
        aria-label={article.image ? `${articleLabel} — voir l’image` : articleLabel}
      >
        {article.image ? (
          <div className="aspect-[16/10] overflow-hidden bg-foreground/5">
            <CmsImage
              image={article.image}
              className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              decorative
            />
          </div>
        ) : null}
      </Link>

      <h2 className="mb-2 font-serif text-[1.25rem] leading-snug font-light">
        <Link
          href={article.pageHref}
          className="text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          {article.title}
        </Link>
      </h2>

      <p className="mb-4 flex-1 text-base leading-[1.75] text-foreground-muted md:text-sm">
        {article.shortDescription}
      </p>

      <Link
        href={article.pageHref}
        className="text-[11px] tracking-[0.12em] text-foreground-muted uppercase no-underline transition-colors hover:text-brand"
        aria-label={`Lire la suite : ${article.title}`}
      >
        Lire la suite
      </Link>
    </article>
  )
}
