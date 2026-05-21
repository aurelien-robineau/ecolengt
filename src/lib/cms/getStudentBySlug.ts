import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { mapStudent } from '@/lib/cms/mapStudent'

export const getStudentBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'eleves',
    depth: 2,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const doc = result.docs[0]

  if (!doc) {
    return null
  }

  return mapStudent(doc)
})

export const getStudentSlugs = cache(async () => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'eleves',
    depth: 0,
    limit: 500,
    where: {
      slug: {
        exists: true,
      },
    },
  })

  return result.docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => Boolean(slug?.trim()))
})
