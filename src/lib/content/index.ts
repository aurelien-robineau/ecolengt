/**
 * Frontend CMS barrel. Payload globals/collections must import `revalidateSite` from
 * `@/lib/content/revalidateSite` to avoid loading queries that depend on `payload.config`.
 */

export * from './types'

export { sortAdminNavGroups } from './admin/sortAdminNavGroups'

export {
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
} from './queries/globals'
export { getArticles } from './queries/getArticles'
export { getArticleBySlug, getArticleSlugs } from './queries/getArticleBySlug'
export { getStudentBySlug, getStudentSlugs } from './queries/getStudentBySlug'
export { getNavPrefs } from './queries/getNavPrefs'

export { hasLexicalContent } from './richtext/hasLexicalContent'
export type { CmsRichTextContent } from './richtext/types'

export { formatPostalCityLine, formatFoundedSince } from './utils/formatAddress'
export { articlePageHref } from './utils/articlePageHref'
