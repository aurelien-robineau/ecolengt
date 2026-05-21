import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getSiteContent } from '@/lib/cms/getSiteContent'

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
  weight: ['300', '400', '500'],
})

type FrontendShellProps = {
  children: React.ReactNode
}

export async function FrontendShell({ children }: FrontendShellProps) {
  const { site } = await getSiteContent()

  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
      </body>
    </html>
  )
}
