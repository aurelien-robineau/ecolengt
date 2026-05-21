import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { mapAlumniPage } from '@/lib/cms/mapAlumniPage'
import { mapContactPage } from '@/lib/cms/mapContactPage'
import { mapGuestbookPage } from '@/lib/cms/mapGuestbookPage'
import { mapHomePage } from '@/lib/cms/mapHomePage'
import { mapSiteSettings } from '@/lib/cms/mapSiteSettings'
import type { SiteContent } from '@/lib/cms/types'

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const payload = await getPayload({ config })

  const [siteSettings, homePage, contactPage, guestbookPage, alumniPage] = await Promise.all([
    payload.findGlobal({
      slug: 'site-settings',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'home-page',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'contact-page',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'guestbook-page',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'alumni-page',
      depth: 2,
    }),
  ])

  return {
    site: mapSiteSettings(siteSettings),
    landing: mapHomePage(homePage),
    contact: mapContactPage(contactPage),
    guestbook: mapGuestbookPage(guestbookPage),
    alumni: mapAlumniPage(alumniPage),
  }
})
