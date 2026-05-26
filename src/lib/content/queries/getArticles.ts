import { cache } from 'react'

import { mapArticleListItem } from '@/lib/content/mappers/collections/mapArticle'

import { getPayloadClient } from './payload'

export const getArticles = cache(async () => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'articles',
    depth: 2,
    limit: 100,
    sort: '-createdAt',
    where: {
      slug: {
        exists: true,
      },
    },
  })

  return result.docs.map(mapArticleListItem)
})
