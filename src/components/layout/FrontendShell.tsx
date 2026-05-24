import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SiteStructuredData } from '@/components/seo/SiteStructuredData'
import { SkipLink } from '@/components/ui/SkipLink'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { mainContentId } from '@/lib/a11y/mainContent'

import '@/app/(frontend)/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
})

type FrontendShellProps = {
  children: React.ReactNode
}

export async function FrontendShell({ children }: FrontendShellProps) {
  const { site } = await getSiteContent()

  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body>
        <SiteStructuredData />
        <SkipLink />
        <Header site={site} />
        <main id={mainContentId} tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer site={site} />
      </body>
    </html>
  )
}
