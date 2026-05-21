import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { mapHomePage } from '@/lib/cms/mapHomePage'
import { mapSiteSettings } from '@/lib/cms/mapSiteSettings'
import type { SiteContent } from '@/lib/cms/types'

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const payload = await getPayload({ config })

  const [siteSettings, homePage] = await Promise.all([
    payload.findGlobal({
      slug: 'site-settings',
      depth: 0,
    }),
    payload.findGlobal({
      slug: 'home-page',
      depth: 2,
    }),
  ])

  return {
    site: mapSiteSettings(siteSettings),
    landing: mapHomePage(homePage),
  }
})
