import { cache } from 'react'

import type { SiteContent } from '@/lib/content/types'

import {
  getAlumniPage,
  getContactPage,
  getGuestbookPage,
  getIntensiveCoursesCalendarPage,
  getIntensiveCoursesPage,
  getLandingPage,
  getLegalNoticePage,
  getNewsPage,
  getPricingPage,
  getSiteSettings,
  getTomTomPage,
} from './globals'

/** Loads every global. Prefer granular getters when a page only needs one slice. */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const [
    site,
    landing,
    contact,
    news,
    guestbook,
    alumni,
    tomTom,
    intensiveCourses,
    pricing,
    intensiveCoursesCalendar,
    legalNotice,
  ] = await Promise.all([
    getSiteSettings(),
    getLandingPage(),
    getContactPage(),
    getNewsPage(),
    getGuestbookPage(),
    getAlumniPage(),
    getTomTomPage(),
    getIntensiveCoursesPage(),
    getPricingPage(),
    getIntensiveCoursesCalendarPage(),
    getLegalNoticePage(),
  ])

  return {
    site,
    landing,
    contact,
    news,
    guestbook,
    alumni,
    tomTom,
    intensiveCourses,
    pricing,
    intensiveCoursesCalendar,
    legalNotice,
  }
})
