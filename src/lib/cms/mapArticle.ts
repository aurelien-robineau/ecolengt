import type { Article } from '@/payload-types'
import { articlePageHref } from '@/lib/cms/articlePageHref'
import { mapMedia } from '@/lib/cms/mapMedia'
import type { ArticleDetailData, ArticleListItem } from '@/lib/cms/types'

export function mapArticleListItem(doc: Article): ArticleListItem {
  return {
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    image: mapMedia(doc.image, doc.title),
    pageHref: articlePageHref(doc.slug)!,
  }
}

export function mapArticleDetail(doc: Article): ArticleDetailData {
  return {
    ...mapArticleListItem(doc),
    content: doc.content,
  }
}
