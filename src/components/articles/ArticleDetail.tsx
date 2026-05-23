import Link from 'next/link'

import { CmsImage } from '@/components/cms/CmsImage'
import { CmsRichText } from '@/components/cms/CmsRichText'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'
import { cn } from '@/lib/cn'
import type { ArticleDetailData } from '@/lib/cms/types'

type ArticleDetailProps = {
  article: ArticleDetailData
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article>
      {article.image ?
        <div className="overflow-hidden bg-foreground/5 pt-28">
          <div className="relative aspect-video w-full md:aspect-21/9">
            <CmsImage
              image={article.image}
              sizes="100vw"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      : null}

      <div
        className={cn(
          'py-(--spacing-section-mobile) md:py-(--spacing-section)',
          !article.image && 'pt-28',
        )}
      >
        <Container>
          <Link
            href={routes.news}
            className="mb-8 inline-block text-[11px] tracking-[0.12em] text-foreground-muted uppercase no-underline transition-colors hover:text-brand"
          >
            ← Actualité
          </Link>

          <h1 className="mb-10 font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-light text-foreground">
            {article.title}
          </h1>

          <div className="border-t border-foreground/10 pt-10">
            <CmsRichText data={article.content} />
          </div>
        </Container>
      </div>
    </article>
  )
}
