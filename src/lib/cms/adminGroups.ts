/**
 * Sidebar groups for the Payload admin.
 * Group and item order is applied in sortAdminNavGroups (see AdminNav).
 */
export const adminGroups = {
  /** Site-wide settings (header, footer, contacts) */
  config: 'Configuration',
  /** Repeatable records and uploaded assets */
  content: 'Contenu',
  /** Main site pages */
  pagesGeneral: 'Pages générales',
  /** Intensive courses pages */
  pagesStages: 'Pages stages intensifs',
  /** Legal and misc. pages */
  pagesOther: 'Autres pages',
  /** Auth accounts for this admin */
  administration: 'Administration',
} as const

/** Sidebar group order (top to bottom). */
export const adminNavGroupOrder = [
  adminGroups.config,
  adminGroups.content,
  adminGroups.pagesGeneral,
  adminGroups.pagesStages,
  adminGroups.pagesOther,
  adminGroups.administration,
] as const

/** Order within Contenu. */
export const adminNavContentOrder = ['media', 'articles', 'eleves'] as const

/** Order within Pages générales. */
export const adminNavPagesGeneralOrder = [
  'home-page',
  'news-page',
  'guestbook-page',
  'alumni-page',
  'tom-tom-page',
  'pricing-page',
  'contact-page',
] as const

/** Order within Pages stages intensifs. */
export const adminNavPagesStagesOrder = [
  'intensive-courses-page',
  'intensive-courses-calendar-page',
] as const

/** Order within Autres pages. */
export const adminNavPagesOtherOrder = ['legal-notice-page'] as const
