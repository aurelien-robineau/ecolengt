import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { mapAlumniPage } from '@/lib/content/mappers/pages/mapAlumniPage'
import { mapContactPage } from '@/lib/content/mappers/pages/mapContactPage'
import { mapGuestbookPage } from '@/lib/content/mappers/pages/mapGuestbookPage'
import { mapHomePage } from '@/lib/content/mappers/pages/mapHomePage'
import { mapIntensiveCoursesPage } from '@/lib/content/mappers/pages/mapIntensiveCoursesPage'
import { mapIntensiveCoursesCalendarPage } from '@/lib/content/mappers/pages/mapIntensiveCoursesCalendarPage'
import { mapPricingPage } from '@/lib/content/mappers/pages/mapPricingPage'
import { mapLegalNoticePage } from '@/lib/content/mappers/pages/mapLegalNoticePage'
import { mapNewsPage } from '@/lib/content/mappers/pages/mapNewsPage'
import { mapSiteSettings } from '@/lib/content/mappers/pages/mapSiteSettings'
import { mapTomTomPage } from '@/lib/content/mappers/pages/mapTomTomPage'
import type { SiteContent } from '@/lib/content/types'

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
