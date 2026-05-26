/**
 * Frontend CMS barrel. Payload globals/collections must import `revalidateSite` from
 * `@/lib/content/revalidateSite` to avoid loading queries that depend on `payload.config`.
 */

export * from './types'

export { revalidateSite } from './revalidateSite'
export { sortAdminNavGroups } from './admin/sortAdminNavGroups'

export { getSiteContent } from './queries/getSiteContent'
export { getArticles } from './queries/getArticles'
export { getArticleBySlug, getArticleSlugs } from './queries/getArticleBySlug'
export { getStudentBySlug, getStudentSlugs } from './queries/getStudentBySlug'
export { getNavPrefs } from './queries/getNavPrefs'

export { hasLexicalContent } from './richtext/hasLexicalContent'
export { buildLexicalContent } from './richtext/buildLexicalContent'
export type { CmsRichTextContent } from './richtext/types'

export { formatPostalCityLine, formatFoundedSince } from './utils/formatAddress'
export { formatPhoneHref } from './utils/formatPhoneHref'
export { articlePageHref } from './utils/articlePageHref'
export { studentPageHref, resolveListedPerson } from './utils/studentPageHref'
export { parseMapCoordinate } from './utils/parseMapCoordinate'
