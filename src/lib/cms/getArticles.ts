import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { mapArticleListItem } from '@/lib/cms/mapArticle'

export const getArticles = cache(async () => {
  const payload = await getPayload({ config })

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
