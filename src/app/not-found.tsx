import type { Metadata } from 'next'

import { NotFoundSection } from '@/components/errors/NotFoundSection'
import { FrontendShell } from '@/components/layout/FrontendShell'
import { getSiteSettings } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page introuvable | École NGT',
    description: 'Cette page n’existe pas ou a été déplacée.',
  }
}

export default async function NotFound() {
  const site = await getSiteSettings()

  return (
    <FrontendShell>
      <NotFoundSection site={site} />
    </FrontendShell>
  )
}
