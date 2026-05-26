import type { Metadata } from 'next'

import { NotFoundSection } from '@/components/errors/NotFoundSection'
import { getSiteContent } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { seoCopy } from '@/lib/seo/copy'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()
  const { documentTitle, title, description } = seoCopy.notFound(site)

  return buildPageMetadata({
    site,
    pathname: '/404',
    pageTitle: documentTitle,
    seoTitle: title,
    description,
    noIndex: true,
  })
}

export default async function NotFound() {
  const { site } = await getSiteContent()

  return <NotFoundSection site={site} />
}
