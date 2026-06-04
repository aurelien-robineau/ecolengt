import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getPayloadClient = cache(async () => getPayload({ config }))

/**
 * Payload `depth` per global slug (relationship population).
 * 0 = scalars and embedded Lexical only; 1 = one level (uploads, student links, galleries).
 */
export const globalQueryDepth = {
  'site-settings': 1,
  'home-page': 1,
  'contact-page': 0,
  'news-page': 0,
  'guestbook-page': 1,
  'alumni-page': 1,
  'tom-tom-page': 0,
  'intensive-courses-page': 1,
  'pricing-page': 0,
  'intensive-courses-calendar-page': 0,
  'legal-notice-page': 0,
} as const
