import { cache } from 'react'

import { mapAlumniPage } from '@/lib/content/mappers/pages/mapAlumniPage'
import { mapContactPage } from '@/lib/content/mappers/pages/mapContactPage'
import { mapGuestbookPage } from '@/lib/content/mappers/pages/mapGuestbookPage'
import { mapHomePage } from '@/lib/content/mappers/pages/mapHomePage'
import { mapIntensiveCoursesPage } from '@/lib/content/mappers/pages/mapIntensiveCoursesPage'
import { mapIntensiveCoursesCalendarPage } from '@/lib/content/mappers/pages/mapIntensiveCoursesCalendarPage'
import { mapLegalNoticePage } from '@/lib/content/mappers/pages/mapLegalNoticePage'
import { mapNewsPage } from '@/lib/content/mappers/pages/mapNewsPage'
import { mapPricingPage } from '@/lib/content/mappers/pages/mapPricingPage'
import { mapSiteSettings } from '@/lib/content/mappers/pages/mapSiteSettings'
import { mapTomTomPage } from '@/lib/content/mappers/pages/mapTomTomPage'

import { GLOBAL_DEPTH, getPayloadClient } from './payload'

export const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'site-settings', depth: GLOBAL_DEPTH })
  return mapSiteSettings(doc)
})

export const getLandingPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'home-page', depth: GLOBAL_DEPTH })
  return mapHomePage(doc)
})

export const getContactPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'contact-page', depth: GLOBAL_DEPTH })
  return mapContactPage(doc)
})

export const getNewsPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'news-page', depth: GLOBAL_DEPTH })
  return mapNewsPage(doc)
})

export const getGuestbookPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'guestbook-page', depth: GLOBAL_DEPTH })
  return mapGuestbookPage(doc)
})

export const getAlumniPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'alumni-page', depth: GLOBAL_DEPTH })
  return mapAlumniPage(doc)
})

export const getTomTomPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'tom-tom-page', depth: GLOBAL_DEPTH })
  return mapTomTomPage(doc)
})

export const getIntensiveCoursesPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'intensive-courses-page', depth: GLOBAL_DEPTH })
  return mapIntensiveCoursesPage(doc)
})

export const getPricingPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'pricing-page', depth: GLOBAL_DEPTH })
  return mapPricingPage(doc)
})

export const getIntensiveCoursesCalendarPage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({
    slug: 'intensive-courses-calendar-page',
    depth: GLOBAL_DEPTH,
  })
  return mapIntensiveCoursesCalendarPage(doc)
})

export const getLegalNoticePage = cache(async () => {
  const payload = await getPayloadClient()
  const doc = await payload.findGlobal({ slug: 'legal-notice-page', depth: GLOBAL_DEPTH })
  return mapLegalNoticePage(doc)
})
