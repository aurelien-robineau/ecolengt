import type { Article } from '@/payload-types'
import { articlePageHref } from '@/lib/content/utils/articlePageHref'
import type { ArticleDetailData, ArticleListItem } from '@/lib/content/types'
import { mapMedia } from '../shared/mapMedia'
import { mapRichText } from '../shared/mapRichText'

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
    content: mapRichText(doc.content),
  }
}
