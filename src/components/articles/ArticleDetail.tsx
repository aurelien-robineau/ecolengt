import Link from 'next/link'

import { CmsImage } from '@/components/cms/CmsImage'
import { CmsRichText } from '@/components/cms/CmsRichText'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'
import type { ArticleDetailData } from '@/lib/cms/types'

type ArticleDetailProps = {
  article: ArticleDetailData
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className="py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
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

        {article.image ?
          <div className="relative mb-10 aspect-16/10 w-full overflow-hidden bg-foreground/5">
            <CmsImage
              image={article.image}
              fill
              sizes="(max-width: 1140px) 100vw, 1140px"
              priority
              fetchPriority="high"
            />
          </div>
        : null}

        <div className="border-t border-foreground/10 pt-10">
          <CmsRichText data={article.content} />
        </div>
      </Container>
    </article>
  )
}
