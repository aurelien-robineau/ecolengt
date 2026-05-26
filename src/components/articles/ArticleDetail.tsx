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
        <h1 className="mb-8 font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-light text-foreground md:mb-10">
          {article.title}
        </h1>

        {article.image ? (
          <div className="relative mb-8 aspect-16/10 w-full overflow-hidden bg-foreground/5 md:mb-10 md:aspect-12/5">
            <CmsImage
              image={article.image}
              fill
              sizes="(max-width: 1140px) 100vw, 1140px"
              priority
              fetchPriority="high"
            />
          </div>
        ) : null}

        <div className="border-t border-foreground/10 pt-10">
          <CmsRichText data={article.content} />
        </div>
      </Container>
    </article>
  )
}
