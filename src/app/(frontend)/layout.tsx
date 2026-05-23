import React from 'react'

import { FrontendShell } from '@/components/layout/FrontendShell'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildSiteRootMetadata } from '@/lib/seo/metadata'

export async function generateMetadata() {
  const { site } = await getSiteContent()

  return buildSiteRootMetadata(site)
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <FrontendShell>{children}</FrontendShell>
}
