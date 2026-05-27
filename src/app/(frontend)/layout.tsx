import React from 'react'
import type { Viewport } from 'next'

import { FrontendShell } from '@/components/layout/FrontendShell'
import { getSiteSettings } from '@/lib/content'
import { buildSiteRootMetadata } from '@/lib/seo/metadata'

export const viewport: Viewport = {
  themeColor: '#fafafa',
}

export async function generateMetadata() {
  const site = await getSiteSettings()

  return buildSiteRootMetadata(site)
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <FrontendShell>{children}</FrontendShell>
}
