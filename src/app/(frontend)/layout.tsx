import React from 'react'

import { FrontendShell } from '@/components/layout/FrontendShell'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { siteFaviconMetadata } from '@/lib/site/favicon'

export async function generateMetadata() {
  const { site, landing } = await getSiteContent()

  return {
    title: `${site.name} · ${landing.hero.location}`,
    description:
      'École de batterie à Aix-en-Provence. Enseignement pour tous niveaux dès 6 ans, méthode Dante Agostini.',
    ...siteFaviconMetadata,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <FrontendShell>{children}</FrontendShell>
}
