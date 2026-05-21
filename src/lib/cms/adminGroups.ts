/**
 * Sidebar groups for the Payload admin.
 * Group and item order is applied in sortAdminNavGroups (see AdminNav).
 */
export const adminGroups = {
  /** Site-wide settings (header, footer, contacts) */
  config: 'Configuration',
  /** Repeatable records and uploaded assets */
  content: 'Contenu',
  /** One global per public page (home, contact, etc.) */
  pages: 'Pages du site',
  /** Auth accounts for this admin */
  administration: 'Administration',
} as const

/** Sidebar group order (top to bottom). */
export const adminNavGroupOrder = [
  adminGroups.config,
  adminGroups.content,
  adminGroups.pages,
  adminGroups.administration,
] as const

/** Order within Contenu. */
export const adminNavContentOrder = ['media', 'articles', 'eleves'] as const

/** Order within Pages du site. */
export const adminNavPagesOrder = [
  'home-page',
  'guestbook-page',
  'alumni-page',
  'tom-tom-page',
  'contact-page',
  'legal-notice-page',
] as const
