import { CmsImage } from '@/components/cms/CmsImage'
import { CmsRichText } from '@/components/cms/CmsRichText'
import { Container } from '@/components/ui/Container'
import type { ArticleDetailData } from '@/lib/content/types'

type ArticleDetailProps = {
  article: ArticleDetailData
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className="py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <h1 className="type-section-title mb-8 text-[clamp(1.75rem,4vw,2.75rem)] text-foreground">
          {article.title}
        </h1>

        {article.image ? (
          <div className="bleed-x-sm media-ratio-hero relative mb-8 w-full overflow-hidden bg-foreground/5">
            <CmsImage
              image={article.image}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              fetchPriority="high"
            />
          </div>
        ) : null}

        <div className="border-t border-foreground/10 pt-12">
          <CmsRichText data={article.content} />
        </div>
      </Container>
    </article>
  )
}
