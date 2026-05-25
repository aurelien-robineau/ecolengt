import type { Metadata } from 'next'

import { NotFoundSection } from '@/components/errors/NotFoundSection'
import { FrontendShell } from '@/components/layout/FrontendShell'
import { getSiteContent } from '@/lib/cms/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent()

  return {
    title: 'Page introuvable | École NGT',
    description: 'Cette page n’existe pas ou a été déplacée.',
  }
}

export default async function NotFound() {
  const { site } = await getSiteContent()

  return (
    <FrontendShell>
      <NotFoundSection site={site} />
    </FrontendShell>
  )
}
