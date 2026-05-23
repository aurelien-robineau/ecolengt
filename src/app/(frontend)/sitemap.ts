import type { MetadataRoute } from 'next'

import { routes } from '@/config/routes'
import { getArticleSlugs } from '@/lib/cms/getArticleBySlug'
import { getStudentSlugs } from '@/lib/cms/getStudentBySlug'
import { articlePageHref } from '@/lib/cms/articlePageHref'
import { absoluteUrl } from '@/lib/seo/urls'

const staticPaths = [
  routes.home,
  routes.contact,
  routes.news,
  routes.guestbook,
  routes.alumni,
  routes.tomTom,
  routes.stagesIntensifs,
  routes.stagesIntensifsCalendar,
  routes.pricing,
  routes.legalNotice,
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleSlugs, studentSlugs] = await Promise.all([getArticleSlugs(), getStudentSlugs()])

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === routes.home || path === routes.news ? 'weekly' : 'monthly',
    priority: path === routes.home ? 1 : path === routes.stagesIntensifs ? 0.95 : 0.8,
  }))

  const articleEntries: MetadataRoute.Sitemap = articleSlugs.flatMap((slug) => {
    const href = articlePageHref(slug)
    if (!href) return []

    return [
      {
        url: absoluteUrl(href),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ]
  })

  const studentEntries: MetadataRoute.Sitemap = studentSlugs.map((slug) => ({
    url: absoluteUrl(`${routes.students}/${slug}`),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...staticEntries, ...articleEntries, ...studentEntries]
}
