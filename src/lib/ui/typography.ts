/** Body copy — larger on small screens for readability. */
export const bodyTextClassName =
  'text-base leading-[1.75] text-foreground-muted md:text-sm md:leading-[1.65]'

/** Small section labels (Téléphone, E-mail, etc.). */
export const sectionLabelClassName =
  'text-xs font-medium tracking-[0.2em] text-foreground uppercase md:text-[11px]'

/** Major section headings within a page (Accès, Réseaux sociaux, etc.). */
export const pageSectionTitleClassName =
  'font-serif text-[clamp(1.375rem,2.5vw,1.875rem)] font-light leading-[1.15] text-foreground'

/** Contact values on the contact page (phone, email, address). */
export const contactValueClassName =
  'font-sans text-lg leading-snug font-normal text-foreground md:text-xl lg:text-lg'

export const contactLinkValueClassName = `${contactValueClassName} block no-underline transition-colors hover:text-brand`

/** Optional label above a phone or email on the contact page. */
export const contactItemLabelClassName =
  'mb-1 block text-[10px] font-medium tracking-[0.18em] text-foreground-subtle uppercase md:text-[11px]'
