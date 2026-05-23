import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { mapAlumniPage } from '@/lib/cms/mapAlumniPage'
import { mapContactPage } from '@/lib/cms/mapContactPage'
import { mapGuestbookPage } from '@/lib/cms/mapGuestbookPage'
import { mapHomePage } from '@/lib/cms/mapHomePage'
import { mapIntensiveCoursesPage } from '@/lib/cms/mapIntensiveCoursesPage'
import { mapIntensiveCoursesCalendarPage } from '@/lib/cms/mapIntensiveCoursesCalendarPage'
import { mapPricingPage } from '@/lib/cms/mapPricingPage'
import { mapLegalNoticePage } from '@/lib/cms/mapLegalNoticePage'
import { mapNewsPage } from '@/lib/cms/mapNewsPage'
import { mapSiteSettings } from '@/lib/cms/mapSiteSettings'
import { mapTomTomPage } from '@/lib/cms/mapTomTomPage'
import type { SiteContent } from '@/lib/cms/types'

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const payload = await getPayload({ config })

  const [
    siteSettings,
    homePage,
    contactPage,
    newsPage,
    guestbookPage,
    alumniPage,
    tomTomPage,
    intensiveCoursesPage,
    pricingPage,
    intensiveCoursesCalendarPage,
    legalNoticePage,
  ] = await Promise.all([
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
        slug: 'news-page',
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
      payload.findGlobal({
        slug: 'tom-tom-page',
        depth: 2,
      }),
      payload.findGlobal({
        slug: 'intensive-courses-page',
        depth: 2,
      }),
      payload.findGlobal({
        slug: 'pricing-page',
        depth: 2,
      }),
      payload.findGlobal({
        slug: 'intensive-courses-calendar-page',
        depth: 2,
      }),
      payload.findGlobal({
        slug: 'legal-notice-page',
        depth: 2,
      }),
    ])

  return {
    site: mapSiteSettings(siteSettings),
    landing: mapHomePage(homePage),
    contact: mapContactPage(contactPage),
    news: mapNewsPage(newsPage),
    guestbook: mapGuestbookPage(guestbookPage),
    alumni: mapAlumniPage(alumniPage),
    tomTom: mapTomTomPage(tomTomPage),
    intensiveCourses: mapIntensiveCoursesPage(intensiveCoursesPage),
    pricing: mapPricingPage(pricingPage),
    intensiveCoursesCalendar: mapIntensiveCoursesCalendarPage(intensiveCoursesCalendarPage),
    legalNotice: mapLegalNoticePage(legalNoticePage),
  }
})
